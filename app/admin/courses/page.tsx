import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { DeleteCourseButton, ToggleActiveButton } from "./actions-client"

export const metadata = {
  title: "Manage Courses",
  description: "Manage diploma programs and industrial trainings"
}

export default async function ManageCoursesPage() {
  const session = await auth()
  if (!session || session.user.role === "CONTENT_EDITOR") {
    redirect("/admin")
  }

  const courses = await prisma.course.findMany({
    orderBy: [
      { type: "asc" },
      { createdAt: "desc" }
    ],
  })

  const diplomas = courses.filter(c => c.type === "DIPLOMA")
  const trainings = courses.filter(c => c.type === "INDUSTRIAL_TRAINING")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Courses</h1>
          <p className="text-muted-foreground">
            Manage diploma programs and industrial trainings
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            New Course
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">Total Courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{diplomas.length}</div>
            <p className="text-xs text-muted-foreground">Diplomas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{trainings.length}</div>
            <p className="text-xs text-muted-foreground">Trainings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {courses.filter(c => c.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Diplomas Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Diploma Programs</h2>
        {diplomas.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No diploma programs yet
            </CardContent>
          </Card>
        ) : (
          diplomas.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        )}
      </div>

      {/* Industrial Trainings Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Industrial Trainings</h2>
        {trainings.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No industrial trainings yet
            </CardContent>
          </Card>
        ) : (
          trainings.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        )}
      </div>
    </div>
  )
}

function CourseCard({ course }: { course: any }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              {course.isActive ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-muted-foreground" />
              )}
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <Badge variant="outline">{course.code}</Badge>
            </div>

            {course.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <Badge>{course.type === "DIPLOMA" ? "Diploma" : "Training"}</Badge>
              <Badge variant="secondary">{course.duration}</Badge>
              {course.eligibility && (
                <Badge variant="outline">Eligibility: {course.eligibility}</Badge>
              )}
              {course.syllabusUrl && (
                <Badge variant="outline">Has Syllabus</Badge>
              )}
            </div>

            {course.highlights.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {course.highlights.slice(0, 3).map((highlight: string, i: number) => (
                  <span key={i} className="text-xs text-muted-foreground">
                    • {highlight}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <ToggleActiveButton 
              courseId={course.id} 
              isActive={course.isActive}
            />
            
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/courses/${course.id}/edit`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            
            <DeleteCourseButton courseId={course.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
