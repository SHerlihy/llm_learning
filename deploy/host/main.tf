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

locals {
    uuid = "99c0dcd0-a6c5-4cd8-85a1-eaf1c878b938"
    project_name = "llmlearning"
}

module "s3" {
  source = "./create_s3"

  project_name = local.project_name
}

module "cdn" {
  source = "./cdn"

  bucket_arn = module.s3.bucket_arn
  bucket_id = module.s3.bucket_id
  bucket_regional_domain_name = module.s3.bucket_regional_domain_name

  uuid = local.uuid
}

output "cdn_domain_name" {
  value = module.cdn.domain_name
}

output "bucket_id" {
  value = module.s3.bucket_id
}
