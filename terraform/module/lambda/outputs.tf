
output "lambda_arn" {
    # value = aws_lambda_function.lambda-function[*].invoke_arn
    value = {
      for obj in aws_lambda_function.lambda-function : obj.environment[0].variables.FUNCTION_NAME => obj.invoke_arn
    }
}
output "lambda-function-list" {
  value       = aws_lambda_function.lambda-function
  description = "List of Lambda Functions created"
}
output "lambda-layer" {
  value       = aws_lambda_layer_version.lambda-layer
  description = "Lambda Layer created"
}