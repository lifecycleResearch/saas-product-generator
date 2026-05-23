import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { Features } from '../components/sections/Features'
import { Pricing } from '../components/sections/Pricing'
import { Comparison } from '../components/sections/Comparison'
import { ROI } from '../components/sections/ROI'
import { Bundle } from '../components/sections/Bundle'
import { CTA } from '../components/sections/CTA'
import { product } from '../lib/product-data'

export default function Home() {
  return (
    <>
      <Header productName={product.name} slug={product.slug} />
      <main>
        <Hero product={product} />
        <Features product={product} />
        <Pricing product={product} />
        <Comparison product={product} />
        <ROI product={product} />
        <Bundle product={product} />
        <CTA product={product} />
      </main>
      <Footer product={product} />
    </>
  )
}
