import { Link } from '@/i18n/navigation'
import BlogCard from './BlogCard'

interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  image: string
}

interface BlogListProps {
  posts: Post[]
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group block"
        >
          <BlogCard post={post} />
        </Link>
      ))}
    </div>
  )
}
