import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from '../locales/en.json'
import esTranslation from '../locales/es.json'
import frTranslation from '../locales/fr.json'

// Initialize i18next for client-side
i18next.use(initReactI18next).init({
  resources: {
    en: {
      common: enTranslation
    },
    es: {
      common: esTranslation
    },
    fr: {
      common: frTranslation
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  defaultNS: 'common'
})

export default i18next 