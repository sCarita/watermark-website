'use client'

import { PageIntro } from '@/components/PageIntro'
import { useI18n } from '@/hooks/useI18n'

export function BlogIntro() {
  const { t } = useI18n()

  return (
    <PageIntro eyebrow={t('blog.eyebrow')} title={t('blog.title')}>
      <p>{t('blog.description')}</p>
    </PageIntro>
  )
}
