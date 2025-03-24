import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { CreditPackage } from '@/types/api'

export async function GET() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia', // Use the latest version
    })

    // Fetch products that are active and have the 'credit_package' metadata
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    })

    // Filter to only credit packages and format the response
    const creditPackages: CreditPackage[] = products.data
      .filter((product) => product.metadata.type === 'credit_package')
      .map((product) => {
        const price = product.default_price as Stripe.Price
        return {
          id: product.id,
          name: product.name,
          price: (price.unit_amount || 0) / 100, // Convert from cents
          priceId: price.id,
          currency: price.currency,
          quantity: parseInt(product.metadata.quantity || '0'),
          credits: parseInt(price.metadata.credits || '0'),
        }
      })
      .sort((a, b) => a.credits - b.credits) // Sort by credits (ascending)

    return NextResponse.json({ products: creditPackages })
  } catch (error) {
    console.error('Error fetching Stripe products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    )
  }
}
