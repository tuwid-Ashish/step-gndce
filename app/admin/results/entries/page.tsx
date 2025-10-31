import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download } from "lucide-react"

export const metadata = {
  title: "Result Entries",
  description: "View and manage student result entries"
}

// Mock result entries
const mockEntries = [
  {
    id: "1",
    rollNo: "ST2024001",
    studentName: "Arjun Singh",
    examCode: "FSD-2024-FINAL",
    examTitle: "Full Stack Development - Final",
    total: 255,
    maxTotal: 300,
    percentage: 85,
    grade: "A",
    pass: true,
    submittedAt: "2024-10-25"
  },
  {
    id: "2",
    rollNo: "ST2024002", 
    studentName: "Priya Sharma",
    examCode: "FSD-2024-FINAL",
    examTitle: "Full Stack Development - Final",
    total: 195,
    maxTotal: 300,
    percentage: 65,
    grade: "B",
    pass: true,
    submittedAt: "2024-10-25"
  },
  {
    id: "3",
    rollNo: "ST2024003",
    studentName: "Rohit Kumar",
    examCode: "DS-2024-MID",
    examTitle: "Data Science & AI - Mid-term",
    total: 120,
    maxTotal: 200,
    percentage: 60,
    grade: "C",
    pass: true,
    submittedAt: "2024-10-20"
  }
]

export default function ResultEntriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Result Entries</h1>
          <p className="text-muted-foreground">
            View and manage student examination results
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Roll no or student name" className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Exam</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All exams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exams</SelectItem>
                  <SelectItem value="fsd-final">Full Stack Development - Final</SelectItem>
                  <SelectItem value="ds-mid">Data Science & AI - Mid-term</SelectItem>
                  <SelectItem value="mad-proj">Mobile App Development - Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All results" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="pass">Pass Only</SelectItem>
                  <SelectItem value="fail">Fail Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Grade</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="A">Grade A</SelectItem>
                  <SelectItem value="B">Grade B</SelectItem>
                  <SelectItem value="C">Grade C</SelectItem>
                  <SelectItem value="D">Grade D</SelectItem>
                  <SelectItem value="F">Grade F</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Results ({mockEntries.length} entries)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium">Roll No</th>
                  <th className="text-left py-3 px-2 font-medium">Student Name</th>
                  <th className="text-left py-3 px-2 font-medium">Exam</th>
                  <th className="text-right py-3 px-2 font-medium">Marks</th>
                  <th className="text-center py-3 px-2 font-medium">Grade</th>
                  <th className="text-center py-3 px-2 font-medium">Status</th>
                  <th className="text-center py-3 px-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockEntries.map((entry) => (
                  <tr key={entry.id} className="border-b border-border hover:bg-muted/30">
                    <td className="py-3 px-2 font-mono">{entry.rollNo}</td>
                    <td className="py-3 px-2">{entry.studentName}</td>
                    <td className="py-3 px-2">
                      <div>
                        <div className="font-medium text-sm">{entry.examTitle}</div>
                        <div className="text-xs text-muted-foreground">{entry.examCode}</div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right font-mono">
                      <div>{entry.total}/{entry.maxTotal}</div>
                      <div className="text-xs text-muted-foreground">{entry.percentage}%</div>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant={
                        entry.grade === 'A' ? 'default' :
                        entry.grade === 'B' ? 'secondary' :
                        entry.grade === 'C' ? 'outline' :
                        'destructive'
                      }>
                        {entry.grade}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant={entry.pass ? 'default' : 'destructive'}>
                        {entry.pass ? 'PASS' : 'FAIL'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex gap-1 justify-center">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* TODO Notice */}
      <Card className="border-brand-200 bg-brand-50">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Advanced filtering and search functionality</li>
            <li>• Bulk operations (edit, delete, export)</li>
            <li>• Result modification history</li>
            <li>• Student performance analytics</li>
            <li>• Automated grading rules</li>
            <li>• Integration with student portal</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}