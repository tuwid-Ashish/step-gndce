import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Clock, FileCheck } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Diploma Courses | STEP-GNDEC",
  description: "Explore our 1-year diploma programs in various fields"
}

export default async function DiplomasPage() {
  const diplomas = await prisma.course.findMany({
    where: {
      type: "DIPLOMA",
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

        {/* Diplomas Grid */}
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {diplomas.map((diploma) => (
              <Card
                key={diploma.id}
                className="group transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-3 flex items-start justify-between">
                    <Badge variant="secondary">{diploma.code}</Badge>
                    {diploma.eligibility && (
                      <span className="text-xs text-muted-foreground">
                        {diploma.eligibility}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary">
                    {diploma.title}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {diploma.description && (
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {diploma.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{diploma.duration}</span>
                    </div>
                    {diploma.highlights.length > 0 && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <FileCheck className="h-4 w-4" />
                        <span>{diploma.highlights.length} modules</span>
                      </div>
                    )}
                  </div>

                  {diploma.highlights.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Key Areas:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {diploma.highlights.slice(0, 3).map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {diploma.highlights.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{diploma.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <Button className="w-full" asChild>
                    <Link href={`/diplomas/${diploma.slug}`}>
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

