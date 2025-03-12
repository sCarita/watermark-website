import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BlogList } from './components/BlogList'
import { getBlogPosts } from '@/utils/blog'
import { BlogHeader } from './components/BlogHeader'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getPathname } from '@/i18n/navigation'
type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params

  const t = await getTranslations({ locale, namespace: 'metadata.blog' })
  const pathname = getPathname({ locale, href: '/blog' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://www.clear.photo${pathname}`,
      languages: Object.fromEntries(
        routing.locales.map((cur) => [
          cur,
          `https://www.clear.photo${getPathname({ locale: cur, href: '/blog' })}`,
        ]),
      ),
    },
  }
}
export default async function BlogPage({ params }: Props) {
  const { locale } = await params

  // If no language is specified, default to English
  const language = locale || 'en'

  // Enable static rendering
  setRequestLocale(locale)
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
