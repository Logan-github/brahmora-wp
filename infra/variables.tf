variable "assume_role_arn" {
  description = "IAM role ARN to assume for deployment"
  type        = string
  default     = "arn:aws:iam::330999578970:role/brahmoraWebhost"
}

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "eu-west-2" # London — closest to .co.uk
}

variable "domain_name" {
  description = "Primary domain name"
  type        = string
  default     = "brahmora.co.uk"
}

variable "site_bucket_name" {
  description = "S3 bucket name for website content"
  type        = string
  default     = "brahmora-co-uk-site"
}

variable "contact_email" {
  description = "Email address for contact form notifications"
  type        = string
  default     = "loganathanji.rs@gmail.com"
}
