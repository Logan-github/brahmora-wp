terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Primary region for S3, CloudFront, Route53
provider "aws" {
  region  = var.aws_region
  profile = "brahmora"
}

# ACM certificates for CloudFront MUST be in us-east-1
provider "aws" {
  alias   = "us_east_1"
  region  = "us-east-1"
  profile = "brahmora"
}
