############################################
#                LAMBDA                    #
############################################

resource "aws_lambda_function" "ms_contacts_lambda_handler_apigateway" {
  filename      = "../Lambdas/lambda_handler_apigateway/ms_contacts.zip"
  function_name = "ms_contacts_lambda_handler_apigateway"
  role          = var.arn-lambda-role
  handler       = "src/index.handler"
  runtime       = "nodejs10.x"
  timeout       = 900

  environment {
    variables = {
      DB_NAME = aws_dynamodb_table.ms_contacts_aws_dynamodb_table.name
    }
  }
}
