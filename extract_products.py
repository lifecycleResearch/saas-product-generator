import pandas as pd
import json
import math

def to_float(v):
    if pd.isna(v):
        return 0.0
    try:
        return float(str(v).replace('%', '').replace('$', '').replace(',', ''))
    except:
        return 0.0

def to_int(v):
    if pd.isna(v):
        return 0
    try:
        return int(float(str(v).replace('%', '').replace('$', '').replace(',', '')))
    except:
        return 0

df = pd.read_excel('/Users/richardkamolvathin/Downloads/apex pricing intelligence.xlsx', header=None)
data = df.iloc[4:]
products = []
for idx, row in data.iterrows():
    if pd.notna(row[0]) and pd.notna(row[1]):
        try:
            product = {
                'id': int(row[0]),
                'name': str(row[1]).strip(),
                'category': str(row[2]).strip() if pd.notna(row[2]) else '',
                'old_price': to_int(row[3]),
                'starter': to_int(row[4]),
                'pro': to_int(row[5]),
                'enterprise': to_int(row[6]),
                'one_time_fee': to_int(row[7]),
                'annual_pkg': to_int(row[8]),
                'outcome_pct': to_float(row[9]),
                'best_bundle': str(row[10]).strip() if pd.notna(row[10]) else '',
                'bundle_price': to_int(row[11]),
                'competitor': str(row[12]).strip() if pd.notna(row[12]) else '',
                'comp_price': to_int(row[13]),
                'customer_roi': to_int(row[14]),
                'annual_roi': to_int(row[15]),
                'payback_days': to_int(row[16]),
                'old_mrr': to_int(row[17]),
                'new_mrr': to_int(row[18]),
                'uplift': to_float(row[19])
            }
            products.append(product)
        except Exception as e:
            print(f"Skipping row {idx}: {e}")

with open('/Users/richardkamolvathin/saas-products-data.json', 'w') as f:
    json.dump(products, f, indent=2)

print(f'Saved {len(products)} products')
print()
for p in products:
    roi_str = f"${p['customer_roi']:,}" if p['customer_roi'] > 0 else "N/A"
    print(f"  {p['id']:>2}. {p['name']:<35} | ${p['starter']:>5}/mo | uplift: {p['uplift']:>5.1f}x | ROI: {roi_str}")
