########################################
#               DYNAMO DB              #
########################################

resource "aws_dynamodb_table" "ms_contacts_aws_dynamodb_table" {
  name           = "Contacts"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
