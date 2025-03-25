'use client'

import { useState, useEffect } from 'react'
import {
  Check,
  ImageIcon,
  Layers,
  Loader2,
  MousePointer,
  Type,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useStripe } from '@/contexts/StripeContext'
import { CreditPackage } from '@/types/api'
import { Badge } from './ui/badge'

export default function PricingSection() {
  const t = useTranslations()
  const { creditPackages, loading: loadingPackages } = useStripe()

  // State for selected package and credit amount
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(
    creditPackages[0],
  )
  const [creditAmount, setCreditAmount] = useState<number>(100)
  const [regularPrice, setRegularPrice] = useState<number>(0)
  const [discountedPrice, setDiscountedPrice] = useState<number>(0)
  const [savings, setSavings] = useState<number>(0)
  const [discounts, setDiscounts] = useState<number[]>([])

  // Calculate prices based on credit amount
  useEffect(() => {
    // Find the appropriate package based on credit amount
    let selectedPkg = null
    for (const pkg of creditPackages) {
      if (creditAmount >= pkg.credits) {
        selectedPkg = pkg
      }
    }

    if (selectedPkg && creditPackages.length > 1) {
      // Use package[1] as the base price per credit reference
      const baseRatePerCredit =
        creditPackages[0].price / creditPackages[0].credits

      // Calculate regular price (what it would cost at the base rate)
      const regular = baseRatePerCredit * selectedPkg.credits

      // The discounted price is the package's actual price
      const discounted = selectedPkg.price

      // Calculate savings
      const savingsAmount = regular - discounted

      setRegularPrice(regular)
      setDiscountedPrice(discounted)
      setSavings(savingsAmount)
    } else {
      setRegularPrice(0)
      setDiscountedPrice(0)
      setSavings(0)
    }
  }, [creditAmount])

  useEffect(() => {
    if (creditPackages.length > 0) {
      setSelectedPackage(creditPackages[0])

      let discounts = []
      for (const pkg of creditPackages) {
        // Calculate base price using the rate from the smallest package
        const baseRatePerCredit =
          creditPackages[0].price / creditPackages[0].credits
        const regularPrice = baseRatePerCredit * pkg.credits

        // Calculate discount percentage
        const discountPercentage = Math.round(
          ((regularPrice - pkg.price) / regularPrice) * 100,
        )
        discounts.push(discountPercentage)
      }
      setDiscounts(discounts)
    }
  }, [creditPackages])

  // Handle package selection
  const handleSelectPackage = (pkg: CreditPackage) => {
    setSelectedPackage(pkg)
    setCreditAmount(pkg.credits)
  }

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setCreditAmount(value[0])
    setSelectedPackage(null) // Deselect package when slider is manually changed
  }

  return (
    <div className="grid items-center gap-6 text-white md:grid-cols-2">
      {/* Free plan */}
      <div className="flex h-fit flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50">
        <div className="border-b border-slate-700 bg-gradient-to-r from-blue-500/10 to-blue-500/10 p-6">
          <h3 className="mb-1 text-2xl font-bold">
            {t('pricing.plans.freeDaily.title')}
          </h3>
          <p className="text-sm text-slate-400">
            {t('pricing.plans.freeDaily.description')}
          </p>
        </div>

        <div className="flex-grow p-6">
          <div className="mb-6 flex items-baseline">
            <span className="text-4xl font-bold">
              {creditPackages[0]?.currency === 'eur' ? '€' : '$'} 0
            </span>
            <span className="ml-2 text-slate-400">
              {t('pricing.plans.freeDaily.perDay')}
            </span>
          </div>

          <div className="mb-6 rounded-lg border border-sky-500/20 bg-sky-500/10 p-4">
            <div className="flex items-center">
              <Zap className="mr-3 h-5 w-5 text-sky-400" />
              <div>
                <div className="font-medium">
                  {t('pricing.plans.freeDaily.features.freeCredits')}
                </div>
                <div className="text-sm text-slate-400">
                  {t('pricing.plans.freeDaily.features.noCard')}
                </div>
              </div>
            </div>
          </div>

          <ul className="mb-8 space-y-3">
            <li className="flex items-start">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                <Check className="h-3 w-3 text-blue-400" />
              </div>
              <span className="ml-3 text-slate-300">
                {t('pricing.benefits.standardQuality')}
              </span>
            </li>
            <li className="flex items-start">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                <Check className="h-3 w-3 text-blue-400" />
              </div>
              <span className="ml-3 text-slate-300">
                {t('pricing.benefits.noCard')}
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-auto border-t border-slate-700 p-6">
          <Button className="w-full bg-slate-700 hover:bg-slate-600" asChild>
            <Link href="/register">{t('pricing.plans.freeDaily.button')}</Link>
          </Button>
        </div>
      </div>

      {/* Paid plan */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        {/* Credit Packages */}
        <div className="mb-6">
          <h3 className="mb-3 font-bold">
            {t('pricing.plans.toolCredits.title')}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {creditPackages.slice(0, 6).map((pkg, index) => (
              <div
                key={pkg.id}
                className={cn(
                  'relative cursor-pointer rounded-lg border bg-slate-800 p-1 text-center',
                  selectedPackage?.id === pkg.id
                    ? 'border-blue-500'
                    : 'border-slate-700',
                )}
                onClick={() => handleSelectPackage(pkg)}
              >
                {discounts[index] > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-blue-500 px-1 py-0 text-[10px]">
                    {discounts[index]}%
                  </Badge>
                )}
                <div className="text-sm font-bold text-blue-400">
                  {pkg.credits}
                </div>
                <div className="font-bold">
                  {pkg.currency === 'eur' ? '€' : '$'} {pkg.price}
                </div>
              </div>
            ))}
          </div>
          {loadingPackages && (
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
            </div>
          )}
        </div>

        {/* Calculator */}
        {/* <div className="mb-4">
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-slate-400">
              {t('pricing.calculator.creditAmount')}
            </span>
            <span className="font-bold text-blue-400">
              {creditAmount.toLocaleString()} {t('pricing.calculator.credits')}
            </span>
          </div>
          <Slider
            value={[creditAmount]}
            max={1000}
            min={100}
            step={100}
            className="mb-2"
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>100</span>
            <span>1000</span>
          </div>
        </div> */}

        {/* Pricing display */}
        <div className="mb-4 rounded-lg border border-slate-700 bg-slate-800 p-2">
          <div className="mb-2 grid grid-cols-2 gap-4">
            <div>
              <div className="mb-1 text-xs text-slate-400">
                {t('pricing.calculator.regularPrice')}
              </div>
              <div className="text-lg font-bold text-slate-500 line-through">
                {creditPackages[0]?.currency === 'eur' ? '€' : '$'}{' '}
                {regularPrice.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-slate-400">
                {t('pricing.calculator.youPay')}
              </div>
              <div className="text-lg font-bold text-white">
                {creditPackages[0]?.currency === 'eur' ? '€' : '$'}{' '}
                {discountedPrice.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 px-2">
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-300">
                {t('pricing.calculator.totalSavings')}
              </div>
              <div className="text-lg font-bold text-green-400">
                {creditPackages[0]?.currency === 'eur' ? '€' : '$'}{' '}
                {savings.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Feature costs */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-2">
              <div className="flex items-center">
                <MousePointer className="mr-1.5 h-3 w-3 text-blue-400" />
                <span>{t('pricing.features.auto.title')}</span>
              </div>
              <span className="font-bold text-blue-400">
                {t('pricing.features.auto.credits')}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-2">
              <div className="flex items-center">
                <Layers className="mr-1.5 h-3 w-3 text-blue-400" />
                <span>{t('pricing.features.manual.title')}</span>
              </div>
              <span className="font-bold text-blue-400">
                {t('pricing.features.manual.credits')}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-2">
              <div className="flex items-center">
                <Type className="mr-1.5 h-3 w-3 text-blue-400" />
                <span>{t('pricing.features.text.title')}</span>
              </div>
              <span className="font-bold text-blue-400">
                {t('pricing.features.text.credits')}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-2">
              <div className="flex items-center">
                <ImageIcon className="mr-1.5 h-3 w-3 text-blue-400" />
                <span>{t('pricing.features.background.title')}</span>
              </div>
              <span className="font-bold text-blue-400">
                {t('pricing.features.background.credits')}
              </span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center">
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
              <Check className="h-3 w-3 text-blue-400" />
            </div>
            <span className="ml-2 text-xs text-slate-300">
              {t('pricing.benefits.quality')}
            </span>
          </div>
          <div className="flex items-center">
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
              <Check className="h-3 w-3 text-blue-400" />
            </div>
            <span className="ml-2 text-xs text-slate-300">
              {t('pricing.benefits.neverExpire')}
            </span>
          </div>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600"
          disabled={!selectedPackage && creditAmount < 100}
        >
          <Link href="/dashboard/credits">
            {selectedPackage
              ? t('pricing.plans.toolCredits.button', {
                  credits: selectedPackage.credits.toLocaleString(),
                })
              : t('common.getStarted')}
          </Link>
        </Button>
      </div>
    </div>
  )
}
