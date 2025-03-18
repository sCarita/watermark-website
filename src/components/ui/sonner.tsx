'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          error: '!bg-red-600',
          success: '!bg-green-600',
          warning: '!bg-yellow-600',
          info: '!bg-blue-600',
        },
      }}
      // style={
      //   {
      //     '--normal-bg': 'var(--popover)',
      //     '--normal-text': 'var(--popover-foreground)',
      //     '--normal-border': 'var(--border)',
      //   } as React.CSSProperties
      // }
      {...props}
    />
  )
}

export { Toaster }
