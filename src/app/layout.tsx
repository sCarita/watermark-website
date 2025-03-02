import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import { I18nProvider } from '@/components/I18nProvider'

export const metadata: Metadata = {
  title: {
    template: '%s - clear.photo',
    default: 'clear.photo - Remove watermarks from your images',
  },
  description:
    "Remove watermarks from your images with our AI-powered tool.",
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
      <body className="flex h-full flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
