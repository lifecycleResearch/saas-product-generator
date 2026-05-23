# SaaS Product Generator

Turn any product idea into a deployed SaaS landing page. Supports OCR for scanned documents, prompt-based idea input, and structured data files.

## Pipeline

```
Idea (prompt / file / OCR) → Extract Data → Generate Code → GitHub → Vercel / Hostinger
```

## Quick Start

```bash
# From a single product idea:
./run_pipeline.sh "FDARecallAlert" "Regulatory" 499

# From a data file:
./run_pipeline.sh --file saas-products-data.json
```

## Manual Steps

### 1. Extract Product Data

**From a prompt:** Write product data to `saas-products-data.json` (see schema below).

**From a scanned file (OCR):**
```bash
pip install pytesseract pillow pdf2image
brew install tesseract
python3 ocr_extract.py --file business-plan.pdf --output saas-products-data.json
```

**From Excel/CSV:**
```bash
python3 extract_products.py --input data.xlsx --output saas-products-data.json
```

### 2. Generate Code

```bash
python3 build_saas_products.py
```

Creates individual Next.js repos in `saas-products/` with:
- SEO-optimized landing pages (meta tags, Open Graph, JSON-LD schema)
- Stripe checkout integration
- Supabase database schema
- CSS variable theming (AgencyOS design system)
- shadcn-like reusable components
- Lucide React icons

### 3. Deploy

**To Vercel:**
```bash
npx vercel --prod --yes --name <product-slug> --cwd saas-products/<product-slug>
```

**To Hostinger:**
```bash
./deploy_to_hostinger.sh <product-slug>
```

## Design System

Uses the **AgencyOS** design patterns:
- CSS variable theming (`--color-primary`, `--color-secondary`, etc.)
- Tailwind CSS variable mapping
- shadcn-like UI components (Button, Card, Badge, SectionHeader)
- Lucide React icons
- Inter font via Google Fonts
- Mobile-responsive layout with sticky header

### Category Color Map

| Category | Color |
|---|---|
| Regulatory | `#059669` |
| Lead Gen | `#2563eb` |
| Legal/Finance | `#7c3aed` |
| Healthcare | `#dc2626` |
| Legal | `#4f46e5` |
| GovContracts | `#b45309` |
| Financial | `#0891b2` |
| HR/Workforce | `#d97706` |
| Real Estate | `#0d9488` |
| Digital | `#6366f1` |

## Product Data Schema

```json
{
  "id": 1,
  "name": "FDARecallAlert",
  "category": "Regulatory",
  "starter": 499,
  "pro": 2500,
  "enterprise": 9500,
  "competitor": "Westlaw",
  "comp_price": 2000,
  "customer_roi": 5000000,
  "best_bundle": "Liability Intelligence Suite",
  "bundle_price": 6500,
  "old_price": 999,
  "uplift": 10.0
}
```

## Repo Structure

```
saas-product-generator/
├── saas-base-template/      # Next.js base template with components
│   ├── components/ui/       # Button, Card, Badge, SectionHeader
│   ├── components/layout/   # Header, Footer
│   ├── components/sections/ # Hero, Features, Pricing, Comparison, ROI, Bundle, CTA
│   ├── lib/                 # utils, stripe, supabase
│   ├── pages/               # index, pricing, _app, _document
│   └── styles/              # globals.css, theme.css
├── build_saas_products.py   # Generator script
├── extract_products.py      # Excel/CSV data extractor
├── ocr_extract.py           # OCR handler for scanned docs
├── deploy_all.sh            # Bulk Vercel deploy
├── deploy_to_hostinger.sh   # Hostinger deploy
├── run_pipeline.sh          # End-to-end pipeline
└── saas-products-data.example.json
```
