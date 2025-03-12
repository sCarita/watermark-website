import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getBlogPost } from '@/utils/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { ImgHTMLAttributes } from 'react'
import { DetailedHTMLProps } from 'react'
import Image, { ImageProps } from 'next/image'
import { Metadata } from 'next'
import { getPathname, Link } from '@/i18n/navigation'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const pathname = getPathname({ locale, href: `/blog/${slug}` })

  const language = locale || 'en'
  const post = await getBlogPost(language, slug)

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  return {
    title: {
      template: '%s - clear.photo Blog',
      default: `${post.title} - clear.photo Blog`,
    },
    description:
      post.excerpt ||
      'Learn about AI-powered watermark removal technology and techniques. Discover how to effectively remove watermarks from your images using advanced AI solutions.',
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      url: `https://www.clear.photo${pathname}`,
      publishedTime: post.date,
    },
    alternates: {
      canonical: `https://www.clear.photo${pathname}`,
    },
  }
}

const components = {
  h1: (props: any) => (
    <h1
      className="font-display text-4xl font-medium tracking-tight text-slate-900"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="mt-8 font-display text-3xl font-medium tracking-tight text-slate-900"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="mt-6 font-display text-2xl font-medium tracking-tight text-slate-900"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className="mt-4 font-display text-xl font-medium tracking-tight text-slate-900"
      {...props}
    />
  ),
  p: (props: any) => <p className="mt-4 text-slate-600" {...props} />,
  a: (props: any) => (
    <Link className="text-blue-600 hover:underline" {...props} />
  ),
  strong: (props: any) => (
    <strong className="font-semibold text-slate-900" {...props} />
  ),
  em: (props: any) => <em className="text-slate-700" {...props} />,
  code: (props: any) => (
    <code
      className="rounded bg-slate-100 px-1 py-0.5 text-slate-900"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-slate-100"
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="my-4 border-l-4 border-slate-300 pl-4 text-slate-600 italic"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="my-4 list-disc pl-6 text-slate-600" {...props} />
  ),
  ol: (props: any) => (
    <ol className="my-4 list-decimal pl-6 text-slate-600" {...props} />
  ),
  li: (props: any) => <li className="my-1 text-slate-600" {...props} />,
  hr: (props: any) => <hr className="my-8 border-slate-200" {...props} />,
  table: (props: any) => (
    <table className="my-4 w-full border-collapse" {...props} />
  ),
  th: (props: any) => (
    <th
      className="border border-slate-300 bg-slate-50 p-2 text-left"
      {...props}
    />
  ),
  td: (props: any) => <td className="border border-slate-300 p-2" {...props} />,
  img: (
    props: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
  ) => {
    if (!props.src) return null
    return (
      <Image
        {...(props as ImageProps)}
        style={{ width: '100%', height: 'auto' }}
        width={900}
        height={600}
      />
    )
  },
}

export default async function BlogPost({ params }: Props) {
  const { locale, slug } = await params

  // If no language is specified, default to English
  const language = locale || 'en'
  const post = await getBlogPost(language, slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        <Container className="py-16 md:py-20">
          <FadeIn>
            <article className="mx-auto max-w-4xl">
              <header className="mb-8">
                <h1 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
                  {post.title}
                </h1>
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>·</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </header>
              <MDXRemote source={post.content} components={components} />
            </article>
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </>
  )
}
