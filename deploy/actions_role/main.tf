// ref https://github.com/aws-actions/configure-aws-credentials?tab=readme-ov-file

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

variable "branch" {
    type = string
    default = "repo:SHerlihy/llm_learning:ref:refs/heads/main"
}

variable "account_id" {
    type = string
    default = "723738378505"
}

variable "user" {
    type = string
    // smart or dumb?
    default = "actions"
}

resource "aws_iam_role" "actions" {
  name                = "actions"
  assume_role_policy  = data.aws_iam_policy_document.actions_assume.json
}

data "aws_iam_policy_document" "actions_assume" {
    statement {
        actions = [
            "sts:AssumeRoleWithWebIdentity"
        ]

        condition {
            test = "ForAnyValue:StringEquals"
            variable = "token.actions.githubusercontent.com:aud"
            values = ["sts.amazonaws.com"]
        }

        condition {
            test = "ForAnyValue:StringEquals"
            variable = "token.actions.githubusercontent.com:sub"
            values = [var.branch]
        }

        principals {
            type = "Federated"
            identifiers = [
                "arn:aws:iam::${var.account_id}:oidc-provider/token.actions.githubusercontent.com"
            ]
        }
    }

    statement {
        actions = [
            "st:AssumeRole"
        ]
        
        principals {
            type = "AWS"
            indentifiers = [
                "arn:aws:iam::${var.account_id}:user/${var.user}"
            ]
        }
    }
}

data "aws_iam_policy_document" "provision_static_site" {
    statement
}
