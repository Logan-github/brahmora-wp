output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (needed for cache invalidation)"
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name"
  value       = aws_cloudfront_distribution.site.domain_name
}

output "s3_bucket_name" {
  description = "S3 bucket name for uploading site content"
  value       = aws_s3_bucket.site.id
}

output "nameservers" {
  description = "Route53 nameservers — set these at your domain registrar"
  value       = aws_route53_zone.site.name_servers
}

output "site_url" {
  description = "Live site URL"
  value       = "https://${var.domain_name}"
}

output "contact_api_url" {
  description = "Contact form API endpoint"
  value       = "${trimsuffix(aws_apigatewayv2_stage.default.invoke_url, "/")}/contact"
}
