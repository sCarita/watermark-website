import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center select-none justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-slate-900 text-white [a&]:hover:bg-slate-700 [a&]:hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900',
        secondary:
          'border-transparent bg-slate-100 text-slate-700 [a&]:hover:text-slate-900 [a&]:hover:bg-slate-200 active:bg-slate-300 active:text-slate-600 focus-visible:outline-slate-900',
        destructive:
          'border-transparent bg-red-600 text-white [a&]:hover:bg-red-500 active:bg-red-700 active:text-red-100 focus-visible:outline-red-600',
        outline:
          'border-slate-200 text-slate-700 [a&]:hover:text-slate-900 [a&]:hover:border-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-slate-900 focus-visible:border-slate-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
