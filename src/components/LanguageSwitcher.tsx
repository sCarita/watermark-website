'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useI18n } from '@/hooks/useI18n'

const locales = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
]

export function LanguageSwitcher() {
  const { locale, changeLanguage } = useI18n()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = useCallback(
    (newLocale: string) => {
      // First change the language in i18next
      changeLanguage(newLocale)

      // Set a cookie for the middleware
      document.cookie = `i18nextLng=${newLocale}; path=/; max-age=31536000`

      // Check if the current pathname is a locale root
      const isLocaleRoot = /^\/[a-z]{2}$/.test(pathname || '')

      // If we're at a locale root (like /fr or /es), just switch to the new locale root
      if (isLocaleRoot) {
        if (newLocale === 'en') {
          router.push('/')
        } else {
          router.push(`/${newLocale}`)
        }
        return
      }

      // For other paths, handle as before
      const currentLocale = locale || 'en'

      // If we're on the homepage
      if (pathname === '/') {
        if (newLocale === 'en') {
          router.push('/')
        } else {
          router.push(`/${newLocale}`)
        }
        return
      }

      // For other pages, replace the locale segment
      if (pathname?.startsWith(`/${currentLocale}/`)) {
        const newPath = pathname.replace(`/${currentLocale}/`, `/${newLocale}/`)
        router.push(newPath)
      } else if (pathname?.startsWith('/')) {
        // If there's no locale in the path
        if (newLocale === 'en') {
          router.push(pathname)
        } else {
          router.push(`/${newLocale}${pathname}`)
        }
      }
    },
    [locale, pathname, router, changeLanguage],
  )

  return (
    <div className="flex items-center space-x-2">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => handleLocaleChange(l.code)}
          className={`rounded px-2 py-1 text-sm ${
            locale === l.code ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'
          }`}
        >
          {l.name}
        </button>
      ))}
    </div>
  )
}
