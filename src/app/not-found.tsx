import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { Link } from '@/i18n/navigation'

import '@/styles/tailwind.css'

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

export default function NotFound() {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="flex h-full flex-col">
        <SlimLayout>
          <div className="flex">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
          </div>
          <p className="mt-20 text-sm font-medium text-gray-700">404</p>
          <h1 className="mt-3 text-lg font-semibold text-gray-900">
            Page not found
          </h1>
          <p className="mt-3 text-sm text-gray-700">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Button href="/" className="mt-10">
            Go back home
          </Button>
        </SlimLayout>
      </body>
    </html>
  )
}
