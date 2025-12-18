import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Blog",
  description: "Industry insights, updates, and success stories from STEP Institute"
}

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest industry insights, technology trends, and success stories
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="bg-brand-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground mb-6">
                We&apos;re working on bringing you insightful articles and updates. 
                Check back soon for the latest content!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    {blog.coverImage && (
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        {blog.publishedAt && format(new Date(blog.publishedAt), "MMM d, yyyy")}
                      </div>
                      <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                      {blog.excerpt && (
                        <CardDescription className="line-clamp-3">
                          {blog.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        {blog.author && (
                          <span className="text-sm text-muted-foreground">
                            By {blog.author.name}
                          </span>
                        )}
                        <span className="text-sm text-primary flex items-center gap-1">
                          Read more <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}