import Head from 'next/head'
import { useState, useMemo } from 'react'
import { Search, Filter, ChevronRight, Star, Zap, Shield, Users, ArrowRight, Check } from 'lucide-react'

interface CatalogProduct {
  slug: string
  name: string
  category: string
  tagline: string
  hook: string
  description: string
  primaryColor: string
  pricing: {
    starter: { price: number; features: string[] }
    pro: { price: number; features: string[] }
    enterprise: { price: number; features: string[] }
  }
  features: { title: string; icon: string; benefit: string }[]
}

const CATEGORY_META: Record<string, { label: string; icon: string; color: string; gradient: string; description: string }> = {
  'Developer Tools': { label: 'Dev Tools', icon: '⚡', color: '#6366f1', gradient: 'from-indigo-600 to-violet-600', description: 'Ship faster with intelligent developer platforms' },
  'Creative/Design': { label: 'Creative', icon: '🎨', color: '#ec4899', gradient: 'from-pink-600 to-rose-600', description: 'Design, create, and monetize your creative work' },
  'Content Marketing': { label: 'Content', icon: '✍️', color: '#f59e0b', gradient: 'from-amber-500 to-orange-600', description: 'Content engines that drive traffic and conversions' },
  'Video/Media': { label: 'Video', icon: '🎬', color: '#ef4444', gradient: 'from-red-600 to-red-700', description: 'Produce, edit, and distribute video at scale' },
  'Freelance Platform': { label: 'Freelance', icon: '💼', color: '#10b981', gradient: 'from-emerald-600 to-teal-600', description: 'Platform power for freelancers and agencies' },
  'Healthcare': { label: 'Healthcare', icon: '🏥', color: '#0ea5e9', gradient: 'from-sky-600 to-cyan-600', description: 'Intelligent healthcare monitoring and compliance' },
  'Regulatory': { label: 'Regulatory', icon: '⚖️', color: '#8b5cf6', gradient: 'from-violet-600 to-purple-700', description: 'Never miss a regulatory change again' },
  'Legal': { label: 'Legal', icon: '📜', color: '#84cc16', gradient: 'from-lime-600 to-green-700', description: 'Legal intelligence and compliance automation' },
  'GovContracts': { label: 'GovCon', icon: '🏛️', color: '#14b8a6', gradient: 'from-teal-600 to-teal-700', description: 'Win more government contracts with real-time intel' },
  'Lead Gen': { label: 'Leads', icon: '🎯', color: '#f97316', gradient: 'from-orange-600 to-amber-600', description: 'Find and close leads before your competitors' },
  'Legal/Finance': { label: 'Legal/Finance', icon: '💰', color: '#06b6d4', gradient: 'from-cyan-600 to-sky-600', description: 'Financial and legal intelligence in one platform' },
  'Digital': { label: 'Digital', icon: '🌍', color: '#a855f7', gradient: 'from-purple-600 to-indigo-600', description: 'Digital intelligence and monitoring platforms' },
  'Real Estate': { label: 'Real Estate', icon: '🏠', color: '#e11d48', gradient: 'from-rose-600 to-pink-700', description: 'Property intelligence and market monitoring' },
  'HR/Workforce': { label: 'HR', icon: '👥', color: '#0d9488', gradient: 'from-teal-600 to-emerald-600', description: 'Workforce monitoring and HR automation' },
  'Financial': { label: 'Finance', icon: '📊', color: '#2563eb', gradient: 'from-blue-600 to-indigo-600', description: 'Financial data and market intelligence' },
  'ESG/Finance': { label: 'ESG', icon: '🌱', color: '#65a30d', gradient: 'from-green-600 to-lime-600', description: 'ESG scoring and sustainability tracking' },
  'HR/Legal': { label: 'HR/Legal', icon: '⚖️', color: '#d946ef', gradient: 'from-fuchsia-600 to-purple-600', description: 'HR compliance and legal workforce intelligence' },
  'Retail/Dispensary': { label: 'Retail', icon: '🏪', color: '#10b981', gradient: 'from-emerald-600 to-green-600', description: 'All-in-one platforms for smoke shops, hemp, and retail' },
}

export default function CatalogPage({ products }: { products: CatalogProduct[] }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)))
    return cats.sort((a, b) => {
      const countA = products.filter(p => p.category === a).length
      const countB = products.filter(p => p.category === b).length
      return countB - countA
    })
  }, [products])

  const filtered = useMemo(() => {
    let result = products
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features.some(f => f.title.toLowerCase().includes(q))
      )
    }
    return result
  }, [products, activeCategory, search])

  return (
    <>
      <Head>
        <title>Apex Freelance Empire — 231 SaaS Products for Every Industry</title>
        <meta name="description" content="Discover 231 intelligence platforms spanning developer tools, creative suites, content marketing, video production, and more. Each product is purpose-built for its market." />
        <meta property="og:title" content="Apex Freelance Empire — 231 SaaS Products" />
        <meta property="og:description" content="Purpose-built SaaS platforms for every industry. Find the perfect tool for your market." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://grea.site" />
        <link rel="canonical" href="https://grea.site" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Apex Freelance Empire SaaS Products',
              description: '231 purpose-built SaaS platforms for every industry',
              numberOfItems: products.length,
              itemListElement: filtered.slice(0, 50).map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `https://${p.slug}.grea.site`,
                name: p.name,
                description: p.tagline,
              })),
            }),
          }}
        />
      </Head>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" /> 231 Products. Every Industry. One Platform.
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Intelligence for<br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Every Market
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Each product is purpose-built for its industry — with features, pricing, and UX tailored to how your market actually works. Not another generic tool.
            </p>

            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, categories, or features..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg backdrop-blur-sm"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.slice(0, 8).map((cat) => {
                const meta = CATEGORY_META[cat] || { icon: '🔧', color: '#6366f1', label: cat }
                const count = products.filter(p => p.category === cat).length
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? 'all' : cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-white text-gray-900 shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {meta.icon} {meta.label || cat} ({count})
                  </button>
                )
              })}
              {categories.length > 8 && (
                <span className="px-4 py-2 text-gray-400 text-sm">
                  +{categories.length - 8} more
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeCategory === 'all' ? 'All Products' : CATEGORY_META[activeCategory]?.label || activeCategory}
              <span className="text-gray-400 font-normal text-lg ml-2">({filtered.length})</span>
            </h2>
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                Show all →
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => {
              const meta = CATEGORY_META[product.category] || { icon: '🔧', color: '#6366f1', gradient: 'from-gray-600 to-gray-700', label: product.category, description: '' }
              return (
                <a
                  key={product.slug}
                  href={`https://${product.slug}.grea.site`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`bg-gradient-to-r ${meta.gradient} p-6 pb-4`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{meta.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{product.name}</h3>
                        <span className="text-xs text-white/70 font-medium">{meta.label}</span>
                      </div>
                    </div>
                    <p className="text-white/90 text-sm line-clamp-2">{product.tagline}</p>
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.features.slice(0, 3).map((f) => (
                        <span key={f.title} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                          {f.title}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${product.pricing.starter.price}</span>
                        <span className="text-gray-400 text-sm">/mo</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                        Try free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try a different search term or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Category Showcase */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Built for Your <span className="text-indigo-600">Market</span>, Not Ours
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, 6).map((cat) => {
              const meta = CATEGORY_META[cat] || { icon: '🔧', label: cat, color: '#6366f1', gradient: 'from-gray-600 to-gray-700', description: '' }
              const count = products.filter(p => p.category === cat).length
              const topProducts = products.filter(p => p.category === cat).slice(0, 3)
              return (
                <div key={cat} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{meta.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{meta.label}</h3>
                      <p className="text-sm text-gray-500">{count} products</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{meta.description}</p>
                  <div className="space-y-2">
                    {topProducts.map((p) => (
                      <a key={p.slug} href={`https://${p.slug}.grea.site`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600">
                        <ChevronRight className="w-3 h-3" />
                        {p.name}
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Find Your Product. Start Your Free Trial.
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            231 purpose-built platforms. Every one comes with a 30-day money-back guarantee.
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors"
          >
            Explore All Products <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-lg text-white">Apex Freelance Empire</span>
            </div>
            <p className="text-sm">231 purpose-built SaaS platforms for every industry.</p>
            <p className="text-xs mt-4 text-gray-500">&copy; {new Date().getFullYear()} Apex Freelance Empire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export async function getStaticProps() {
  const products = (await import('../lib/enriched-data.json')).default as CatalogProduct[]
  return {
    props: { products },
  }
}