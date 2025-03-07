import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-auto">
        <Container className="flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold text-blue-600">404</p>
            <h1 className="mt-4 text-3xl font-medium tracking-tight text-gray-900 sm:text-5xl">
              Página no encontrada
            </h1>
            <p className="mt-4 text-base text-gray-600">
              Lo sentimos, no pudimos encontrar la página que estás buscando.
            </p>
            <div className="mt-8">
              <Button href="/">Volver a la página principal</Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
} 