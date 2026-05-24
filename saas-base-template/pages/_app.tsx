import type { AppProps } from 'next/app'
import { ProductProvider } from '../lib/product-context'
import '../styles/globals.css'
import '../styles/theme.css'

const DEFAULT_SLUG = 'fdarecallalert'

function getSlug(ctx: any): string {
  const queryProduct = ctx.query?._product
  if (queryProduct) return queryProduct

  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    const parts = host.split('.')
    if (parts.length >= 2 && !['www', 'localhost'].includes(parts[0])) {
      return parts[0]
    }
  }

  const host = ctx.req?.headers?.host || ''
  const parts = host.split('.')
  if (parts.length >= 2 && !['www', 'localhost'].includes(parts[0])) {
    return parts[0]
  }

  return DEFAULT_SLUG
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductProvider slug={pageProps._productSlug || DEFAULT_SLUG}>
      <Component {...pageProps} />
    </ProductProvider>
  )
}

App.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const slug = getSlug(ctx)
  return { pageProps: { _productSlug: slug } }
}
