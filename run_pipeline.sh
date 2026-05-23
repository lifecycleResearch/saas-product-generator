#!/bin/bash
# Full pipeline: idea → deploy
# Usage: ./run_pipeline.sh <product-name> [category] [starter-price]
#
# Or with a data file:
#   ./run_pipeline.sh --file saas-products-data.json

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "============================================"
echo " SaaS Product Generator Pipeline"
echo "============================================"

if [ "$1" = "--file" ] && [ -n "$2" ]; then
  echo "Using data file: $2"
  cp "$2" "$SCRIPT_DIR/saas-products-data.json"
else
  echo "Creating product from arguments..."
  python3 -c "
import json, sys
name = sys.argv[1] if len(sys.argv) > 1 else input('Product name: ')
cat = sys.argv[2] if len(sys.argv) > 2 else input('Category: ')
price = int(sys.argv[3]) if len(sys.argv) > 3 else int(input('Starter price (\$): ') or '499')
product = {
    'id': 1, 'name': name, 'category': cat,
    'starter': price, 'pro': price * 5, 'enterprise': price * 19,
    'competitor': '', 'comp_price': 0, 'customer_roi': price * 10000,
    'best_bundle': '', 'bundle_price': 0,
    'old_price': price * 2, 'uplift': 10.0
}
with open('saas-products-data.json', 'w') as f:
    json.dump([product], f, indent=2)
print(f'Created product: {name}')
" "$@"
fi

echo ""
echo "=== Step 1: Generate Code ==="
python3 "$SCRIPT_DIR/build_saas_products.py"

PRODUCT_SLUG=$(python3 -c "
import json
with open('$SCRIPT_DIR/saas-products-data.json') as f:
    p = json.load(f)[0]
import re
print(re.sub(r'[^a-z0-9]+', '-', p['name'].lower()).strip('-'))
")

echo ""
echo "=== Step 2: Build Check ==="
cd "$SCRIPT_DIR/saas-products/$PRODUCT_SLUG"
npm install --silent 2>/dev/null
npm run build 2>&1 | tail -5

echo ""
echo "=== Step 3: Deploy to Vercel ==="
npx vercel --prod --yes --name "$PRODUCT_SLUG" --cwd "$SCRIPT_DIR/saas-products/$PRODUCT_SLUG"

echo ""
echo "============================================"
echo " Deployed: https://$PRODUCT_SLUG.vercel.app"
echo "============================================"
