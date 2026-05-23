#!/bin/bash
# Deploy all products from saas-products-data.json to Vercel
# Usage: ./deploy_all.sh [--data saas-products-data.json]

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DATA_FILE="${2:-$SCRIPT_DIR/saas-products-data.json}"
OUTPUT_DIR="${SAAS_OUTPUT_DIR:-$SCRIPT_DIR/saas-products}"

echo "========================================"
echo "Deploying all SaaS products to Vercel..."
echo "========================================"
echo ""

python3 -c "
import json, subprocess, sys, time
sys.path.insert(0, '$SCRIPT_DIR')
from build_saas_products import slug

with open('$DATA_FILE') as f:
    products = json.load(f)

total = len(products)
for i, p in enumerate(products, 1):
    s = slug(p['name'])
    d = '$OUTPUT_DIR/' + s
    print(f'[{i}/{total}] Deploying: {p[\"name\"]} ({s})')
    result = subprocess.run(
        ['npx', 'vercel', '--prod', '--yes', '--name', s, '--cwd', d],
        capture_output=True, text=True, cwd=d
    )
    last_line = result.stdout.strip().split(chr(10))[-1] if result.stdout else result.stderr.strip().split(chr(10))[-1]
    print(f'  {last_line}')
    print()
    if i < total:
        time.sleep(5)
"

echo "========================================"
echo "All deployments complete!"
echo "========================================"
