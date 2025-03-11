import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BlogList } from './components/BlogList'
import { getBlogPosts } from '@/utils/blog'
import { BlogHeader } from './components/BlogHeader'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - clear.photo',
    default: 'clear.photo - Remove watermarks from your images',
  },
  description:
    'Free online watermark remover tool. Easily remove watermarks, logos, and text from photos and images. Our AI-powered technology helps you get rid of watermarks from Getty Images, Shutterstock, and more. Clean up your pictures with the best free watermark remover available online.',
}

export default async function BlogPage({
  params: { lang },
}: {
  params: { lang: string }
}) {
  // If no language is specified, default to English
  const language = lang || 'en'
  const posts = await getBlogPosts(language)

  return (
    <>
      <Header />
      <main>
        <Container className="py-16 md:py-20">
          <FadeIn>
            <BlogHeader />
            <BlogList posts={posts} />
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </>
  )
}
