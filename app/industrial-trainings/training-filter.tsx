"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, FileCheck, Filter } from "lucide-react"
import Link from "next/link"

type CourseCategory = "CS_IT" | "MECHANICAL" | "CIVIL" | "ELECTRONICS" | "MANAGEMENT" | "FASHION" | "OTHER"

interface Training {
  id: string
  slug: string
  code: string
  title: string
  description: string | null
  category: CourseCategory
  duration: string
  eligibility: string | null
  highlights: string[]
}

const categoryLabels: Record<CourseCategory, string> = {
  CS_IT: "CS & IT",
  MECHANICAL: "Mechanical",
  CIVIL: "Civil",
  ELECTRONICS: "Electronics",
  MANAGEMENT: "Management",
  FASHION: "Fashion",
  OTHER: "Other"
}

const categoryOrder: CourseCategory[] = ["CS_IT", "MECHANICAL", "CIVIL", "ELECTRONICS", "MANAGEMENT", "FASHION", "OTHER"]

export function TrainingFilter({ trainings }: { trainings: Training[] }) {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | "ALL">("ALL")

  // Get unique categories from trainings
  const availableCategories = Array.from(
    new Set(trainings.map(t => t.category))
  ).sort((a, b) => {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  })

  // Filter trainings
  const filteredTrainings = selectedCategory === "ALL" 
    ? trainings 
    : trainings.filter(t => t.category === selectedCategory)

  return (
    <>
      {/* Filter Section */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter className="h-4 w-4" />
          <span>Filter by Category:</span>
        </div>
        <Button
          variant={selectedCategory === "ALL" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("ALL")}
        >
          All ({trainings.length})
        </Button>
        {availableCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {categoryLabels[category]} ({trainings.filter(t => t.category === category).length})
          </Button>
        ))}
      </div>

      {/* Trainings Grid */}
      {filteredTrainings.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">
              No trainings available in this category.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTrainings.map((training) => (
            <Card
              key={training.id}
              className="group transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{training.code}</Badge>
                    <Badge variant="outline">
                      {categoryLabels[training.category]}
                    </Badge>
                  </div>
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

                <Button className="w-full text-white" asChild>
                  <Link href={`/industrial-trainings/${training.slug}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
