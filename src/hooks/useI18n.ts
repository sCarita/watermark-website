'use client'

import { useTranslation } from 'react-i18next'

export function useI18n() {
  const { t, i18n } = useTranslation('common')

  return {
    t,
    i18n,
    locale: i18n.language,
    changeLanguage: i18n.changeLanguage
  }
} 