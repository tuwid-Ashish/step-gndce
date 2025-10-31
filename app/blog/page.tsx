import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Blog",
  description: "Industry insights, updates, and success stories from STEP Institute"
}

export default function BlogPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest industry insights, technology trends, and success stories
            </p>
          </div>

          {/* TODO: Add blog posts */}
          <div className="bg-brand-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              We're working on bringing you insightful articles and updates. 
              Check back soon for the latest content!
            </p>
            <Button asChild>
              <Link href="/contact">Get Notified</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}