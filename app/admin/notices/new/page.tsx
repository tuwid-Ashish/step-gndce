import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createNotice } from "@/app/actions/notices"

export const metadata = {
  title: "Create Notice",
  description: "Create a new notice or announcement"
}

export default async function NewNoticePage() {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/notices">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Notice</h1>
          <p className="text-muted-foreground">
            Create a new notice or announcement
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createNotice} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter notice title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm font-medium">
                Excerpt
              </label>
              <input
                id="excerpt"
                name="excerpt"
                type="text"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Short summary (optional)"
              />
              <p className="text-xs text-muted-foreground">
                Brief summary shown in previews
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={10}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter full notice content"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="GENERAL">General</option>
                  <option value="URGENT">Urgent</option>
                  <option value="ADMISSION">Admission</option>
                  <option value="EXAM">Exam</option>
                  <option value="RESULT">Result</option>
                  <option value="EVENT">Event</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="attachmentUrl" className="text-sm font-medium">
                  Attachment URL
                </label>
                <input
                  id="attachmentUrl"
                  name="attachmentUrl"
                  type="url"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://drive.google.com/..."
                />
                <p className="text-xs text-muted-foreground">
                  Google Drive or external link
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPinned"
                name="isPinned"
                className="h-4 w-4 rounded border-border"
              />
              <label htmlFor="isPinned" className="text-sm font-medium">
                Pin this notice to the top
              </label>
            </div>

            <div className="flex gap-4">
              <Button type="submit">Create Notice</Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/notices">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
