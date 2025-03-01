'use client'

import { Container } from './Container'
import { FadeIn } from './FadeIn'
import ImageComparisonSlider from './ImageComparisonSlider'
import { useI18n } from '@/hooks/useI18n'

const Showcase = () => {
  const { t } = useI18n()
  
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
            originalImage="https://images.unsplash.com/photo-1738193026574-cfbcccbeb052?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            processedImage="https://images.unsplash.com/photo-1740094714220-1b0c181be46d?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </FadeIn>
      </Container>
    </section>
  )
}

export default Showcase
