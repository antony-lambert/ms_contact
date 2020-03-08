############################################
#               API GATEWAY                #
############################################

resource "aws_api_gateway_rest_api" "ms_contacts_apigateway" {
  name = "ms_contacts_apigateway"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowMsContactsApigatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "ms_contacts_lambda_handler_apigateway"
  principal     = "apigateway.amazonaws.com"

  # The /*/*/* part allows invocation from any stage, method and resource path
  # within API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.ms_contacts_apigateway.execution_arn}/*/*/*"
}

######################
# /contacts #
######################
resource "aws_api_gateway_resource" "ms_contacts_ressource" {
  rest_api_id = aws_api_gateway_rest_api.ms_contacts_apigateway.id
  parent_id   = aws_api_gateway_rest_api.ms_contacts_apigateway.root_resource_id
  path_part   = "contacts"
}

# GET
resource "aws_api_gateway_method" "ms_contacts_apigateway_method_get" {
  rest_api_id   = aws_api_gateway_rest_api.ms_contacts_apigateway.id
  resource_id   = aws_api_gateway_resource.ms_contacts_ressource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "ms_contacts_apigateway_integration_method_get" {
  rest_api_id = aws_api_gateway_rest_api.ms_contacts_apigateway.id
  resource_id = aws_api_gateway_resource.ms_contacts_ressource.id
  http_method = aws_api_gateway_method.ms_contacts_apigateway_method_get.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.ms_contacts_lambda_handler_apigateway.invoke_arn
}

# POST
resource "aws_api_gateway_method" "ms_contacts_apigateway_method_post" {
  rest_api_id   = aws_api_gateway_rest_api.ms_contacts_apigateway.id
  resource_id   = aws_api_gateway_resource.ms_contacts_ressource.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "ms_contacts_apigateway_integration_method_post" {
  rest_api_id = aws_api_gateway_rest_api.ms_contacts_apigateway.id
  resource_id = aws_api_gateway_resource.ms_contacts_ressource.id
  http_method = aws_api_gateway_method.ms_contacts_apigateway_method_post.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.ms_contacts_lambda_handler_apigateway.invoke_arn
}


###########################
#   DEPLOYEMENT & STAGE   #
###########################

resource "aws_api_gateway_deployment" "ms_contacts_apigateway_deployment" {
  depends_on = [
    aws_api_gateway_integration.ms_contacts_apigateway_integration_method_get,
    aws_api_gateway_integration.ms_contacts_apigateway_integration_method_post,
  ]

  rest_api_id = aws_api_gateway_rest_api.ms_contacts_apigateway.id
}

resource "aws_api_gateway_stage" "ms_contacts_apigateway_stage" {
  stage_name           = "dev"
  rest_api_id          = aws_api_gateway_rest_api.ms_contacts_apigateway.id
  deployment_id        = aws_api_gateway_deployment.ms_contacts_apigateway_deployment.id
  xray_tracing_enabled = true
}
