import { Container } from './Container'
import { FadeIn } from './FadeIn'
import ImageComparisonSlider from './ImageComparisonSlider'

const Showcase = () => {
  return (
    <section
      id="showcase"
      className="relative overflow-hidden bg-slate-50 pt-20 pb-28 sm:py-32"
    >
      <Container>
        <FadeIn>
          <div className="mb-10 text-center">
            <h1 className="font-display text-3xl font-medium tracking-tight [text-wrap:balance] text-neutral-950 sm:text-4xl lg:text-5xl xl:text-6xl">
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
    </section>
  )
}

export default Showcase
