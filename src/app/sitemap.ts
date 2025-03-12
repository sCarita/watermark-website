import path from 'path'
import fs from 'fs'
import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getPathname } from '@/i18n/navigation'
import { Locale } from '../../i18n.config'

type Href = Parameters<typeof getPathname>[0]['href']

function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((cur) => [cur, getUrl(href, cur)]),
      ),
    },
  }))
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href })
  return 'https://www.clear.photo' + pathname
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Get blog posts from filesystem
  const blogDir = path.join(process.cwd(), 'src/content/blog')
  const languages = ['en', 'es', 'fr']
  const blogPosts: MetadataRoute.Sitemap = []

  languages.forEach((lang) => {
    const langDir = path.join(blogDir, lang)
    if (fs.existsSync(langDir)) {
      const files = fs.readdirSync(langDir)
      files.forEach((file) => {
        if (file.endsWith('.mdx')) {
          const slug = file.replace('.mdx', '')
          blogPosts.push({
            url: `https://www.clear.photo/${lang}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          })
        }
      })
    }
  })

  return [
    ...getEntries('/'),
    ...getEntries('/blog'),
    ...getEntries('/privacy'),
    ...getEntries('/terms'),
    ...blogPosts,
  ]
}
