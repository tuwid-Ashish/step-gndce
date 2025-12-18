import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createCourse } from "@/app/actions/courses"

export const metadata = {
  title: "Create Course",
  description: "Create a new diploma or industrial training"
}

export default async function NewCoursePage() {
  const session = await auth()
  if (!session || session.user.role === "CONTENT_EDITOR") {
    redirect("/admin")
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/courses">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Course</h1>
          <p className="text-muted-foreground">
            Add a new diploma or industrial training
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createCourse} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Course Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Diploma in Computer Application"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="code" className="text-sm font-medium">
                  Course Code *
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., DCA"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter course description"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Type *
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="DIPLOMA">Diploma (1 Year)</option>
                  <option value="INDUSTRIAL_TRAINING">Industrial Training</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="duration" className="text-sm font-medium">
                  Duration *
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 1 Year, 6 Weeks"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="eligibility" className="text-sm font-medium">
                  Eligibility
                </label>
                <input
                  id="eligibility"
                  name="eligibility"
                  type="text"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., +2, Graduate"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="syllabusUrl" className="text-sm font-medium">
                Syllabus URL (Optional)
              </label>
              <input
                id="syllabusUrl"
                name="syllabusUrl"
                type="url"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://drive.google.com/..."
              />
              <p className="text-xs text-muted-foreground">
                Google Drive link to syllabus PDF (only if you want to display syllabus section)
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="highlights" className="text-sm font-medium">
                Highlights/Key Features
              </label>
              <textarea
                id="highlights"
                name="highlights"
                rows={6}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter each highlight on a new line"
              />
              <p className="text-xs text-muted-foreground">
                One highlight per line (e.g., Software Development, Database Management, etc.)
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="submit">Create Course</Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/courses">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
