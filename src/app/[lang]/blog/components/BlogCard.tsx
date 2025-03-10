import Image from 'next/image'

interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  image: string
}

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 p-6 hover:border-slate-300">
      <Image
        src={post.image}
        alt={post.title}
        width={300}
        height={200}
        className="mb-2 h-48 w-full rounded-lg border border-slate-200 object-cover object-left object-top"
      />
      <h2 className="font-display text-xl font-medium tracking-tight text-slate-900 group-hover:text-blue-600">
        {post.title}
      </h2>
      <p className="mt-4 text-sm text-slate-600">{post.excerpt}</p>
      <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
        <time dateTime={post.date}>{post.date}</time>
        <span>·</span>
        <span>{post.readingTime} min read</span>
      </div>
    </article>
  )
}
