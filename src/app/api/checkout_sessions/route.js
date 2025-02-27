import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/lib/stripe'

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1QwxuQBVjR0AsiiUgY9tlwU2',
          quantity: 1,
        },
      ],
      mode: 'payment',
      
      success_url: `${origin}/insights/{CHECKOUT_SESSION_ID}?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}