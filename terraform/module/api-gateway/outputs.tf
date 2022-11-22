output "api_arn" {
    value = "${aws_api_gateway_deployment.KC_api_gateway_deployment.execution_arn}"
}