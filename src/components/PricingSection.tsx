'use client'

import { useState } from 'react'
import { Check, CreditCard, Zap, DollarSign, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { useTranslation } from 'next-i18next'

export default function PricingSection() {
  const { t } = useTranslation('')
  const [creditAmount, setCreditAmount] = useState(100)
  const [selectedTool, setSelectedTool] = useState('auto')

  // Calculate discount based on credit amount
  const getDiscount = (amount: number) => {
    if (amount >= 1000) return 0.4
    if (amount >= 500) return 0.25
    if (amount >= 100) return 0.1
    return 0
  }

  const discount = getDiscount(creditAmount)
  const basePrice = creditAmount * 0.5 // Assuming base price of $0.5 per credit
  const discountedPrice = basePrice * (1 - discount)
  const savings = basePrice - discountedPrice

  // Calculate how many images can be processed
  const costPerImage = selectedTool === 'auto' ? 5 : 3
  const regularImages = Math.floor(creditAmount / costPerImage)
  const discountedImages = Math.floor(
    (creditAmount * (1 / (1 - discount))) / costPerImage,
  )
  const extraImages = discountedImages - regularImages

  return (
    <>
      <div className="mx-auto grid items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
        {/* Free Credits Card */}
        <Card className="relative overflow-hidden border-none bg-gradient-to-b from-blue-600/10 to-transparent shadow-none">
          <CardHeader className="relative pt-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-white">
                {t('pricing.plans.freeDaily.title')}
              </CardTitle>
              <Zap className="h-5 w-5 text-white" />
            </div>
            <CardDescription className="text-slate-500">
              {t('pricing.plans.freeDaily.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-baseline text-blue-400">
              <span className="text-4xl font-bold">10</span>
              <span className="ml-1 text-xl font-medium">
                {t('pricing.plans.freeDaily.credits')}
              </span>
              <span className="ml-2 text-sm text-slate-500">
                {t('pricing.plans.freeDaily.perDay')}
              </span>
            </div>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center text-white">
                <Check className="mr-2 h-4 w-4 text-blue-400" />
                <span>{t('pricing.plans.freeDaily.features.freeCredits')}</span>
              </li>
              <li className="flex items-center text-white">
                <Check className="mr-2 h-4 w-4 text-blue-400" />
                <span>{t('pricing.plans.freeDaily.features.allTools')}</span>
              </li>
              <li className="flex items-center text-white">
                <Check className="mr-2 h-4 w-4 text-blue-400" />
                <span>{t('pricing.plans.freeDaily.features.noCard')}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="relative pb-6">
            <Button variant="outline-blue" className="w-full">
              {t('pricing.plans.freeDaily.button')}
            </Button>
          </CardFooter>
        </Card>

        {/* Tool Pricing Card */}
        <Card className="relative overflow-hidden border-none bg-gradient-to-b from-blue-600/50 to-transparent shadow-none lg:scale-105">
          <CardHeader className="relative pt-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-white">
                {t('pricing.plans.toolCredits.title')}
              </CardTitle>
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <CardDescription className="text-slate-500">
              {t('pricing.plans.toolCredits.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <Tabs
              defaultValue="auto"
              className="w-full"
              onValueChange={(value) => setSelectedTool(value)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="auto">Auto</TabsTrigger>
                <TabsTrigger value="manual">Manual</TabsTrigger>
              </TabsList>
              <TabsContent value="auto" className="mt-4">
                <div className="flex items-baseline text-blue-400">
                  <span className="text-4xl font-bold">5</span>
                  <span className="ml-1 text-xl font-medium">
                    {t('pricing.plans.toolCredits.auto.credits')}
                  </span>
                  <span className="ml-2 text-sm text-slate-500">
                    {t('pricing.plans.toolCredits.auto.perRemoval')}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {t('pricing.plans.toolCredits.auto.description')}
                </p>
              </TabsContent>
              <TabsContent value="manual" className="mt-4">
                <div className="flex items-baseline text-blue-400">
                  <span className="text-4xl font-bold">3</span>
                  <span className="ml-1 text-xl font-medium">
                    {t('pricing.plans.toolCredits.manual.credits')}
                  </span>
                  <span className="ml-2 text-sm text-slate-500">
                    {t('pricing.plans.toolCredits.manual.perRemoval')}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {t('pricing.plans.toolCredits.manual.description')}
                </p>
              </TabsContent>
            </Tabs>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center text-white">
                <Check className="mr-2 h-4 w-4 text-blue-400" />
                <span>{t('pricing.plans.toolCredits.features.quality')}</span>
              </li>
              <li className="flex items-center text-white">
                <Check className="mr-2 h-4 w-4 text-blue-400" />
                <span>{t('pricing.plans.toolCredits.features.unlimited')}</span>
              </li>
              <li className="flex items-center text-white">
                <Check className="mr-2 h-4 w-4 text-blue-400" />
                <span>{t('pricing.plans.toolCredits.features.original')}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="relative pb-6">
            <Button className="w-full" variant="white">
              {t('pricing.plans.toolCredits.button')}
            </Button>
          </CardFooter>
        </Card>

        {/* Bulk Discount Card - Redesigned */}
        <Card className="relative overflow-hidden border-none bg-gradient-to-b from-slate-800 to-slate-900 shadow-none">
          <CardHeader className="relative pt-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-white">
                {t('pricing.plans.bulkSavings.title')}
              </CardTitle>
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <CardDescription className="text-slate-400">
              {t('pricing.plans.bulkSavings.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-6">
            {/* Credit Amount Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">
                  {t('pricing.plans.bulkSavings.creditAmount.label')}
                </span>
                <span className="text-sm font-bold text-white">
                  {creditAmount} {t('pricing.plans.freeDaily.credits')}
                </span>
              </div>
              <div className="space-y-2">
                <Slider
                  value={[creditAmount]}
                  min={50}
                  max={1500}
                  step={50}
                  onValueChange={(value) => setCreditAmount(value[0])}
                  className="my-2"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <div className="flex flex-col items-center">
                    <span>50</span>
                    <span className="text-[10px]">
                      {t('pricing.plans.bulkSavings.creditAmount.min')}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>500</span>
                    <span className="text-[10px]">
                      {t('pricing.plans.bulkSavings.creditAmount.recommended')}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>1,500</span>
                    <span className="text-[10px]">
                      {t('pricing.plans.bulkSavings.creditAmount.max')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Period Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                {t('pricing.plans.bulkSavings.timePeriod.label')}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[30, 90, 180, 365].map((days) => (
                  <Button
                    key={days}
                    variant={days === 30 ? 'blue' : 'default'}
                    className={`h-auto px-2 py-2 text-xs`}
                  >
                    {days}d
                  </Button>
                ))}
              </div>
            </div>

            {/* Savings Summary */}
            <div className="space-y-4 rounded-lg bg-slate-900/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  {t('pricing.plans.bulkSavings.savings.currentDiscount')}
                </span>
                <span className="text-lg font-bold text-white">
                  {(discount * 100).toFixed(0)}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-slate-400">
                    {t('pricing.plans.bulkSavings.savings.regularPrice')}
                  </span>
                  <div className="text-sm font-medium text-slate-300">
                    ${basePrice.toFixed(2)}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400">
                    {t('pricing.plans.bulkSavings.savings.youPay')}
                  </span>
                  <div className="text-sm font-medium text-white">
                    ${discountedPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">
                    {t('pricing.plans.bulkSavings.savings.totalSavings')}
                  </span>
                  <span className="text-lg font-bold text-green-400">
                    ${savings.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Images Processing Comparison */}
            <div className="rounded-lg bg-slate-900/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-slate-300">
                  {t('pricing.plans.bulkSavings.processing.title')}
                </span>
                <Badge variant="secondary">
                  {selectedTool === 'auto'
                    ? t('pricing.plans.bulkSavings.processing.autoRemove')
                    : t('pricing.plans.bulkSavings.processing.manualRemove')}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-xs text-slate-400">
                    {t('pricing.plans.bulkSavings.processing.withoutDiscount')}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-300">
                      {regularImages}
                    </span>
                    <span className="text-xs text-slate-400">
                      {t('pricing.plans.bulkSavings.processing.images')}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400">
                    {t('pricing.plans.bulkSavings.processing.withDiscount')}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white">
                      {discountedImages}
                    </span>
                    <span className="text-xs text-slate-400">
                      {t('pricing.plans.bulkSavings.processing.images')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center text-xs font-medium">
                <span className="text-green-400">
                  {t('pricing.plans.bulkSavings.processing.processMore', {
                    count: extraImages,
                  })}
                </span>
                <ArrowRight className="ml-1 h-3 w-3 text-green-400" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="relative pb-6">
            <Button className="w-full" variant="blue">
              {t('pricing.plans.bulkSavings.button')}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-slate-500">{t('pricing.plans.contact.text')}</p>
        <div className="mt-6">
          <Button variant="outline-blue">
            {t('pricing.plans.contact.button')}
          </Button>
        </div>
      </div>
    </>
  )
}
