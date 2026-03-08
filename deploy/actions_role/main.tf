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

data "aws_iam_policy_document" "actions_assume" {
    statement {
        principals {
            type = "Federated"
            identifiers = [
                "arn:aws:iam::${var.account_id}:oidc-provider/token.actions.githubusercontent.com"
            ]
        }

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
    }
}

resource "aws_iam_role" "actions" {
  name_prefix                = "actions"
  assume_role_policy  = data.aws_iam_policy_document.actions_assume.json
}

data "aws_iam_policy_document" "provision_static_site" {
    statement {
      actions = [
        "s3:*"
      ]

      resources = ["*"]
    }
}

resource "aws_iam_policy" "provision_static_site" {
  policy      = data.aws_iam_policy_document.provision_static_site.json
}

resource "aws_iam_role_policy_attachment" "provision_static_site" {
  role       = aws_iam_role.actions.name
  policy_arn = aws_iam_policy.provision_static_site.arn
}

output "arn" {
  value = aws_iam_role.actions.arn
}
