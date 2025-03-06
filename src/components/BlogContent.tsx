'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { formatDate } from '@/lib/formatDate'
import { useI18n } from '@/hooks/useI18n'
import { type Article, type MDXEntry } from '@/lib/mdx'

interface BlogContentProps {
  articles: MDXEntry<Article>[]
}

export function BlogContent({ articles }: BlogContentProps) {
  const { t } = useI18n()

  return (
    <Container className="mt-24 mb-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24 lg:space-y-32">
        {articles.map((article) => (
          <FadeIn key={article.href}>
            <article>
              <Border className="pt-16">
                <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                  <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                    <h2 className="font-display text-2xl font-semibold text-neutral-950">
                      <Link href={article.href}>{article.title}</Link>
                    </h2>
                    <dl className="lg:absolute lg:top-0 lg:left-0 lg:w-1/3 lg:px-4">
                      <dt className="sr-only">{t('blog.published')}</dt>
                      <dd className="absolute top-0 left-0 text-sm text-neutral-950 lg:static">
                        <time dateTime={article.date}>
                          {formatDate(article.date)}
                        </time>
                      </dd>
                      <dt className="sr-only">{t('blog.author')}</dt>
                      <dd className="mt-6 flex gap-x-4">
                        <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                          <Image
                            alt=""
                            {...article.author.image}
                            className="h-12 w-12 object-cover grayscale"
                          />
                        </div>
                        <div className="text-sm text-neutral-950">
                          <div className="font-semibold">
                            {article.author.name}
                          </div>
                          <div>{article.author.role}</div>
                        </div>
                      </dd>
                    </dl>
                    <p className="mt-6 max-w-2xl text-base text-neutral-600">
                      {article.description}
                    </p>
                    <Button
                      href={article.href}
                      aria-label={`${t('blog.readMore')}: ${article.title}`}
                      className="mt-8"
                    >
                      {t('blog.readMore')}
                    </Button>
                  </div>
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}
