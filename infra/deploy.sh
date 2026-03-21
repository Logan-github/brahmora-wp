#!/usr/bin/env bash
# Syncs src/ to S3 and invalidates CloudFront cache.
# Injects the contact API URL into HTML before uploading.
# Usage: ./infra/deploy.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$PROJECT_ROOT/.build"

cd "$SCRIPT_DIR"

BUCKET=$(terraform output -raw s3_bucket_name)
DIST_ID=$(terraform output -raw cloudfront_distribution_id)
CONTACT_API=$(terraform output -raw contact_api_url)

# Build: copy src and inject API URL
rm -rf "$BUILD_DIR"
cp -r "$PROJECT_ROOT/src" "$BUILD_DIR"
find "$BUILD_DIR" -name "*.html" -exec sed -i '' "s|%%CONTACT_API_URL%%|${CONTACT_API}|g" {} +

echo "Uploading site to s3://$BUCKET ..."
aws s3 sync "$BUILD_DIR/" "s3://$BUCKET/" \
  --delete \
  --exclude ".gitkeep" \
  --cache-control "public, max-age=86400" \
  --profile brahmora

echo "Invalidating CloudFront cache ..."
aws cloudfront create-invalidation \
  --distribution-id "$DIST_ID" \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text \
  --profile brahmora

rm -rf "$BUILD_DIR"

echo "Done! Site will be live at https://brahmora.co.uk shortly."
