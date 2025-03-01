import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ message: 'Session ID is required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        {
          verified: false,
          message: 'Payment has not been completed',
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      verified: true,
      customerDetails: session.customer_details,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error('Payment verification error:', error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
