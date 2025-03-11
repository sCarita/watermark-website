'use client'

import { Container } from './Container'
import { FadeIn } from './FadeIn'
import ImageComparisonSlider from './ImageComparisonSlider'
import { useTranslations } from 'next-intl'
// Import your local images
import originalImage from '@/images/screenshots/original.png'
import processedImage from '@/images/screenshots/processed.jpg'

const Showcase = () => {
  const t = useTranslations()

  return (
    <section
      id="showcase"
      className="relative overflow-hidden bg-slate-50 pt-20 pb-28 sm:py-32"
    >
      <Container>
        <FadeIn>
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
              {t('showcase.title')}
            </h2>
            <p className="mt-4 text-lg tracking-tight text-slate-700">
              {t('showcase.subtitle')}
            </p>
          </div>
          <ImageComparisonSlider
            originalImage={processedImage.src}
            processedImage={originalImage.src}
          />
        </FadeIn>
      </Container>
    </section>
  )
}

export default Showcase
