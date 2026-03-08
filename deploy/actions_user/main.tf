terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  profile = "llm_learning"
}

resource "aws_iam_user" "actions" {
  name = "actions"
  path = "/"
}

resource "aws_iam_access_key" "actions" {
  user = aws_iam_user.actions.name
}

output "aws_access_key_id" {
    value = aws_iam_access_key.actions.id
}

output "aws_secret_access_key" {
    value = aws_iam_access_key.actions.secret
    sensitive = true
}
