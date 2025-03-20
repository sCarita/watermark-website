'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  doc,
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import getStripe from '@/utils/get-stripe'
import { createCheckoutSession } from '@/lib/firebase/client'
import { useSearchParams } from 'next/navigation'
import { Transaction } from '@/types/firebase'
const creditPackages = [
  { id: 'credits-50', name: '50 Credits', price: 4.99, credits: 50 },
  { id: 'credits-100', name: '100 Credits', price: 8.99, credits: 100 },
  { id: 'credits-500', name: '500 Credits', price: 39.99, credits: 500 },
]

export default function CreditsPage() {
  const t = useTranslations()

  const { user, credits } = useAuth()
  const [loading, setLoading] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  useEffect(() => {
    if (success) {
      toast.success('Credit purchase successful!')
    }

    if (canceled) {
      toast.error('Credit purchase canceled.')
    }
  }, [success, canceled])

  useEffect(() => {
    if (!user?.uid) return

    const fetchTransactions = async () => {
      const userRef = await doc(db, 'users', user.uid)

      const transactionsQuery = query(
        collection(db, 'transactionHistory'),
        where('userRef', '==', userRef),
        orderBy('createdAt', 'desc'),
      )

      const unsubscribe = onSnapshot(transactionsQuery, (querySnapshot) => {
        const transactionData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as Transaction[]
        setTransactions(transactionData)
      })

      return unsubscribe
    }

    const unsubscribe = fetchTransactions()

    return () => {
      unsubscribe.then((unsub) => unsub && unsub())
    }
  }, [user])

  const handlePurchase = async (priceId: string) => {
    if (!user) return

    setLoading(true)
    try {
      const checkoutResult = await createCheckoutSession({
        priceId,
        quantity: 1,
      })

      if (!checkoutResult.data?.sessionId) {
        throw new Error('Failed to create checkout session')
      }

      const stripe = await getStripe()
      const { error } = await stripe!.redirectToCheckout({
        sessionId: checkoutResult.data.sessionId,
      })

      if (error) {
        toast.error(error.message)
      }
    } catch (error) {
      console.error('Purchase error:', error)
      toast.error('Failed to initiate purchase')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-screen-lg py-8">
      <div className="rounded-lg bg-slate-900 p-6">
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-white">
              {t('dashboard.credits.currentCredits')}
            </h1>
            <p className="text-4xl font-bold text-blue-500">{credits}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {creditPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-800/50 p-4 transition-colors hover:border-blue-500"
            >
              <div>
                <h3 className="text-lg font-medium text-white">{pkg.name}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  {t('processImages', { count: pkg.credits })}
                </p>
                <p className="mt-4 text-2xl font-bold text-white">
                  ${pkg.price}
                </p>
              </div>
              <Button
                onClick={() => handlePurchase(pkg.id)}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600"
                disabled={loading}
              >
                {t('pricing.plans.toolCredits.button')}
              </Button>
            </div>
          ))}
        </div>

        {/* Transactions Table */}
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-white">
            {t('dashboard.credits.recentTransactions')}
          </h2>

          {transactions.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full">
                <thead className="bg-slate-800/70">
                  <tr>
                    <th className="p-3 text-left text-sm font-medium text-slate-300">
                      {t('dashboard.credits.date')}
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-slate-300">
                      {t('dashboard.credits.amount')}
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-slate-300">
                      {t('dashboard.credits.type')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {transactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-slate-800/50">
                      <td className="p-3 text-sm text-slate-300">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-sm text-slate-300">
                        {transaction.tokenAmount > 0 ? (
                          <span className="text-green-500">
                            +{transaction.tokenAmount}
                          </span>
                        ) : (
                          <span className="text-red-500">
                            {transaction.tokenAmount}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-sm text-slate-300">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            transaction.type === 'spend'
                              ? 'bg-green-500/20 text-green-400'
                              : transaction.type === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-8 text-center">
              <p className="text-slate-400">
                {t('dashboard.credits.noTransactions')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
