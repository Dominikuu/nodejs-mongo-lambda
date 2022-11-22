# resource "aws_lambda_layer_version" "lambda-layer_fetch" {
#   filename   = "${path.module}/lambda_layer_payload.zip"
#   layer_name = "lambda_layer_name"

#   source_code_hash    = "${filebase64sha256("${path.module}/lambda_layer_payload.zip")}"
#   compatible_runtimes = ["nodejs10.x"]
# }

# resource "aws_lambda_function" "KClambda_lambda" {
#     function_name = var.function_name
#     filename = "${path.module}/hello_lambda.zip"
#     handler = "hello_lambda.lambda_handler"
#     runtime = "nodejs10.x"
#     role = "${var.iam_role_arn}"
#     source_code_hash = data.archive_file.hello_lambda.output_base64sha256

#     vpc_config {
#       subnet_ids = ["subnet.880f4fa3"]
#       security_group_ids = ["sg00a"]
#     }
# }

# data "archive_file" "hello_lambda" {
#     type = "zip"
#     source_dir = "${path.module}/hello_lambda"
#     output_path = "${path.module}/hello_lambda.zip"
# }

locals {

  # lambda runtime 
  lambda_runtime = "nodejs14.x"

  # this is will generate the list of function name based on files residing in the functions directory
  # this is also parse the name of the function and generate the function name
  # functions = toset([
  #   for file in fileset("${path.module}/src/functions", "*.function.ts") : lower(replace(split(".", split("/", file)[length(split("/", file)) - 1])[0], "[^a-zA-Z0-9]", "-"))
  # ])
  functions = toset(["createProduct", "deleteProduct", "createUser", "deleteUser", "createOrder", "getOrder", "listOrders"])

  # temporary path prefix to store the generated files
  temporary_build_prefix = "/tmp/${data.aws_caller_identity.current.id}/${data.aws_region.current.id}/${var.service_name}"

  # define the default tags for the resources
  default_tags = merge({
    "Name" : "${var.service_domain}-${var.service_name}-${var.service_environment}",
    "Environment" : "${var.service_environment}",
    "Service" : "${var.service_name}",
    "ServiceName" : "${var.service_name}",
    "ServiceDomain" : "${var.service_domain}",
    "ServiceVersion" : "${var.service_version}",
  }, var.default_tags)

  # define resources prefix name
  resource_prefix_name = substr(var.service_name, 0, length(var.service_domain)) == var.service_domain ? "${var.service_name}-${var.service_environment}" : "${var.service_domain}-${var.service_name}-${var.service_environment}"

}

# naming section to standardize the naming of the resources
# naming for Lambda Layer
module "lambda-layer-name" {
  source        = "git@github.com:traveloka/terraform-aws-resource-naming.git?ref=v0.22.0"
  name_prefix   = "${local.resource_prefix_name}-layer"
  resource_type = "lambda_function"
}

# naming for Lambda Function
module "lambda-function-name" {
  for_each      = local.functions
  source        = "git@github.com:traveloka/terraform-aws-resource-naming.git?ref=v0.22.0"
  name_prefix   = "${local.resource_prefix_name}-${each.value}"
  resource_type = "lambda_function"
}

# build the dist directory using npm run build
# this will generate the Javascript from Typescript source code using TypeScript compiler
# this builder will only run when:
# - there's a change in the source code directory
# - there's a change in service domain value
# - there's a change in service name value
# - there's no existing dist directory
resource "null_resource" "lambda-function-source-builder" {
  # depends_on = [null_resource.typescript-source-model-builder]
  provisioner "local-exec" {
    working_dir = "${path.root}/../src/"
    command     = "npm run build"
  }
  triggers = {
    lambda-function-md5 = data.archive_file.typescript-source.output_md5
    service_domain      = var.service_domain
    service_name        = var.service_name
    file_dist           = fileexists("${path.root}/../dist/index.js") ? "${path.root}/../dist/index.js" : timestamp()
  }
}

# build the dependencies directory using npm install
# this will generate the dependencies file from the package.json file
# this will be used as Lambda Layer archive file
# this builder will only run when:
# - there's a change in package.json file
# - there's a change in package-lock.json file
# - there's a change in service domain value
# - there's a change in service name value
# - there's no existing dependencies directory
resource "null_resource" "lambda-layer-source-builder" {
  provisioner "local-exec" {
    working_dir = "${path.root}/../"
    command     = <<EOT
      mkdir -p ./install/node_modules
      npm install --prefix ./install
      rm -rf ${local.temporary_build_prefix}/lambda-layer-source
      mkdir -p ${local.temporary_build_prefix}/lambda-layer-source/nodejs
      cp -r ./install/node_modules ${local.temporary_build_prefix}/lambda-layer-source/nodejs
      rm -rf ./install
    EOT
  }
  triggers = {
    dependencies-file-md5 = filemd5("${path.root}/../package.json")
    dependencies-lock-md5 = filemd5("${path.root}/../package-lock.json")
    service_domain        = var.service_domain
    service_name          = var.service_name
    file_node_modules     = fileexists("${path.root}/../package-lock.json") ? "${path.root}/../package-lock.json" : timestamp()
  }
}

# create Lambda Layer for the service
resource "aws_lambda_layer_version" "lambda-layer" {
  filename            = data.archive_file.lambda-layer-source.output_path
  description         = "${var.service_name} ${var.service_environment} layer"
  layer_name          = module.lambda-layer-name.name
  compatible_runtimes = [local.lambda_runtime]
}

resource "aws_lambda_function" "lambda-function" {

  for_each      = local.functions
  filename      = data.archive_file.lambda-function-source.output_path
  function_name = module.lambda-function-name[each.value].name

  handler     = "index.handler"
  runtime     = local.lambda_runtime
  role        = aws_iam_role.lambda-function-role[each.value].arn
  timeout     = try(var.lambda_function_configuration[each.value].lambda_timeout, 60)
  memory_size = try(var.lambda_function_configuration[each.value].lambda_memory_size, 128)

  source_code_hash = data.archive_file.lambda-function-source.output_sha
  layers           = [aws_lambda_layer_version.lambda-layer.arn]
  tags             = local.default_tags

  environment {
    variables = {
      "SERVICE_DOMAIN"      = var.service_domain
      "SERVICE_NAME"        = var.service_name
      "SERVICE_ENVIRONMENT" = var.service_environment
      "FUNCTION_NAME"       = each.value
    }
  }

}

# create IAM Role for Lambda Function
resource "aws_iam_role" "lambda-function-role" {
  for_each = local.functions
  name     = substr("ServiceRoleForLambda-${module.lambda-function-name[each.value].name}", 0, 64)
  tags     = local.default_tags
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [{
      "Action" : "sts:AssumeRole",
      "Principal" : {
        "Service" : "lambda.amazonaws.com"
      },
      "Effect" : "Allow",
    }]
  })
}