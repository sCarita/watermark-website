import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import Script from 'next/script'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import { I18nProvider } from '@/components/I18nProvider'

export const metadata: Metadata = {
  title: {
    template: '%s - clear.photo',
    default: 'clear.photo - Remove watermarks from your images',
  },
  description:
    'Free online watermark remover tool. Easily remove watermarks, logos, and text from photos and images. Our AI-powered technology helps you get rid of watermarks from Getty Images, Shutterstock, and more. Clean up your pictures with the best free watermark remover available online.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang?: string }
}) {
  // Default language is English
  const lang = params.lang || 'en'

  return (
    <html
      lang={lang}
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <head>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="eFBq4OMe7+A2uHQYWmMKGg"
          async
        />
      </head>
      <body className="flex h-full flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
