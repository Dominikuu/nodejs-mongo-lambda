variable "api_name" {
  description = "Name of the api gateway name"
  type = string
  default = "demo-api"
}

variable "lambda_arn" {
    description = "lambda_arn"
    type = map
}