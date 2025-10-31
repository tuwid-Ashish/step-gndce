import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Users, FileText } from "lucide-react"

export const metadata = {
  title: "Manage Exams",
  description: "Manage examination sessions and schedules"
}

// Mock exam data
const mockExams = [
  {
    id: "1",
    title: "Full Stack Development - Final Assessment",
    code: "FSD-2024-FINAL",
    session: "Oct 2024",
    status: "completed",
    totalStudents: 45,
    resultsUploaded: true,
    examDate: "2024-10-25"
  },
  {
    id: "2", 
    title: "Data Science & AI - Mid-term Evaluation",
    code: "DS-2024-MID",
    session: "Oct 2024",
    status: "active",
    totalStudents: 32,
    resultsUploaded: false,
    examDate: "2024-11-15"
  },
  {
    id: "3",
    title: "Mobile App Development - Project Assessment",
    code: "MAD-2024-PROJ",
    session: "Sep 2024",
    status: "scheduled",
    totalStudents: 28,
    resultsUploaded: false,
    examDate: "2024-12-01"
  }
]

export default function ManageExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Exams</h1>
          <p className="text-muted-foreground">
            Create and manage examination sessions
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Exam
        </Button>
      </div>

      {/* Exam List */}
      <div className="space-y-4">
        {mockExams.map((exam) => (
          <Card key={exam.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{exam.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Code: {exam.code} • Session: {exam.session}
                  </CardDescription>
                </div>
                <Badge variant={
                  exam.status === 'completed' ? 'default' :
                  exam.status === 'active' ? 'secondary' : 
                  'outline'
                }>
                  {exam.status === 'completed' ? 'Completed' :
                   exam.status === 'active' ? 'Active' : 'Scheduled'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(exam.examDate).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{exam.totalStudents} students</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Results: {exam.resultsUploaded ? 'Uploaded' : 'Pending'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit Details
                </Button>
                <Button variant="outline" size="sm">
                  View Results
                </Button>
                {!exam.resultsUploaded && (
                  <Button variant="outline" size="sm">
                    Upload Results
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TODO Notice */}
      <Card className="border-brand-200 bg-brand-50">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Exam creation and editing forms</li>
            <li>• Student enrollment management</li>
            <li>• Automated result calculation</li>
            <li>• Bulk operations and filters</li>
            <li>• Export functionality</li>
            <li>• Email notifications for exam schedules</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}