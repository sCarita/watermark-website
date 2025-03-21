'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PaymentCanceledPage() {
  const t = useTranslations()
  const router = useRouter()

  // Redirect to credits page if accessed directly without canceled parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.get('canceled')) {
      router.push('/dashboard/credits')
    }
  }, [router])

  return (
    <div className="container mx-auto max-w-screen-lg py-8">
      <div className="flex flex-col items-center justify-center rounded-lg bg-slate-900 p-8 text-center">
        <div className="mb-6 rounded-full bg-red-500/20 p-4">
          <XCircle className="h-16 w-16 text-red-500" />
        </div>

        <h1 className="mb-2 text-3xl font-bold text-white">
          {t('dashboard.credits.paymentCanceled.title')}
        </h1>

        <p className="mb-8 text-xl text-slate-300">
          {t('dashboard.credits.paymentCanceled.description')}
        </p>

        <div className="flex gap-4">
          <Button
            onClick={() => router.push('/dashboard/credits')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {t('dashboard.credits.paymentCanceled.tryAgain')}
          </Button>

          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800"
          >
            {t('dashboard.credits.paymentCanceled.goToDashboard')}
          </Button>
        </div>
      </div>
    </div>
  )
}
