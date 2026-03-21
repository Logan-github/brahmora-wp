import json
import os
import re
import boto3

sns = boto3.client("sns")
TOPIC_ARN = os.environ["SNS_TOPIC_ARN"]

# Basic email validation
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def handler(event, context):
    try:
        body = json.loads(event.get("body", "{}"))
    except (json.JSONDecodeError, TypeError):
        return response(400, "Invalid request body")

    name = body.get("name", "").strip()
    email = body.get("email", "").strip()
    message = body.get("message", "").strip()

    if not name or not email or not message:
        return response(400, "All fields are required")

    if len(name) > 200 or len(email) > 254 or len(message) > 5000:
        return response(400, "Input too long")

    if not EMAIL_RE.match(email):
        return response(400, "Invalid email address")

    subject = f"Brahmora Contact: {name}"
    text = (
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"---\n"
        f"{message}"
    )

    sns.publish(TopicArn=TOPIC_ARN, Subject=subject[:100], Message=text)

    return response(200, "Message sent successfully")


def response(status, msg):
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"message": msg}),
    }
