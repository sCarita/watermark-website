import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes with language alternates
  const staticRoutes = [
    {
      url: 'https://clear.photo/en',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://clear.photo/es',
          fr: 'https://clear.photo/fr',
        },
      },
    },
    {
      url: 'https://clear.photo/en/blog',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://clear.photo/es/blog',
          fr: 'https://clear.photo/fr/blog',
        },
      },
    },
    {
      url: 'https://clear.photo/en/privacy',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://clear.photo/es/privacy',
          fr: 'https://clear.photo/fr/privacy',
        },
      },
    },
    {
      url: 'https://clear.photo/en/terms',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://clear.photo/es/terms',
          fr: 'https://clear.photo/fr/terms',
        },
      },
    },
  ]

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
            url: `https://clear.photo/${lang}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          })
        }
      })
    }
  })

  return [...staticRoutes, ...blogPosts]
}
