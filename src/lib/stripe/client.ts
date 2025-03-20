import { loadStripe } from '@stripe/stripe-js'

// Load your stripe publishable key from environment variables
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)
