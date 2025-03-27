import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { CreditPackage } from '@/types/api'

async function getCurrencyForCountry(stripe: Stripe, countryCode: string) {
  try {
    // Get supported currencies for the country
    const paymentMethods = await stripe.countrySpecs.retrieve(countryCode)

    // Get the default currency for the country
    const defaultCurrency = paymentMethods.default_currency

    return defaultCurrency
  } catch (error) {
    console.error('Error getting country specs:', error)
    return 'usd' // fallback
  }
}

export async function GET(request: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia', // Use the latest version
    })

    // Fetch products that are active and have the 'credit_package' metadata
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price', 'data.default_price.currency_options'],
    })

    // Use CloudFlare headers if you're on Vercel/CloudFlare
    const countryCode = request.headers.get('x-vercel-ip-country')
    const currency = countryCode
      ? await getCurrencyForCountry(stripe, countryCode)
      : undefined

    console.log('Country Code:', countryCode)
    console.log('Currency:', currency)

    // Filter to only credit packages and format the response
    const creditPackages: CreditPackage[] = products.data
      .filter((product) => product.metadata.type === 'credit_package')
      .map((product) => {
        const defaultPrice = product.default_price as Stripe.Price
        const userPrice = currency
          ? defaultPrice?.currency_options?.[currency]
          : defaultPrice

        return {
          id: product.id,
          name: product.name,
          price: parseInt(userPrice?.unit_amount_decimal || '0') / 100, // Convert from cents
          priceId: defaultPrice.id,
          currency: currency || defaultPrice.currency,
          quantity: parseInt(product.metadata.quantity || '0'),
          credits: parseInt(defaultPrice.metadata.credits || '0'),
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
