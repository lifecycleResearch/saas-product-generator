import { ArrowRight, X, Check } from 'lucide-react'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'
import type { ProductData } from '../../lib/product-data'

export function Comparison({ product }: { product: ProductData }) {
  if (!product.competitor) return null

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={`Why Choose ${product.name}?`}
          description="See how we compare to the competition"
        />
        <div className="max-w-3xl mx-auto">
          <div className="bg-surface rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="col-span-1" />
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">{product.name[0]}</span>
                </div>
                <p className="font-semibold text-text text-sm">{product.name}</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center mx-auto mb-2">
                  <span className="text-gray-500 font-bold text-sm">{product.competitor.name[0]}</span>
                </div>
                <p className="font-semibold text-text text-sm">{product.competitor.name}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-border">
                <p className="text-sm text-text-muted">Starting Price</p>
                <p className="text-center font-bold text-primary text-lg">
                  ${product.pricing.starter.price.toLocaleString()}<span className="text-sm font-normal">/mo</span>
                </p>
                <p className="text-center text-text-muted line-through">
                  ${product.competitor.price.toLocaleString()}<span className="text-sm">/mo</span>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-border">
                <p className="text-sm text-text-muted">Real-time Data</p>
                <div className="flex justify-center"><Check className="w-5 h-5 text-primary" /></div>
                <div className="flex justify-center"><Check className="w-5 h-5 text-gray-300" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-border">
                <p className="text-sm text-text-muted">API Access</p>
                <div className="flex justify-center"><Check className="w-5 h-5 text-primary" /></div>
                <div className="flex justify-center"><X className="w-5 h-5 text-gray-300" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-border">
                <p className="text-sm text-text-muted">Custom Alerts</p>
                <div className="flex justify-center"><Check className="w-5 h-5 text-primary" /></div>
                <div className="flex justify-center"><X className="w-5 h-5 text-gray-300" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center py-3">
                <p className="text-sm text-text-muted">Dedicated Support</p>
                <div className="flex justify-center"><Check className="w-5 h-5 text-primary" /></div>
                <div className="flex justify-center"><X className="w-5 h-5 text-gray-300" /></div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button as="a" href={`/api/auth/signup?ref=${product.slug}`}>
              Switch to {product.name} Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
