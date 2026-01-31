import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, GraduationCap, Calendar, Download } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { DeleteResultButton } from "./actions-client"

// Type definition for results
interface ResultItem {
  id: string
  title: string
  courseType: "DIPLOMA" | "INDUSTRIAL_TRAINING"
  resultType: "PDF" | "DETAILED"
  course: {
    title: string
  }
  semester: number | null
  publishedAt: Date
  _count: {
    entries: number
  }
  pdfUrl: string | null
}

export const metadata = {
  title: "Manage Results",
  description: "Upload and manage student results"
}

export default async function ManageResultsPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  // CONTENT_EDITOR cannot access results
  if (session.user.role === "CONTENT_EDITOR") {
    redirect("/admin")
  }

  // Temporarily return empty array until migration is run
  const results: ResultItem[] = []
  const diplomaResults: ResultItem[] = []
  const trainingResults: ResultItem[] = []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Results</h1>
          <p className="text-muted-foreground">
            Upload and manage student examination results
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/results/upload">
            <Plus className="mr-2 h-4 w-4" />
            Upload Result
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{results.length}</div>
            <p className="text-xs text-muted-foreground">Total Results</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{diplomaResults.length}</div>
            <p className="text-xs text-muted-foreground">Diploma Results</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{trainingResults.length}</div>
            <p className="text-xs text-muted-foreground">Training Results</p>
          </CardContent>
        </Card>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No results uploaded yet</p>
              <Button asChild>
                <Link href="/admin/results/upload">Upload First Result</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          results.map((result) => (
            <Card key={result.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{result.title}</h3>
                      <Badge variant={result.courseType === "DIPLOMA" ? "default" : "secondary"}>
                        {result.courseType === "DIPLOMA" ? "Diploma" : "Training"}
                      </Badge>
                      <Badge variant="outline">
                        {result.resultType === "PDF" ? "PDF" : "Detailed"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {result.course && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          {result.course.title}
                        </span>
                      )}
                      {result.semester && (
                        <span>Semester {result.semester}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(result.publishedAt), "dd MMM yyyy")}
                      </span>
                    </div>

                    {result.resultType === "DETAILED" && (
                      <p className="text-sm text-muted-foreground">
                        {result._count.entries} student {result._count.entries === 1 ? "entry" : "entries"}
                      </p>
                    )}

                    {result.pdfUrl && (
                      <a 
                        href={result.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <Download className="h-3 w-3" />
                        View PDF
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/results/${result.id}/edit`}>
                        Edit
                      </Link>
                    </Button>
                    <DeleteResultButton resultId={result.id} title={result.title} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
