import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

interface HeaderProps {
  productName: string
  slug: string
}

export function Header({ productName, slug }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">{productName[0]}</span>
            </div>
            <span className="font-bold text-lg text-text">{productName}</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-text-muted hover:text-text transition-colors">Features</a>
            <a href="/pricing" className="text-text-muted hover:text-text transition-colors">Pricing</a>
            <a href={`/api/auth/login`} className="text-text-muted hover:text-text transition-colors">Sign In</a>
            <Button as="a" href={`/api/auth/signup?ref=${slug}`} size="sm">
              Start Free Trial
            </Button>
          </nav>

          <button
            className="md:hidden p-2 text-text-muted hover:text-text"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className={cn('md:hidden border-t border-border bg-white', isOpen ? 'block' : 'hidden')}>
        <div className="px-4 py-4 space-y-3">
          <a href="/#features" className="block py-2 text-text-muted hover:text-text" onClick={() => setIsOpen(false)}>Features</a>
          <a href="/pricing" className="block py-2 text-text-muted hover:text-text" onClick={() => setIsOpen(false)}>Pricing</a>
          <a href="/api/auth/login" className="block py-2 text-text-muted hover:text-text" onClick={() => setIsOpen(false)}>Sign In</a>
          <Button as="a" href="/api/auth/signup" className="w-full" onClick={() => setIsOpen(false)}>
            Start Free Trial
          </Button>
        </div>
      </div>
    </header>
  )
}
