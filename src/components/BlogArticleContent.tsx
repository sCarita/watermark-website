'use client'

import { useI18n } from '@/hooks/useI18n'
import { formatDate } from '@/lib/formatDate'
import { type Article, type MDXEntry } from '@/lib/mdx'

interface BlogArticleContentProps {
  article: MDXEntry<Article>
}

export function BlogArticleContent({ article }: BlogArticleContentProps) {
  const { t } = useI18n()

  return (
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
        {t('blog.by')} {article.author.name}, {article.author.role}
      </p>
    </header>
  )
}
