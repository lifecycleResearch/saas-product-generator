import Head from 'next/head'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const redirectTo = `${window.location.origin}/api/auth/callback`

    const { error } = mode === 'signin'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } })

    if (error) {
      setMessage(error.message)
    } else if (mode === 'signup') {
      setMessage('Check your email for the confirmation link!')
    } else {
      setMessage('Signed in successfully! Redirecting...')
      window.location.href = '/'
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</title>
      </Head>
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text">
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-text-muted mt-2">
              {mode === 'signin' ? 'Sign in to your account' : 'Start your free trial today'}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border shadow-sm p-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                required
                minLength={6}
              />
            </div>
            {message && (
              <p className={`text-sm ${message.includes('error') || message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white rounded-lg py-2.5 font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
            <p className="text-center text-sm text-text-muted">
              {mode === 'signin' ? (
                <>Don&apos;t have an account?{' '}
                  <button type="button" onClick={() => { setMode('signup'); setMessage('') }} className="text-primary hover:underline font-medium">
                    Sign up
                  </button>
                </>
              ) : (
                <>Already have an account?{' '}
                  <button type="button" onClick={() => { setMode('signin'); setMessage('') }} className="text-primary hover:underline font-medium">
                    Sign in
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
