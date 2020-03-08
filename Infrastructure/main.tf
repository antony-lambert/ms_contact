provider "aws" {
  version = "~> 2.0"
  region  = var.aws-region
}

terraform {
  backend "s3" {
    encrypt = true
    bucket  = "terraform-remote-state-storage-afterwork-it"
    key     = "ms-contacts/"
    region  = "eu-west-1"
  }
}
