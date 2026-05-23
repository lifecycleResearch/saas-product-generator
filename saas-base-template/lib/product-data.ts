export interface PriceTier {
  price: number
  queries: string
  features: string[]
}

export interface PricingData {
  starter: PriceTier
  pro: PriceTier
  enterprise: PriceTier
}

export interface ProductData {
  name: string
  slug: string
  tagline: string
  description: string
  category: string
  primaryColor: string
  pricing: PricingData
  competitor?: {
    name: string
    price: number
  }
  roi: number
  bundle?: {
    name: string
    price: number
  }
  features?: string[]
}
