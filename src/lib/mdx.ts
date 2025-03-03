import { type ImageProps } from 'next/image'
import glob from 'fast-glob'

async function loadEntries<T extends { date: string }>(
  directory: string,
  metaName: string,
  locale: string = 'en',
): Promise<Array<MDXEntry<T>>> {
  locale = locale === 'en' ? '' : `/${locale}`
  return (
    await Promise.all(
      (await glob('**/page.mdx', { cwd: `src/app${locale}/${directory}` })).map(
        async (filename) => {
          let metadata = (
            await import(`../app${locale}/${directory}/${filename}`)
          )[metaName] as T
          return {
            ...metadata,
            metadata,
            href: `${locale}/${directory}/${filename.replace(/\/page\.mdx$/, '')}`,
          }
        },
      ),
    )
  ).sort((a, b) => b.date.localeCompare(a.date))
}

type ImagePropsWithOptionalAlt = Omit<ImageProps, 'alt'> & { alt?: string }

export type MDXEntry<T> = T & { href: string; metadata: T }

export interface Article {
  date: string
  title: string
  description: string
  author: {
    name: string
    role: string
    image: ImagePropsWithOptionalAlt
  }
}

export function loadArticles(locale: string = 'en') {
  return loadEntries<Article>('blog', 'article', locale)
}
