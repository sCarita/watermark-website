'use client'

import { useState, useEffect } from 'react'
import { Check, ImageIcon, Layers, MousePointer, Type, Zap } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Define package types
type Package = {
  id: string
  credits: number
  price: number
  discount: number
  isBestValue?: boolean
}

export default function PricingSection() {
  // Define available packages
  const packages: Package[] = [
    { id: 'p1', credits: 100, price: 14.99, discount: 0 },
    { id: 'p2', credits: 500, price: 69.99, discount: 5 },
    { id: 'p3', credits: 1000, price: 134.99, discount: 10 },
    { id: 'p4', credits: 2500, price: 318.75, discount: 15 },
    { id: 'p5', credits: 5000, price: 599.99, discount: 20 },
    {
      id: 'p6',
      credits: 10000,
      price: 999.99,
      discount: 25,
      isBestValue: true,
    },
  ]

  // State for selected package and credit amount
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(
    packages[0],
  )
  const [creditAmount, setCreditAmount] = useState<number>(500)
  const [regularPrice, setRegularPrice] = useState<number>(0)
  const [discountedPrice, setDiscountedPrice] = useState<number>(0)
  const [savings, setSavings] = useState<number>(0)

  // Calculate prices based on credit amount
  useEffect(() => {
    // Find the appropriate discount tier based on credit amount
    let discount = 0
    if (creditAmount >= 10000) discount = 25
    else if (creditAmount >= 5000) discount = 20
    else if (creditAmount >= 2500) discount = 15
    else if (creditAmount >= 1000) discount = 10
    else if (creditAmount >= 500) discount = 5

    // Calculate prices
    const basePrice = creditAmount * 0.149 // Base price per credit
    const discountedPrice = basePrice * (1 - discount / 100)

    setRegularPrice(basePrice)
    setDiscountedPrice(discountedPrice)
    setSavings(basePrice - discountedPrice)
  }, [creditAmount])

  // Handle package selection
  const handleSelectPackage = (pkg: Package) => {
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
          <h2 className="mb-1 text-2xl font-bold">Free Plan</h2>
          <p className="text-sm text-slate-400">Perfect for occasional use</p>
        </div>

        <div className="flex-grow p-6">
          <div className="mb-6 flex items-baseline">
            <span className="text-4xl font-bold">$0</span>
            <span className="ml-2 text-slate-400">forever</span>
          </div>

          <div className="mb-6 rounded-lg border border-sky-500/20 bg-sky-500/10 p-4">
            <div className="flex items-center">
              <Zap className="mr-3 h-5 w-5 text-sky-400" />
              <div>
                <div className="font-medium">5 free credits daily</div>
                <div className="text-sm text-slate-400">
                  Credits don't stack - use them or lose them
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
                Basic watermark removal
              </span>
            </li>
            <li className="flex items-start">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                <Check className="h-3 w-3 text-blue-400" />
              </div>
              <span className="ml-3 text-slate-300">
                Standard quality results
              </span>
            </li>
            <li className="flex items-start">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                <Check className="h-3 w-3 text-blue-400" />
              </div>
              <span className="ml-3 text-slate-300">
                No credit card required
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-auto border-t border-slate-700 p-6">
          <Button className="w-full bg-slate-700 hover:bg-slate-600">
            Get Started Free
          </Button>
        </div>
      </div>

      {/* Paid plan */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        {/* Credit Packages */}
        <div className="mb-6">
          <h2 className="mb-3 font-bold">Credit Packages</h2>
          <div className="grid grid-cols-3 gap-2">
            {packages.slice(0, 6).map((pkg) => (
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
                {pkg.discount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-blue-500 px-1 py-0 text-[10px]">
                    {pkg.discount}%
                  </Badge>
                )}
                <div className="text-sm font-bold text-blue-400">
                  {pkg.credits}
                </div>
                <div className="font-bold">${pkg.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator */}
        <div className="mb-4">
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-slate-400">Credit Amount</span>
            <span className="font-bold text-blue-400">
              {creditAmount.toLocaleString()} credits
            </span>
          </div>
          <Slider
            value={[creditAmount]}
            max={10000}
            min={100}
            step={100}
            className="mb-2"
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>100</span>
            <span>10,000</span>
          </div>
        </div>

        <div className="mb-4 rounded-lg border border-slate-700 bg-slate-800 p-2">
          <div className="mb-2 grid grid-cols-2 gap-4">
            <div>
              <div className="mb-1 text-xs text-slate-400">Regular Price</div>
              <div className="text-lg font-bold text-slate-500 line-through">
                ${regularPrice.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-slate-400">You Pay</div>
              <div className="text-lg font-bold text-white">
                ${discountedPrice.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 px-2">
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-300">Total Savings</div>
              <div className="text-lg font-bold text-green-400">
                ${savings.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* What you can do with credits */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center">
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
              <Check className="h-3 w-3 text-blue-400" />
            </div>
            <span className="ml-2 text-xs text-slate-300">
              Auto watermark removal (5 credits/image)
            </span>
          </div>
          <div className="flex items-center">
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
              <Check className="h-3 w-3 text-blue-400" />
            </div>
            <span className="ml-2 text-xs text-slate-300">
              High-quality results
            </span>
          </div>
          <div className="flex items-center">
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
              <Check className="h-3 w-3 text-blue-400" />
            </div>
            <span className="ml-2 text-xs text-slate-300">
              Credits never expire
            </span>
          </div>
        </div>

        {/* Added Feature Costs */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-2">
              <div className="flex items-center">
                <MousePointer className="mr-1.5 h-3 w-3 text-blue-400" />
                <span>Auto</span>
              </div>
              <span className="font-bold text-blue-400">5 credits</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-2">
              <div className="flex items-center">
                <Layers className="mr-1.5 h-3 w-3 text-blue-400" />
                <span>Manual</span>
              </div>
              <span className="font-bold text-blue-400">3 credits</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-2">
              <div className="flex items-center">
                <Type className="mr-1.5 h-3 w-3 text-blue-400" />
                <span>Text</span>
              </div>
              <span className="font-bold text-blue-400">2 credits</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-2">
              <div className="flex items-center">
                <ImageIcon className="mr-1.5 h-3 w-3 text-blue-400" />
                <span>Background</span>
              </div>
              <span className="font-bold text-blue-400">8 credits</span>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600"
          disabled={!selectedPackage && creditAmount < 100}
        >
          {selectedPackage
            ? `Buy ${selectedPackage.credits.toLocaleString()} Credits`
            : 'Get Started'}
        </Button>
      </div>
    </div>
  )
}
