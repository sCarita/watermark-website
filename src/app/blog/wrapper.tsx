import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { MDXComponents } from '@/components/MDXComponents'
import { PageLinks } from '@/components/PageLinks'
import { formatDate } from '@/lib/formatDate'
import { type Article, type MDXEntry, loadArticles } from '@/lib/mdx'
import { cookies } from 'next/headers'
export default async function BlogArticleWrapper({
  article,
  children,
}: {
  article: MDXEntry<Article>
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en'

  let allArticles = await loadArticles(locale)
  let moreArticles = allArticles
    .filter(({ metadata }) => metadata !== article)
    .slice(0, 2)

  return (
    <>
      <Header />
      <Container as="article" className="mt-10">
        <FadeIn>
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight [text-wrap:balance] text-neutral-950 sm:text-6xl">
              {article.title}
            </h1>
            <time
              dateTime={article.date}
              className="order-first text-sm text-neutral-950"
            >
              {formatDate(article.date)}
            </time>
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              by {article.author.name}, {article.author.role}
            </p>
          </header>
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
