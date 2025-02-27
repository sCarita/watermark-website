import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import WatermarkProcessor from '@/components/WatermarkProcessor'
import ImageComparisonSlider from '@/components/ImageComparisonSlider'

export const metadata: Metadata = {
  description: 'Remove watermarks from your images with our AI-powered tool.',
}

export default async function Home() {
  return (
    <>
      <Container className="flex min-h-[calc(100vh-88px)] items-center">
        <FadeIn className="flex flex-col gap-8 md:flex-row">
          <div className="w-full md:w-7/12">
            <h1 className="font-display text-4xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl lg:text-6xl xl:text-7xl">
              Remove watermarks from your images
            </h1>
            <p className="mt-2 text-xl text-neutral-600 md:mt-6">
              Remove watermarks from your images with our AI-powered tool.
            </p>
          </div>
          <div className="w-full md:w-5/12">
            <WatermarkProcessor />
          </div>
        </FadeIn>
      </Container>
      <Container>
        <FadeIn>
          <div className="mb-10 text-center ">
            <h1 className="font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl lg:text-5xl xl:text-6xl">
              Check out the results
            </h1>
            <p className="mt-2 text-xl text-neutral-600">
              We have results like no other.
            </p>
          </div>
          <ImageComparisonSlider
            originalImage="https://images.unsplash.com/photo-1738193026574-cfbcccbeb052?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            processedImage="https://images.unsplash.com/photo-1740094714220-1b0c181be46d?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </FadeIn>
      </Container>
    </>
  )
}
