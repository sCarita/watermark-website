import { type ImageProps } from 'next/image'
import glob from 'fast-glob'

async function loadEntries<T extends { date: string }>(
  directory: string,
  metaName: string,
  locale: string = 'en',
): Promise<Array<MDXEntry<T>>> {
  locale = locale === 'en' ? '' : `/${locale}`
  console.log('locale', locale)
  console.log('path', `src/app${locale}/${directory}`)
  return (
    await Promise.all(
      (await glob('**/page.mdx', { cwd: `src/app${locale}/${directory}` })).map(
        async (filename) => {
          console.log('filename', `src/app${locale}/${directory}/${filename}`)
          let metadata = (
            await import(`../app${locale}/${directory}/${filename}`)
          )[metaName] as T
          console.log('metadata', metadata)
          console.log(
            'href',
            `${locale}/${directory}/${filename.replace(/\/page\.mdx$/, '')}`,
          )
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
