import clsx from 'clsx'

export function Container({
  as,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  as?: React.ElementType
}) {
  let Component = as ?? 'div'

  return (
    <Component
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
