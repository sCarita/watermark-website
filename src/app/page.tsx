import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import FileUpload from '@/components/FileUpload'

export const metadata: Metadata = {
  description: 'Remove watermarks from your images with our AI-powered tool.',
}

export default async function Home() {
  return (
    <>
      <Container className="flex min-h-[calc(100vh-88px)] items-center">
        <FadeIn className="flex gap-8">
          <div className="w-7/12">
            <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
              Remove watermarks from your images
            </h1>
            <p className="mt-6 text-xl text-neutral-600">
              Remove watermarks from your images with our AI-powered tool.
            </p>
          </div>
          <div className="w-5/12">
            <FileUpload />
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
