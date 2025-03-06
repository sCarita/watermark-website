import { type Metadata } from 'next'
import { cookies } from 'next/headers'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { loadArticles } from '@/lib/mdx'
import { BlogContent } from '@/components/BlogContent'
import { BlogIntro } from '@/components/BlogIntro'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Explore our blog for expert tips on watermark removal techniques, tutorials on how to remove watermarks from photos, and guides on using AI to clean unwanted text from images. Learn how to erase logos from pictures and discover the best free watermark remover tools available online.',
}

export default async function Blog() {
  const cookieStore = cookies()
  const locale = cookieStore.get('i18nextLng')?.value || 'en'

  let articles = await loadArticles(locale)

  return (
    <>
      <Header />
      <BlogIntro />
      <BlogContent articles={articles} />
      <Footer />
    </>
  )
}
