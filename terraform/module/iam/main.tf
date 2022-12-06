data "aws_iam_policy_document" "lambda_assume_role_document" {
  version = "2012-10-17"

  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    effect = "Allow"
  }
}

# data "aws_iam_policy_document" "weather_lambda_document" {
#   version = "2012-10-17"

#   statement {
#     effect = "Allow"

#     actions = [
#       "logs:CreateLogGroup",
#       "logs:CreateLogStream",
#       "logs:PutLogEvents",
#       "cloudwatch:PutMetricData",
#       "kms:*",
#     ]

#     resources = ["*"]
#   }
# }

# resource "aws_iam_policy" "weather_lambda_policy" {
#   policy = "${data.aws_iam_policy_document.weather_lambda_document.json}"
# }

resource "aws_iam_role" "KClambda_lambda_role" {
  name               = var.iam_role_name
  assume_role_policy = "${data.aws_iam_policy_document.lambda_assume_role_document.json}"
}
resource "aws_lambda_permission" "lambda_apigateway_permission" {
  for_each = var.lambda_function_list
  statement_id = "AllowAPIGatewayInvoke"
  action = "lambda:InvokeFunction"
  function_name = each.value.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${var.api_arn}/*/*"
}
resource "aws_iam_role_policy_attachment" "KClambda_execution" {
  role = aws_iam_role.KClambda_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
resource "aws_iam_role_policy_attachment" "KClambda_vpc_access_execution" {
  role = aws_iam_role.KClambda_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}
# resource "aws_iam_policy_attachment" "weather_lambda_attachment" {
#   name = "${local.name}-attachment"

#   roles = [
#     "${aws_iam_role.weather_lambda_role.name}",
#   ]

#   policy_arn = "${aws_iam_policy.weather_lambda_policy.arn}"
# }