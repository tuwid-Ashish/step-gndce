import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  console.log(slug);
  
  
  return {
    title: "Blog Post",
    description: "Read the latest insights from STEP Institute"
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  console.log(slug);
  
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

          <div className="bg-brand-50 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Blog Posts Coming Soon</h1>
            <p className="text-muted-foreground mb-4">
              We&apos;re preparing insightful articles for you. Our blog will feature:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-muted-foreground mb-6">
              <li>• Industry trends and insights</li>
              <li>• Student success stories</li>
              <li>• Technology tutorials</li>
              <li>• Startup journey case studies</li>
              <li>• Expert interviews</li>
              <li>• Career guidance articles</li>
            </ul>
            <Button asChild>
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}