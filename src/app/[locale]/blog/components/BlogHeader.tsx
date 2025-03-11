'use client'

// import { useTranslations } from 'next-intl'
import { useTranslations } from 'next-intl'

export function BlogHeader() {
  //  const t = useTranslations()
  const t = useTranslations()

  return (
    <div>
      <h1 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
        {t('blog.title')}
      </h1>
      <h2 className="mt-4 text-lg text-slate-600">{t('blog.description')}</h2>
    </div>
  )
}
