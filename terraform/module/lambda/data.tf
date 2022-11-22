# get current region of the aws account
data "aws_region" "current" {}

# get current caller identity of the aws account
data "aws_caller_identity" "current" {}

# create an archive of sources/src
data "archive_file" "typescript-source" {
  type        = "zip"
  source_dir  = "${path.root}/../src"
  output_path = "${local.temporary_build_prefix}/typescript-source.zip"
}

# create an archive of sources/dist
data "archive_file" "lambda-function-source" {
  type        = "zip"
  depends_on  = [null_resource.lambda-layer-source-builder]
  source_dir  = "${path.root}/../dist"
  output_path = "${local.temporary_build_prefix}/lambda-function-source.zip"
}

# create an archive of local.temporary_build_prefix/lambda-layer-source
data "archive_file" "lambda-layer-source" {
  type        = "zip"
  depends_on  = [null_resource.lambda-layer-source-builder]
  source_dir  = "${local.temporary_build_prefix}/lambda-layer-source"
  output_path = "${local.temporary_build_prefix}/lambda-layer-source-${filemd5("${path.root}/../package-lock.json")}.zip"
}