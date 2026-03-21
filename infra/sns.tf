resource "aws_sns_topic" "contact" {
  name = "brahmora-contact-form"
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.contact.arn
  protocol  = "email"
  endpoint  = var.contact_email
}
