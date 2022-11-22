resource "aws_api_gateway_rest_api" "KC_api_gateway" {
  name = var.api_name
}
# ============== PRODUCT =============
resource "aws_api_gateway_resource" "productResource" {
  rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
  parent_id   = aws_api_gateway_rest_api.KC_api_gateway.root_resource_id # In this case, the parent id should be the parent aws_api_gateway_resource id.
  path_part   = "product"
}
# Create product
resource "aws_api_gateway_method" "post_product_form" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_resource.productResource.id
    http_method = "POST"
    authorization = "NONE"
}
resource "aws_api_gateway_integration" "KC_api_gateway_integrationproductpost" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_method.post_product_form.resource_id
    http_method = aws_api_gateway_method.post_product_form.http_method

    integration_http_method = "POST"
    type = "AWS_PROXY"
    uri = "${var.lambda_arn.createProduct}"
}

# Delete product
resource "aws_api_gateway_method" "delete_product_form" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_resource.productResource.id
    http_method = "DELETE"
    authorization = "NONE"
}
resource "aws_api_gateway_integration" "KC_api_gateway_integrationproductdelete" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_method.delete_product_form.resource_id
    http_method = aws_api_gateway_method.delete_product_form.http_method

    integration_http_method = "DELETE"
    type = "AWS_PROXY"
    uri = "${var.lambda_arn.deleteProduct}"
}

# ============== USER =============
resource "aws_api_gateway_resource" "userResource" {
  rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
  parent_id   = aws_api_gateway_rest_api.KC_api_gateway.root_resource_id # In this case, the parent id should be the parent aws_api_gateway_resource id.
  path_part   = "user"
}
# Create user
resource "aws_api_gateway_method" "post_user_form" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_resource.userResource.id
    http_method = "POST"
    authorization = "NONE"
}
resource "aws_api_gateway_integration" "KC_api_gateway_integrationuserpost" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_method.post_user_form.resource_id
    http_method = aws_api_gateway_method.post_user_form.http_method

    integration_http_method = "POST"
    type = "AWS_PROXY"
    uri = "${var.lambda_arn.createUser}"
}
# Delete user
resource "aws_api_gateway_method" "delete_user_form" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_resource.userResource.id
    http_method = "DELETE"
    authorization = "NONE"
}
resource "aws_api_gateway_integration" "KC_api_gateway_integrationuserdelete" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_method.delete_user_form.resource_id
    http_method = aws_api_gateway_method.delete_user_form.http_method

    integration_http_method = "DELETE"
    type = "AWS_PROXY"
    uri = "${var.lambda_arn.deleteUser}"
}
# ============== ORDER =============
resource "aws_api_gateway_resource" "orderResource" {
  rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
  parent_id   = aws_api_gateway_rest_api.KC_api_gateway.root_resource_id # In this case, the parent id should be the parent aws_api_gateway_resource id.
  path_part   = "order"
}
# Create order
resource "aws_api_gateway_method" "post_order_form" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_resource.orderResource.id
    http_method = "POST"
    authorization = "NONE"
}
resource "aws_api_gateway_integration" "KC_api_gateway_integrationorderpost" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_method.post_order_form.resource_id
    http_method = aws_api_gateway_method.post_order_form.http_method

    integration_http_method = "POST"
    type = "AWS_PROXY"
    uri = "${var.lambda_arn.createOrder}"
}
# Get order
resource "aws_api_gateway_method" "get_order_form" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_resource.orderResource.id
    http_method = "GET"
    authorization = "NONE"
}
resource "aws_api_gateway_integration" "KC_api_gateway_integrationorderget" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_method.get_order_form.resource_id
    http_method = aws_api_gateway_method.get_order_form.http_method

    integration_http_method = "POST"
    type = "AWS_PROXY"
    uri = "${var.lambda_arn.getOrder}"
}
# ============== ORDERS =============
resource "aws_api_gateway_resource" "ordersResource" {
  rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
  parent_id   = aws_api_gateway_rest_api.KC_api_gateway.root_resource_id # In this case, the parent id should be the parent aws_api_gateway_resource id.
  path_part   = "orders"
}
# List order
resource "aws_api_gateway_method" "list_orders_form" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_resource.ordersResource.id
    http_method = "GET"
    authorization = "NONE"
}
resource "aws_api_gateway_integration" "KC_api_gateway_integrationorderlist" {
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    resource_id = aws_api_gateway_method.list_orders_form.resource_id
    http_method = aws_api_gateway_method.list_orders_form.http_method

    integration_http_method = "GET"
    type = "AWS_PROXY"
    uri = "${var.lambda_arn.listOrders}"
}
resource "aws_api_gateway_deployment" "KC_api_gateway_deployment" {
    depends_on = [aws_api_gateway_integration.KC_api_gateway_integrationproductpost, aws_api_gateway_integration.KC_api_gateway_integrationproductdelete, aws_api_gateway_integration.KC_api_gateway_integrationuserpost, aws_api_gateway_integration.KC_api_gateway_integrationuserdelete, aws_api_gateway_integration.KC_api_gateway_integrationorderpost, aws_api_gateway_integration.KC_api_gateway_integrationorderget, aws_api_gateway_integration.KC_api_gateway_integrationorderlist]
    rest_api_id = aws_api_gateway_rest_api.KC_api_gateway.id
    stage_name = "stage_api"
}