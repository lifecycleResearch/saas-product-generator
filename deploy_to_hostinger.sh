#!/bin/bash
# Deploy a SaaS product to Hostinger (static export)
# Usage: ./deploy_to_hostinger.sh <product-slug> [hostinger-path]

set -e

PRODUCT_SLUG="${1:?Usage: deploy_to_hostinger.sh <product-slug> [hostinger-path]}"
HOSTINGER_PATH="${2:-/domains/$PRODUCT_SLUG/public_html}"
PRODUCT_DIR="/Users/richardkamolvathin/saas-products/$PRODUCT_SLUG"

if [ ! -d "$PRODUCT_DIR" ]; then
  echo "Error: Product directory not found: $PRODUCT_DIR"
  exit 1
fi

echo "=== Building $PRODUCT_SLUG for Hostinger ==="
cd "$PRODUCT_DIR"

# Install deps
npm install --silent

# Build
npm run build

# Export static HTML
echo "Exporting static files..."
npx next export -o out

echo "=== Deploying to Hostinger ==="
echo "Target: $HOSTINGER_PATH"
echo ""
echo "To deploy via rsync (requires SSH access):"
echo "  rsync -avz --delete out/ user@hostinger:$HOSTINGER_PATH"
echo ""
echo "Or upload the 'out/' directory manually via Hostinger file manager."
echo ""
echo "=== Done ==="
