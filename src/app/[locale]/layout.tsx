import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import Script from 'next/script'
import clsx from 'clsx'
import { NextIntlClientProvider } from 'next-intl'
import ClientLayout from '@/components/ClientLayout'
import { getPathname } from '@/i18n/navigation'
import { AuthProvider } from '@/contexts/AuthContext'
import { ImageEditorProvider } from '@/contexts/ImageEditorContext'

import '@/styles/tailwind.css'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server'
import { ReactNode } from 'react'
import { StripeProvider } from '@/contexts/StripeContext'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params

  const t = await getTranslations({ locale, namespace: 'metadata' })
  const pathname = getPathname({ locale, href: '/' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
      type: 'website',
      url: `https://www.clear.photo${pathname}`,
    },
    alternates: {
      canonical: `https://www.clear.photo${pathname}`,
      languages: Object.fromEntries(
        routing.locales.map((cur) => [
          cur,
          `https://www.clear.photo${getPathname({ locale: cur, href: '/' })}`,
        ]),
      ),
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

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
          <AuthProvider>
            <ImageEditorProvider>
              <StripeProvider>
                {children}
                <ClientLayout />
              </StripeProvider>
            </ImageEditorProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
