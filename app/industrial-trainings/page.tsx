import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"
import { TrainingFilter } from "./training-filter"

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Industrial Trainings | STEP-GNDEC",
  description: "Short-term industrial training programs for skill development"
}

const categoryOrder = ["CS_IT", "MECHANICAL", "CIVIL", "ELECTRONICS", "MANAGEMENT", "FASHION", "OTHER"] as const

export default async function TrainingsPage() {
  const trainingsData = await prisma.course.findMany({
    where: {
      type: "INDUSTRIAL_TRAINING",
      isActive: true
    },
    select: {
      id: true,
      slug: true,
      code: true,
      title: true,
      description: true,
      category: true,
      duration: true,
      eligibility: true,
      highlights: true,
    }
  })

  // Sort trainings by category order
  const trainings = trainingsData.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.category as typeof categoryOrder[number])
    const indexB = categoryOrder.indexOf(b.category as typeof categoryOrder[number])
    return indexA - indexB
  })

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4" variant="outline">
            <Briefcase className="mr-2 h-3 w-3" />
            Skill Development
          </Badge>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Industrial Training Programs
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Short-term training programs (6 weeks to 6 months) focused on
            industry-relevant skills and practical knowledge.
          </p>
        </div>

        {trainings.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Briefcase className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold">No Trainings Available</h3>
              <p className="text-muted-foreground">
                Check back soon for our upcoming training programs.
              </p>
            </CardContent>
          </Card>
        ) : (
          <TrainingFilter trainings={trainings} />
        )}
      </div>
    </div>
  )
}
