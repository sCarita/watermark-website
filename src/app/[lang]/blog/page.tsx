import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BlogList } from './components/BlogList'
import { getBlogPosts } from '@/utils/blog'
import { BlogHeader } from './components/BlogHeader'
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
