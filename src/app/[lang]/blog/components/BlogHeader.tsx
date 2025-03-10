'use client'

import { useI18n } from '@/hooks/useI18n'

export function BlogHeader() {
  const { t } = useI18n()

  return (
    <div>
      <h1 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
        {t('blog.title')}
      </h1>
      <h2 className="mt-4 text-lg text-slate-600">{t('blog.description')}</h2>
    </div>
  )
}
