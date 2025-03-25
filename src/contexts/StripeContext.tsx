'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'
import { CreditPackage } from '@/types/api'

interface StripeContextType {
  creditPackages: CreditPackage[]
  loading: boolean
  error: Error | null
  fetchProducts: () => Promise<void>
}

const StripeContext = createContext<StripeContextType>({
  creditPackages: [],
  loading: true,
  error: null,
  fetchProducts: async () => {},
})

export function StripeProvider({ children }: { children: React.ReactNode }) {
  const [creditPackages, setCreditPackages] = useState<CreditPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/stripe/products')
      const data = await response.json()

      if (data.products) {
        setCreditPackages(
          data.products.map((product: CreditPackage) => ({
            id: product.id,
            name: product.name,
            priceId: product.priceId,
            price: product.price,
            currency: product.currency,
            quantity: product.quantity,
            credits: product.credits,
          })),
        )
      } else {
        throw new Error('No products returned from API')
      }
    } catch (error) {
      console.error('Error fetching Stripe products:', error)
      setError(
        error instanceof Error
          ? error
          : new Error('Failed to load credit packages'),
      )
      toast.error('Failed to load credit packages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <StripeContext.Provider
      value={{
        creditPackages,
        loading,
        error,
        fetchProducts,
      }}
    >
      {children}
    </StripeContext.Provider>
  )
}

export const useStripe = () => useContext(StripeContext)
