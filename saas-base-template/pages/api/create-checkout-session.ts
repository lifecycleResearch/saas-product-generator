import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

const PRICES: Record<string, number> = {
  starter: __STARTER_PRICE__,
  pro: __PRO_PRICE__,
  enterprise: __ENTERPRISE_PRICE__,
}

interface CheckoutBody {
  plan?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe not configured' })
  }

  try {
    const { plan } = req.body as CheckoutBody

    if (!plan || !PRICES[plan]) {
      return res.status(400).json({ error: 'Invalid plan selected' })
    }

    const amount = PRICES[plan]
    const origin = req.headers.origin || 'https://__PRODUCT_SLUG__.vercel.app'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `__PRODUCT_NAME__ ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
              description: '__PRODUCT_DESCRIPTION__',
            },
            unit_amount: amount * 100,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    })

    return res.status(200).json({ id: session.id })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return res.status(500).json({ error: 'Failed to create checkout session' })
  }
}
