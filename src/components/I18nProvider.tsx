'use client'

import { ReactNode, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/utils/client-i18n'
import { usePathname } from 'next/navigation'
import { cookieName } from '@/app/i18/settings'

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    // First check if the pathname contains a locale
    const pathnameLocale = pathname?.split('/')[1]
    if (pathnameLocale && ['en', 'es', 'fr'].includes(pathnameLocale)) {
      i18n.changeLanguage(pathnameLocale)
      return
    }

    // If not, check localStorage
    const savedLanguage = localStorage.getItem(cookieName)
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }

    // Listen for language changes and save to localStorage
    const handleLanguageChanged = (lng: string) => {
      localStorage.setItem(cookieName, lng)
    }

    i18n.on('languageChanged', handleLanguageChanged)

    return () => {
      i18n.off('languageChanged', handleLanguageChanged)
    }
  }, [pathname])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
