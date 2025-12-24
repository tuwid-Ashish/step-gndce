import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Image from "next/image"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const blog = await prisma.blog.findUnique({
    where: { slug, isPublished: true },
  })

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: blog.title,
    description: blog.excerpt || blog.title
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  const blog = await prisma.blog.findUnique({
    where: { slug, isPublished: true },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!blog) {
    notFound()
  }

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          {/* Cover Image */}
          {blog.coverImage && (
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-muted-foreground">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author.name}</span>
                </div>
              )}
              {blog.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(blog.publishedAt), "MMMM d, yyyy")}</span>
                </div>
              )}
            </div>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="mt-4 text-lg text-muted-foreground">{blog.excerpt}</p>
            )}
          </div>

          {/* Content */}
          <article className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </article>
        </div>
      </Container>
    </div>
  )
}