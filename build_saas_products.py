import json, os, subprocess, re, shutil

BASE = "/Users/richardkamolvathin/saas-products"
TEMPLATE = "/Users/richardkamolvathin/saas-base-template"
DATA_FILE = "/Users/richardkamolvathin/saas-products-data.json"

with open(DATA_FILE) as f:
    products = json.load(f)

def slug(n):
    s = re.sub(r'[^a-z0-9]+', '-', n.lower()).strip('-')
    return s if s else "product"

CATEGORY_COLORS = {
    "regulatory": "#059669",
    "lead gen": "#2563eb",
    "legal/finance": "#7c3aed",
    "healthcare": "#dc2626",
    "esg/finance": "#16a34a",
    "legal": "#4f46e5",
    "govcontracts": "#b45309",
    "financial": "#0891b2",
    "hr/legal": "#be185d",
    "hr/workforce": "#d97706",
    "real estate": "#0d9488",
    "digital": "#6366f1",
}

def pick_color(cat):
    for k, v in CATEGORY_COLORS.items():
        if k in cat.lower():
            return v
    return "#6366f1"

def gen_product_data_ts(p):
    return f"""export interface PriceTier {{
  price: number
  queries: string
  features: string[]
}}

export interface PricingData {{
  starter: PriceTier
  pro: PriceTier
  enterprise: PriceTier
}}

export interface ProductData {{
  name: string
  slug: string
  tagline: string
  description: string
  category: string
  primaryColor: string
  pricing: PricingData
  competitor?: {{
    name: string
    price: number
  }}
  roi: number
  bundle?: {{
    name: string
    price: number
  }}
}}

const pricing = {{
  starter: {{
    price: {p['starter']},
    queries: "1,000",
    features: ["1,000 queries/month", "Email alerts", "Basic dashboard", "CSV export"],
  }},
  pro: {{
    price: {p['pro']},
    queries: "10,000",
    features: ["10,000 queries/month", "Real-time alerts", "API access", "Advanced analytics", "Priority support"],
  }},
  enterprise: {{
    price: {p['enterprise']},
    queries: "Unlimited",
    features: ["Unlimited queries", "Custom integrations", "Dedicated support", "White-label option", "SLA guarantee"],
  }},
}}

export const product: ProductData = {{
  name: {json.dumps(p['name'])},
  slug: {json.dumps(slug(p['name']))},
  tagline: "Intelligence Platform",
  description: "Enterprise-grade {p['name'].lower()} intelligence platform delivering real-time data and actionable insights.",
  category: {json.dumps(p['category'])},
  primaryColor: {json.dumps(pick_color(p['category']))},
  pricing,
  {"competitor: { name: " + json.dumps(p['competitor']) + ", price: " + str(p['comp_price']) + " }," if p.get('competitor') else ""}
  roi: {p.get('customer_roi', 0)},
  {"bundle: { name: " + json.dumps(p['best_bundle']) + ", price: " + str(p['bundle_price']) + " }," if p.get('best_bundle') and p.get('bundle_price') else ""}
}}
"""

def gen_theme_css(p):
    color = pick_color(p['category'])
    return f""":root {{
  --color-primary: {color};
  --color-secondary: #0d9488;
  --color-accent: #6366f1;
  --color-background: #fafaf8;
  --color-surface: #f5f3ef;
  --color-text: #1f2937;
  --color-text-muted: #6b7280;
  --color-border: #e5dfd3;
}}
"""

def gen_index_tsx(p):
    desc = f"Enterprise-grade {p['name'].lower()} intelligence platform delivering real-time data and actionable insights."
    prod_slug = slug(p['name'])
    col = pick_color(p['category'])

    schema = json.dumps({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": p['name'],
        "applicationCategory": "BusinessApplication",
        "description": desc,
        "offers": {"@type": "Offer", "price": p['starter'], "priceCurrency": "USD"},
    })

    return f"""import Head from 'next/head'
import {{ Header }} from '../components/layout/Header'
import {{ Footer }} from '../components/layout/Footer'
import {{ Hero }} from '../components/sections/Hero'
import {{ Features }} from '../components/sections/Features'
import {{ Pricing }} from '../components/sections/Pricing'
import {{ Comparison }} from '../components/sections/Comparison'
import {{ ROI }} from '../components/sections/ROI'
import {{ Bundle }} from '../components/sections/Bundle'
import {{ CTA }} from '../components/sections/CTA'
import {{ product }} from '../lib/product-data'

export default function Home() {{
  return (
    <>
      <Head>
        <title>{p['name']} — Intelligence Platform</title>
        <meta name="description" content="{desc}" />
        <meta name="keywords" content="{p['category']}, {p['name']}, data intelligence, monitoring, alerts" />
        <meta property="og:title" content="{p['name']} — Intelligence Platform" />
        <meta property="og:description" content="{desc}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://{prod_slug}.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="{p['name']} — Intelligence Platform" />
        <meta name="twitter:description" content="{desc}" />
        <link rel="canonical" href="https://{prod_slug}.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{{{__html: JSON.stringify({schema})}}}}
        />
      </Head>
      <Header productName={{product.name}} slug={{product.slug}} />
      <main>
        <Hero product={{product}} />
        <Features product={{product}} />
        <Pricing product={{product}} />
        <Comparison product={{product}} />
        <ROI product={{product}} />
        <Bundle product={{product}} />
        <CTA product={{product}} />
      </main>
      <Footer product={{product}} />
    </>
  )
}}
"""

def gen_checkout_ts(p):
    with open(os.path.join(TEMPLATE, "pages/api/create-checkout-session.ts")) as f:
        content = f.read()
    content = content.replace("__STARTER_PRICE__", str(p['starter']))
    content = content.replace("__PRO_PRICE__", str(p['pro']))
    content = content.replace("__ENTERPRISE_PRICE__", str(p['enterprise']))
    content = content.replace("__PRODUCT_NAME__", p['name'])
    content = content.replace("__PRODUCT_SLUG__", slug(p['name']))
    content = content.replace("__PRODUCT_DESCRIPTION__", p.get('category', '').lower() + ' intelligence')
    return content

def gen_auth_ts(p):
    with open(os.path.join(TEMPLATE, "pages/api/auth/[[...auth]].ts")) as f:
        content = f.read()
    content = content.replace("__PRODUCT_NAME__", p['name'])
    return content

def gen_pricing_tsx(p):
    prod_slug = slug(p['name'])
    desc = f"Enterprise-grade {p['name'].lower()} intelligence platform delivering real-time data and actionable insights."
    return f"""import Head from 'next/head'
import {{ Header }} from '../components/layout/Header'
import {{ Footer }} from '../components/layout/Footer'
import {{ Pricing }} from '../components/sections/Pricing'
import {{ CTA }} from '../components/sections/CTA'
import {{ product }} from '../lib/product-data'

export default function PricingPage() {{
  return (
    <>
      <Head>
        <title>Pricing — {p['name']}</title>
        <meta name="description" content="View {p['name']} pricing plans. Start with a free trial, no credit card required." />
        <link rel="canonical" href="https://{prod_slug}.vercel.app/pricing" />
      </Head>
      <Header productName={{product.name}} slug={{product.slug}} />
      <main className="pt-24">
        <Pricing product={{product}} />
        <CTA product={{product}} />
      </main>
      <Footer product={{product}} />
    </>
  )
}}
"""

def gen_package_json(p):
    prod_slug = slug(p['name'])
    return {
        "name": prod_slug,
        "version": "1.0.0",
        "private": True,
        "scripts": {
            "dev": "next dev",
            "build": "next build",
            "start": "next start",
            "lint": "next lint"
        },
        "dependencies": {
            "next": "latest",
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "lucide-react": "^0.460.0",
            "clsx": "^2.1.0",
            "tailwind-merge": "^2.6.0",
            "@stripe/stripe-js": "^2.1.0",
            "stripe": "^14.0.0",
            "@supabase/supabase-js": "^2.38.0"
        },
        "devDependencies": {
            "@types/node": "^20.0.0",
            "@types/react": "^18.2.0",
            "@types/react-dom": "^18.2.0",
            "typescript": "^5.0.0",
            "tailwindcss": "^3.4.0",
            "autoprefixer": "^10.4.0",
            "postcss": "^8.4.0"
        }
    }

def gen_env_template(p):
    prod_slug = slug(p['name'])
    return f"""# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_KEY=
STRIPE_SECRET_KEY=

# Site URL
NEXT_PUBLIC_SITE_URL=https://{prod_slug}.vercel.app
"""

def generate(p):
    prod_slug = slug(p['name'])
    d = os.path.join(BASE, prod_slug)
    if os.path.exists(d):
        print(f"  SKIP {prod_slug} (already exists)")
        return
    
    print(f"  GEN {p['id']:>2}. {p['name']:<35}")
    
    # Copy base template
    shutil.copytree(TEMPLATE, d, symlinks=False, ignore=shutil.ignore_patterns('.git', '__pycache__'))
    
    # Remove old per-product files from template (they get regenerated)
    for f in [".env.local.template", "database/schema.sql", "lib/product-data.ts"]:
        pth = os.path.join(d, f)
        if os.path.exists(pth):
            os.remove(pth)
    
    # Regenerate per-product files
    files = {
        "lib/product-data.ts": gen_product_data_ts(p),
        "styles/theme.css": gen_theme_css(p),
        "pages/index.tsx": gen_index_tsx(p),
        "pages/pricing.tsx": gen_pricing_tsx(p),
        "pages/api/create-checkout-session.ts": gen_checkout_ts(p),
        "pages/api/auth/[[...auth]].ts": gen_auth_ts(p),
        "package.json": json.dumps(gen_package_json(p), indent=2),
        ".env.local.template": gen_env_template(p),
        "database/schema.sql": "CREATE TABLE profiles(id UUID PRIMARY KEY DEFAULT gen_random_uuid(),email VARCHAR(255)UNIQUE NOT NULL,full_name VARCHAR(255),plan VARCHAR(50)DEFAULT 'free',stripe_customer_id VARCHAR(255),subscription_id VARCHAR(255),subscription_status VARCHAR(50)DEFAULT 'inactive',queries_used INT DEFAULT 0,queries_limit INT DEFAULT 1000,created_at TIMESTAMP DEFAULT NOW());\nCREATE INDEX idx_profiles_email ON profiles(email);\nCREATE INDEX idx_profiles_stripe_customer ON profiles(stripe_customer_id);\n",
    }
    
    for path, content in files.items():
        full_path = os.path.join(d, path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, 'w') as f:
            f.write(content)
    
    # Git init
    subprocess.run(["git", "init"], cwd=d, capture_output=True)
    subprocess.run(["git", "config", "user.email", "deploy@saas-products.com"], cwd=d, capture_output=True)
    subprocess.run(["git", "config", "user.name", "SaaS Deploy"], cwd=d, capture_output=True)
    subprocess.run(["git", "add", "-A"], cwd=d, capture_output=True)
    subprocess.run(["git", "commit", "-m", f"Initial commit: {p['name']}"], cwd=d, capture_output=True)

def main():
    ps = sorted(products, key=lambda p: p['uplift'], reverse=True)
    total = len(ps)
    print(f"Generating {total} SaaS product repos from template...\\n")
    for i, p in enumerate(ps, 1):
        print(f"[{i}/{total}] ", end="")
        generate(p)
    
    print(f"\\n{'='*60}")
    print(f"Done! {total} repos created in {BASE}")
    print(f"{'='*60}")
    for p in sorted(ps, key=lambda x: x['id']):
        print(f"  {p['id']:>2}. {slug(p['name']):<40} ${p['starter']}/mo")

if __name__ == "__main__":
    main()
