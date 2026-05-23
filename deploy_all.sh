#!/bin/bash
# Deploy all products from saas-products-data.json to Vercel
# Usage: SAAS_DATA_FILE=/path/to/data.json SAAS_OUTPUT_DIR=/path/to/products ./deploy_all.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "========================================"
echo "Deploying all SaaS products to Vercel..."
echo "========================================"

python3 "$SCRIPT_DIR/deploy_all.py"
