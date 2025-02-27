import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';


// Initialize Stripe server-side instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Initialize Stripe client-side promise
let stripePromise;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

// Create a checkout session
export const createCheckoutSession = async (userData) => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  
  return response.json();
};

// Verify payment
export const verifyPayment = async (sessionId) => {
  const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Payment verification failed');
  }
  
  return response.json();
};