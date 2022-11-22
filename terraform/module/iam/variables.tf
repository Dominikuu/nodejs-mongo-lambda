variable "iam_role_name" {
  description = "Name of the api gateway"
  type = string
  default = "KClambda_lambda_role"
}
variable "api_arn" {
  description = "Name of the api gateway"
  type = string
}
variable "iam_role_arn" {
  description = "Name of the api gateway"
  type = string
}
variable "lambda_arn" {
  description = "lambda_arn"
  type = map
}