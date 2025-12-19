import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Clock, FileCheck } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Industrial Trainings | STEP-GNDEC",
  description: "Short-term industrial training programs for skill development"
}

export default async function TrainingsPage() {
  const trainings = await prisma.course.findMany({
    where: {
      type: "INDUSTRIAL_TRAINING",
      isActive: true
    },
    orderBy: {
      createdAt: "desc"
    }
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

        {/* Trainings Grid */}
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trainings.map((training) => (
              <Card
                key={training.id}
                className="group transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-3 flex items-start justify-between">
                    <Badge variant="secondary">{training.code}</Badge>
                    {training.eligibility && (
                      <span className="text-xs text-muted-foreground">
                        {training.eligibility}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary">
                    {training.title}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {training.description && (
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {training.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{training.duration}</span>
                    </div>
                    {training.highlights.length > 0 && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <FileCheck className="h-4 w-4" />
                        <span>{training.highlights.length} topics</span>
                      </div>
                    )}
                  </div>

                  {training.highlights.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Key Topics:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {training.highlights.slice(0, 3).map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {training.highlights.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{training.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <Button className="w-full" asChild>
                    <Link href={`/industrial-trainings/${training.slug}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
