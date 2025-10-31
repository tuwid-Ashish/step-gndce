import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Upload Results",
  description: "Upload examination results via CSV file"
}

export default function UploadResultsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload Results</h1>
        <p className="text-muted-foreground">
          Upload student examination results using CSV files
        </p>
      </div>

      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload CSV File
          </CardTitle>
          <CardDescription>
            Select an exam and upload the results file in CSV format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exam">Select Exam</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose exam session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fsd-final">Full Stack Development - Final</SelectItem>
                  <SelectItem value="ds-mid">Data Science & AI - Mid-term</SelectItem>
                  <SelectItem value="mad-proj">Mobile App Development - Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session">Session</Label>
              <Input id="session" value="Oct 2024" readOnly className="bg-muted" />
            </div>
          </div>

          {/* File Upload Area */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Drop CSV file here</h3>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse and select file
            </p>
            <Button variant="outline">
              Select File
            </Button>
          </div>

          {/* CSV Format Instructions */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-base">CSV Format Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p className="font-medium">Required columns (in order):</p>
                <div className="bg-background p-3 rounded font-mono text-xs">
                  Roll_Number, Student_Name, Subject_1, Subject_2, Subject_3, Total, Grade
                </div>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• First row should contain column headers</li>
                  <li>• Roll numbers must be unique</li>
                  <li>• Marks should be numeric values</li>
                  <li>• Total should match sum of subject marks</li>
                  <li>• Grade should be A, B, C, D, or F</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button disabled>
              <Upload className="h-4 w-4 mr-2" />
              Import Results
            </Button>
            <Button variant="outline">
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Table (Mock) */}
      <Card>
        <CardHeader>
          <CardTitle>Preview Results</CardTitle>
          <CardDescription>
            Review the data before final import
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileSpreadsheet className="h-12 w-12 mx-auto mb-4" />
            <p>No file selected. Upload a CSV file to preview results.</p>
          </div>
        </CardContent>
      </Card>

      {/* Import Status */}
      <Card>
        <CardHeader>
          <CardTitle>Import History</CardTitle>
          <CardDescription>Recent result upload activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                exam: "Full Stack Development - Final",
                date: "2024-10-25",
                count: "45 records",
                status: "success"
              },
              {
                exam: "Data Science Mid-term",
                date: "2024-10-20", 
                count: "32 records",
                status: "success"
              },
              {
                exam: "Mobile Dev Assessment",
                date: "2024-10-15",
                count: "28 records",
                status: "error"
              }
            ].map((upload, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                <div>
                  <p className="font-medium text-sm">{upload.exam}</p>
                  <p className="text-xs text-muted-foreground">
                    {upload.date} • {upload.count}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {upload.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  )}
                  <span className={`text-xs ${
                    upload.status === 'success' ? 'text-success' : 'text-destructive'
                  }`}>
                    {upload.status === 'success' ? 'Success' : 'Failed'}
                  </span>
                </div>
              </div>
            ))}
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
            <li>• File upload and CSV parsing functionality</li>
            <li>• Data validation and error handling</li>
            <li>• Bulk result processing</li>
            <li>• Automatic grade calculation</li>
            <li>• Email notifications to students</li>
            <li>• Rollback and correction features</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}