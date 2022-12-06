variable "function_name" {
    description = "Name of the api gateway name"
    type = string
    default = "demo-lambda"
}
variable "lambda_arn" {
    description = "lambda_arn"
    type = map
}
variable "iam_role_arn" {
    description = "value"
    type = string
}
# ------------------------------------------------------------------
variable "service_version" {
  default     = "v1.0.0"
  type        = string
  description = "The version of the service"
}

variable "service_domain" {
  type        = string
  description = "The 1st level of logical grouping of the service, e.g. 'api', 'web', 'db', etc."
}

variable "service_name" {
  type        = string
  description = "The 2nd level of logical grouping of the service, e.g. 'my-api', 'my-web', 'my-db', etc."
}

variable "service_environment" {
  type        = string
  description = "The 3rd level of logical grouping of the service, e.g. 'dev', 'test', 'prod', etc."
}

variable "lambda_function_configuration" {
  type = map(object({
    lambda_memory_size  = optional(number),
    lambda_timeout      = optional(number),
    schedule_expression = optional(string),
  }))
  default     = {}
  description = <<EOF
    The custom configuration for the Lambda Function, e.g.
    <pre>{<br />&nbsp;&nbsp;"booking-create": {<br />&nbsp;&nbsp;&nbsp;&nbsp;"lambda_memory_size": 1024,<br />&nbsp;&nbsp;&nbsp;&nbsp;"lambda_timeout": 300<br />&nbsp;&nbsp;}<br />}</pre>
  EOF
}

variable "default_tags" {
  type        = map(string)
  default     = {}
  description = "The default tags for the service"
}