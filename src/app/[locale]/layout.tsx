import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import Script from 'next/script'
import clsx from 'clsx'
import { NextIntlClientProvider } from 'next-intl'
import ClientLayout from '@/components/ClientLayout'

import '@/styles/tailwind.css'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()
  return (
    <html
      lang={locale}
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
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <ClientLayout />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
