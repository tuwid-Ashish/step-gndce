"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, FileCheck, Filter } from "lucide-react"
import Link from "next/link"

type CourseCategory = "CS_IT" | "MECHANICAL" | "CIVIL" | "ELECTRONICS" | "MANAGEMENT" | "FASHION" | "OTHER"

interface Diploma {
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

export function DiplomaFilter({ diplomas }: { diplomas: Diploma[] }) {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | "ALL">("ALL")

  // Get unique categories from diplomas
  const availableCategories = Array.from(
    new Set(diplomas.map(d => d.category))
  ).sort((a, b) => {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  })

  // Filter diplomas
  const filteredDiplomas = selectedCategory === "ALL" 
    ? diplomas 
    : diplomas.filter(d => d.category === selectedCategory)

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
          All ({diplomas.length})
        </Button>
        {availableCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {categoryLabels[category]} ({diplomas.filter(d => d.category === category).length})
          </Button>
        ))}
      </div>

      {/* Diplomas Grid */}
      {filteredDiplomas.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">
              No diplomas available in this category.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDiplomas.map((diploma) => (
            <Card
              key={diploma.id}
              className="group transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{diploma.code}</Badge>
                    <Badge variant="outline">
                      {categoryLabels[diploma.category]}
                    </Badge>
                  </div>
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

                <Button className="w-full text-white" asChild>
                  <Link href={`/diplomas/${diploma.slug}`}>
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
