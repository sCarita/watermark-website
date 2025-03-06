import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { MDXComponents } from '@/components/MDXComponents'
import { PageLinks } from '@/components/PageLinks'
import { type Article, type MDXEntry, loadArticles } from '@/lib/mdx'
import { BlogArticleContent } from '@/components/BlogArticleContent'

export default async function BlogArticleWrapper({
  article,
  children,
}: {
  article: MDXEntry<Article>
  children: React.ReactNode
}) {
  const locale = 'en'

  let allArticles = await loadArticles(locale)
  let moreArticles = allArticles
    .filter(({ metadata }) => metadata !== article)
    .slice(0, 2)

  return (
    <>
      <Header />
      <Container as="article" className="mt-10">
        <FadeIn>
          <BlogArticleContent article={article} />
        </FadeIn>

        <FadeIn>
          <MDXComponents.wrapper className="mt-24 sm:mt-32 lg:mt-40">
            {children}
          </MDXComponents.wrapper>
        </FadeIn>
      </Container>

      {moreArticles.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More articles"
          pages={moreArticles}
        />
      )}
      <Footer />
    </>
  )
}
