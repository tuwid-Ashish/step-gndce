import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface StartupPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: StartupPageProps) {
  const { slug } = await params
  
  return {
    title: "Startup Details",
    description: "Learn more about this innovative startup from STEP Institute"
  }
}

export default async function StartupPage({ params }: StartupPageProps) {
  const { slug } = await params
  
  // TODO: Fetch startup data based on slug
  // For now, just show placeholder
  
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/startups">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Startups
            </Link>
          </Button>

          <div className="bg-brand-50 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Startup Details Coming Soon</h1>
            <p className="text-muted-foreground mb-4">
              We're working on detailed startup profiles. This page will feature:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-muted-foreground mb-6">
              <li>• Company overview and mission</li>
              <li>• Founder profiles and team</li>
              <li>• Product/service details</li>
              <li>• Growth metrics and milestones</li>
              <li>• Investment information</li>
              <li>• Contact details</li>
            </ul>
            <Button asChild>
              <Link href="/startups">View All Startups</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}