import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

interface Post {
  slug: string
  title: string
  image: string
  excerpt: string
  date: string
  readingTime: string
  content: string
}

export async function getBlogPosts(lang: string): Promise<Post[]> {
  const langDir = path.join(BLOG_DIR, lang)

  if (!fs.existsSync(langDir)) {
    return []
  }

  const files = fs.readdirSync(langDir)
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const filePath = path.join(langDir, file)
        const source = fs.readFileSync(filePath, 'utf-8')
        const { data, content } = matter(source)
        const slug = file.replace(/\.mdx$/, '')

        return {
          slug,
          title: data.title,
          image: data.image,
          excerpt: data.excerpt,
          date: data.date,
          readingTime: data.readingTime,
          content,
        }
      }),
  )

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export async function getBlogPost(
  lang: string,
  slug: string,
): Promise<Post | null> {
  const filePath = path.join(BLOG_DIR, lang, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)

  return {
    slug,
    title: data.title,
    image: data.image,
    excerpt: data.excerpt,
    date: data.date,
    readingTime: data.readingTime,
    content,
  }
}
