output "iam_role_arn" {
  value = "${aws_iam_role.KClambda_lambda_role.arn}"
}