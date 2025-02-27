import Link from 'next/link'
import clsx from 'clsx'

type ButtonProps = {
  variant?: 'primary' | 'neutral' | 'success' | 'error'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  className = clsx(
    className,
    'inline-flex items-center justify-center rounded-lg px-4 py-2.5 transition',
    variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
    variant === 'neutral' && 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    variant === 'success' && 'bg-green-600 text-white hover:bg-green-700',
    variant === 'error' && 'bg-red-600 text-white hover:bg-red-700',
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {children}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {children}
    </Link>
  )
}
