'use client'

import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'
import { useTranslations } from 'next-intl'
import { LanguageSelector } from '@/components/LanguageSelector'

export function CallToAction() {
  const t = useTranslations()

  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt="Clear.photo buy now"
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            {t('callToAction.title')}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            {t('callToAction.subtitle')}
          </p>
          <div className="mt-6 flex justify-center">
            <LanguageSelector variant="dark" />
          </div>
          <Button href="/register" color="white" className="mt-10">
            {t('common.buttons.get6MonthsFree')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
