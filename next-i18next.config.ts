import type { UserConfig } from 'next-i18next'

const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'],
    localeDetection: false,
  },
  localePath: './src/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}

export default i18nConfig
