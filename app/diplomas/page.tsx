import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap } from "lucide-react"
import { DiplomaFilter } from "./diploma-filter"

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Diploma Courses | STEP-GNDEC",
  description: "Explore our 1-year diploma programs in various fields"
}

const categoryOrder = ["CS_IT", "MECHANICAL", "CIVIL", "ELECTRONICS", "MANAGEMENT", "FASHION", "OTHER"] as const

export default async function DiplomasPage() {
  const diplomasData = await prisma.course.findMany({
    where: {
      type: "DIPLOMA",
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
    },
    orderBy:{
      createdAt: "desc"
    }
  })

  // Sort diplomas by category order
  const diplomas = diplomasData.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.category as  typeof categoryOrder[number])
    const indexB = categoryOrder.indexOf(b.category as  typeof categoryOrder[number])
    return indexA - indexB
  })

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4" variant="outline">
            <GraduationCap className="mr-2 h-3 w-3" />
            Professional Education
          </Badge>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Diploma Courses
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            One-year diploma programs designed to equip you with industry-relevant skills
            and knowledge. Build your career with our comprehensive training.
          </p>
        </div>

        {diplomas.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <GraduationCap className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold">No Diplomas Available</h3>
              <p className="text-muted-foreground">
                Check back soon for our upcoming diploma programs.
              </p>
            </CardContent>
          </Card>
        ) : (
          <DiplomaFilter diplomas={diplomas} />
        )}
      </div>
    </div>
  )
}

