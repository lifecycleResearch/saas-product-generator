#!/usr/bin/env python3
"""Deploy all products from saas-products-data.json to Vercel."""
import json, subprocess, sys, time, os

DATA_FILE = os.environ.get("SAAS_DATA_FILE", "/Users/richardkamolvathin/saas-products-data.json")
OUTPUT_DIR = os.environ.get("SAAS_OUTPUT_DIR", "/Users/richardkamolvathin/saas-products")

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_saas_products import slug

with open(DATA_FILE) as f:
    products = json.load(f)

total = len(products)
for i, p in enumerate(products, 1):
    s = slug(p['name'])
    d = os.path.join(OUTPUT_DIR, s)
    print(f'[{i}/{total}] Deploying: {p["name"]} ({s})')
    result = subprocess.run(
        ['npx', 'vercel', '--prod', '--yes', '--name', s, '--cwd', d],
        capture_output=True, text=True, cwd=d, timeout=120
    )
    last_line = (result.stdout or result.stderr or '').strip().split('\n')[-1]
    print(f'  {last_line}')
    if i < total:
        time.sleep(5)

print('All deployments complete!')
