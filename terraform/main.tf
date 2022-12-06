module "lambda" {
  source = "./module/lambda"
  lambda_arn ="${module.lambda.lambda_arn}"
  iam_role_arn = "${module.iam.iam_role_arn}"
  service_domain = "api"
  service_environment = "dev"
  service_name = "my-api"
  service_version = "1.0.0"
}
module "api_gateway" {
  source = "./module/api-gateway"
  lambda_arn ="${module.lambda.lambda_arn}"
}
module "iam" {
  source = "./module/iam"
  api_arn = "${module.api_gateway.api_arn}"
  iam_role_arn = "${module.iam.iam_role_arn}"
  lambda_arn = "${module.lambda.lambda_arn}"
  lambda_function_list = "${module.lambda.lambda_function_list}"
}