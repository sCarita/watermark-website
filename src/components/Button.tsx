import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'group inline-flex border-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-hidden',
}

const variantStyles = {
  solid: {
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900',
    blue: 'bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
    white:
      'bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white',
  },
  outline: {
    slate:
      'border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:border-slate-300',
    blue: 'border-blue-200 text-blue-700 hover:text-blue-900 hover:border-blue-300 active:bg-blue-100 active:text-blue-600 focus-visible:outline-blue-600 focus-visible:border-blue-300',
    white:
      'border-slate-700 text-white hover:border-slate-500 active:border-slate-700 active:text-slate-400 focus-visible:outline-white',
  },
}

type ButtonProps = {
  variant?: 'solid' | 'outline'
  color?: keyof typeof variantStyles.solid & keyof typeof variantStyles.outline
} & (
  | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'color'>
  | (Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
      href?: undefined
    })
)

export function Button({ className, ...props }: ButtonProps) {
  props.variant ??= 'solid'
  props.color ??= 'slate'

  className = clsx(
    'cursor-pointer',
    baseStyles[props.variant],
    props.variant === 'outline'
      ? variantStyles.outline[props.color]
      : props.variant === 'solid'
        ? variantStyles.solid[props.color]
        : undefined,
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
