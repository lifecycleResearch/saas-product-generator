"""
OCR Extractor — extract SaaS product data from scanned documents/images.

Usage:
    python3 ocr_extract.py --file <path-to-image-or-pdf> [--output data.json]

Uses pytesseract for OCR. Install with:
    pip install pytesseract pillow pdf2image
    brew install tesseract  (macOS)
"""

import argparse
import json
import re
import sys

try:
    from PIL import Image
    import pytesseract
    HAS_OCR = True
except ImportError:
    HAS_OCR = False

try:
    from pdf2image import convert_from_path
    HAS_PDF = True
except ImportError:
    HAS_PDF = False


def extract_text_from_image(path: str) -> str:
    """Extract text from image using Tesseract OCR."""
    if not HAS_OCR:
        print("Error: Install pytesseract and pillow: pip install pytesseract pillow")
        print("Also install tesseract: brew install tesseract")
        sys.exit(1)

    image = Image.open(path)
    text = pytesseract.image_to_string(image)
    return text


def extract_text_from_pdf(path: str) -> str:
    """Extract text from PDF by converting pages to images first."""
    if not HAS_PDF:
        print("Error: Install pdf2image: pip install pdf2image")
        sys.exit(1)
    if not HAS_OCR:
        print("Error: Install pytesseract and pillow: pip install pytesseract pillow")
        sys.exit(1)

    images = convert_from_path(path)
    text_parts = []
    for img in images:
        text = pytesseract.image_to_string(img)
        text_parts.append(text)
    return "\n".join(text_parts)


def parse_product_data(text: str) -> dict:
    """Parse OCR text into structured product data."""
    data = {}

    name_match = re.search(r'(?:product|service|platform)[:\s]+(.+?)[\n\r]', text, re.IGNORECASE)
    if name_match:
        data['name'] = name_match.group(1).strip()

    price_match = re.search(r'\$?(\d{2,6})\s*(?:/mo|/month|per month)', text)
    if price_match:
        data['starter'] = int(price_match.group(1))

    category_match = re.search(r'(Regulatory|Healthcare|Legal|Finance|HR|Real\s?Estate|Digital|Lead\s?Gen)', text, re.IGNORECASE)
    if category_match:
        data['category'] = category_match.group(1)

    return data


def main():
    parser = argparse.ArgumentParser(description='Extract SaaS product data from scanned files')
    parser.add_argument('--file', '-f', required=True, help='Path to image or PDF file')
    parser.add_argument('--output', '-o', default='saas-products-data.json', help='Output JSON file')
    args = parser.parse_args()

    path = args.file
    ext = path.lower().split('.')[-1]

    if ext in ('pdf',):
        text = extract_text_from_pdf(path)
    elif ext in ('png', 'jpg', 'jpeg', 'tiff', 'bmp'):
        text = extract_text_from_image(path)
    else:
        print(f"Unsupported file type: {ext}")
        sys.exit(1)

    print("=== Extracted Text ===")
    print(text)
    print("=== Parsed Data ===")

    data = parse_product_data(text)
    print(json.dumps(data, indent=2))

    if args.output:
        with open(args.output, 'w') as f:
            json.dump([data], f, indent=2)
        print(f"\nSaved to {args.output}")


if __name__ == '__main__':
    main()
