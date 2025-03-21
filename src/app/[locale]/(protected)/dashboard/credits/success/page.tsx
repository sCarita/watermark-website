'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function PaymentSuccessPage() {
  const t = useTranslations()
  const router = useRouter()
  const { credits } = useAuth()

  // Redirect to credits page if accessed directly without success parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.get('session_id')) {
      router.push('/dashboard/credits')
    }
  }, [router])

  return (
    <div className="container mx-auto max-w-screen-lg py-8">
      <div className="flex flex-col items-center justify-center rounded-lg bg-slate-900 p-8 text-center">
        <div className="mb-6 rounded-full bg-green-500/20 p-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="mb-2 text-3xl font-bold text-white">
          {t('dashboard.credits.paymentSuccess.title')}
        </h1>

        <p className="mb-6 text-xl text-slate-300">
          {t('dashboard.credits.paymentSuccess.description')}
        </p>

        <div className="mb-8">
          <p className="text-sm text-slate-400">
            {t('dashboard.credits.paymentSuccess.currentBalance')}
          </p>
          <p className="text-4xl font-bold text-blue-500">{credits}</p>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => router.push('/dashboard/credits')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {t('dashboard.credits.paymentSuccess.backToCredits')}
          </Button>

          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800"
          >
            {t('dashboard.credits.paymentSuccess.goToDashboard')}
          </Button>
        </div>
      </div>
    </div>
  )
}
