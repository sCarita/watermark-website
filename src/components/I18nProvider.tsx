'use client'

import { ReactNode, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/utils/client-i18n'

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    // Check if there's a language preference in localStorage
    const savedLanguage = localStorage.getItem('i18nextLng')
    
    // If there's a saved language and it's different from the current one, change it
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }
    
    // Listen for language changes and save to localStorage
    const handleLanguageChanged = (lng: string) => {
      localStorage.setItem('i18nextLng', lng)
    }
    
    i18n.on('languageChanged', handleLanguageChanged)
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged)
    }
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
} 