export const defaultLocale = 'en'
export const locales = ['en', 'es', 'fr'] as const
export type Locale = (typeof locales)[number]
export const localeCookieName = 'NEXT_LOCALE'
