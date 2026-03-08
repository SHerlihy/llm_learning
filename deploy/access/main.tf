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

variable "bucket_arn" {
  type = string
}

module "openid_provider" {
    source = "./openid_provider"
}

module "actions_role" {
    source = "./actions_role"

    branch = "repo:SHerlihy/llm_learning:ref:refs/heads/main"
    account_id = "723738378505"

    bucket_arn = var.bucket_arn
}

output "role_arn" {
    value = module.actions_role.arn
}
