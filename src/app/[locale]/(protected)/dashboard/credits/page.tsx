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
import { createCreditsPurchaseCheckout } from '@/lib/firebase/client'
import { useSearchParams } from 'next/navigation'
import { Transaction } from '@/types/firebase'
import { Coins, CoinsIcon, InfoIcon, Loader2, Package } from 'lucide-react'
import { TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipContent } from '@/components/ui/tooltip'
import { Tooltip } from '@/components/ui/tooltip'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useStripe } from '@/contexts/StripeContext'

export default function CreditsPage() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  const t = useTranslations()
  const { user, credits } = useAuth()
  const { creditPackages, loading: loadingPackages } = useStripe()

  const [loadingPurchase, setLoadingPurchase] = useState(false)

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loadingTransactions, setLoadingTransactions] = useState(false)

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
      setLoadingTransactions(true)
      const userRef = await doc(db, 'users', user.uid)
      setLoadingTransactions(false)

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

    setLoadingPurchase(true)
    try {
      const checkoutResult = await createCreditsPurchaseCheckout({
        priceId,
        successUrl: `${window.location.origin}/dashboard/credits/success`,
        cancelUrl: `${window.location.origin}/dashboard/credits/canceled?canceled=true`,
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
      setLoadingPurchase(false)
    }
  }

  return (
    <div className="overflow-y-auto">
      <div className="container mx-auto max-w-screen-lg py-8">
        <div className="rounded-lg bg-slate-900 p-6">
          <div className="mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <CoinsIcon className="h-6 w-6 text-slate-400" />
                <h1 className="text-3xl font-semibold text-white">
                  {t('dashboard.credits.currentCredits')}
                </h1>
              </div>
              <p className="text-4xl font-bold text-blue-500">{credits}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {loadingPackages ? (
              <div className="col-span-3 flex items-center justify-center p-8">
                <Loader2 className="h-10 w-10 animate-spin" />
              </div>
            ) : creditPackages.length > 0 ? (
              creditPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-800/50 p-4 transition-colors hover:border-blue-500"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-slate-400" />
                      <h3 className="text-lg font-medium text-white">
                        {pkg.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                      {t('buyCreditsAmmount', { count: pkg.credits })}
                    </p>
                    <p className="mt-4 text-2xl font-bold text-white">
                      {pkg.currency === 'eur' ? '€' : '$'} {pkg.price}
                    </p>
                  </div>
                  <Button
                    onClick={() => handlePurchase(pkg.priceId)}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600"
                    disabled={loadingPurchase}
                  >
                    <Coins className="h-4 w-4" />
                    {t('pricing.plans.toolCredits.button')}
                  </Button>
                </div>
              ))
            ) : (
              <div className="col-span-3 p-8 text-center">
                <p className="text-slate-400">
                  {t('dashboard.credits.noPackagesAvailable')}
                </p>
              </div>
            )}
          </div>

          {/* Transactions Table */}
          <div className="mt-12">
            <h2 className="mb-4 flex items-center text-xl font-semibold text-white">
              {t('dashboard.credits.recentTransactions')}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="ml-2 h-3.5 w-3.5 text-slate-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-center">
                      {t('dashboard.credits.recentTransactionsDescription')}
                      <br />
                      help@clear.photo
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
                      <th className="p-3 text-left text-sm font-medium text-slate-300">
                        {t('dashboard.credits.status')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {transactions.map((transaction, index) => (
                      <tr key={index} className="hover:bg-slate-800/50">
                        <td className="p-3 text-sm text-slate-300">
                          {new Date(transaction.createdAt).toLocaleString()}
                        </td>
                        <td className="p-3 text-sm text-slate-300">
                          {transaction.type === 'refund' ? (
                            <span className="text-red-500">
                              -{transaction.refundedAmount || 0}
                            </span>
                          ) : transaction.type === 'spend' ||
                            transaction.type === 'penalty' ? (
                            <span className="text-red-500">
                              -
                              {(transaction.freeAmount || 0) +
                                (transaction.paidAmount || 0)}
                            </span>
                          ) : (
                            <span className="text-green-500">
                              +
                              {(transaction.freeAmount || 0) +
                                (transaction.paidAmount || 0)}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-sm text-slate-300">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              transaction.type === 'spend' ||
                              transaction.type === 'penalty'
                                ? 'bg-red-500/20 text-red-400'
                                : transaction.type === 'refund'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : transaction.type === 'buy'
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-blue-500/20 text-blue-400'
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-slate-300">
                          {transaction.status === 'completed' ? (
                            <span className="text-green-500">
                              {t('dashboard.credits.completed')}
                            </span>
                          ) : transaction.status === 'pending' ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <span className="text-yellow-500">
                                    {t('dashboard.credits.pending')}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {t('dashboard.credits.pendingDescription')}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : transaction.status === 'failed' ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <span className="text-red-500">
                                    {t('dashboard.credits.failed')}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {t('dashboard.credits.failedDescription')}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {loadingTransactions && (
                      <tr>
                        <td colSpan={4} className="p-3 text-center">
                          <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                        </td>
                      </tr>
                    )}
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
    </div>
  )
}
