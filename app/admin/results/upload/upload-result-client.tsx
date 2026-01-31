"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileSpreadsheet, FileType, AlertCircle, ArrowLeft } from "lucide-react"
import { uploadResultPdf, uploadResultCsv } from "@/app/actions/results"
import { toast } from "sonner"
import Link from "next/link"

interface Course {
  id: string
  title: string
  type: string
  code: string
}

export function UploadResultClient({ courses }: { courses: Course[] }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"diploma" | "training">("diploma")
  const [uploadType, setUploadType] = useState<"pdf" | "csv">("pdf")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePdfSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await uploadResultPdf(formData)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Result uploaded successfully! A notice has been created.")
        router.push("/admin/results")
        router.refresh()
      }
    } catch (error) {
      toast.error("Failed to upload result")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCsvSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await uploadResultCsv(formData)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`Result uploaded successfully! ${result.count} entries created. A notice has been published.`)
        router.push("/admin/results")
        router.refresh()
      }
    } catch (error) {
      toast.error("Failed to upload result")
    } finally {
      setIsSubmitting(false)
    }
  }

  const diplomaCourses = courses.filter(c => c.type === "DIPLOMA")
  const trainingCourses = courses.filter(c => c.type === "INDUSTRIAL_TRAINING")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/results">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Upload Result</h1>
          <p className="text-muted-foreground">
            Upload student results via PDF or CSV file
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "diploma" | "training")}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="diploma">Diploma Results</TabsTrigger>
          <TabsTrigger value="training">Training Results</TabsTrigger>
        </TabsList>

        {/* Diploma Results */}
        <TabsContent value="diploma" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Type</CardTitle>
              <CardDescription>Choose how you want to upload the diploma result</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={uploadType === "pdf" ? "default" : "outline"}
                  onClick={() => setUploadType("pdf")}
                  className="h-20 flex flex-col gap-2"
                >
                  <FileType className="h-6 w-6" />
                  <span>PDF Upload</span>
                </Button>
                <Button
                  variant={uploadType === "csv" ? "default" : "outline"}
                  onClick={() => setUploadType("csv")}
                  className="h-20 flex flex-col gap-2"
                >
                  <FileSpreadsheet className="h-6 w-6" />
                  <span>CSV Upload (Detailed)</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {uploadType === "pdf" ? (
            <Card>
              <CardHeader>
                <CardTitle>Upload PDF Result</CardTitle>
                <CardDescription>Upload a PDF file containing the diploma results</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePdfSubmit} className="space-y-4">
                  <input type="hidden" name="courseType" value="DIPLOMA" />
                  
                  <div className="space-y-2">
                    <Label htmlFor="diploma-title">Result Title *</Label>
                    <Input
                      id="diploma-title"
                      name="title"
                      placeholder="e.g., Full Stack Development - Semester 1 - Jan 2024"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="diploma-course">Select Course *</Label>
                      <Select name="courseId" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose course" />
                        </SelectTrigger>
                        <SelectContent>
                          {diplomaCourses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="diploma-semester">Semester *</Label>
                      <Select name="semester" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((sem) => (
                            <SelectItem key={sem} value={sem.toString()}>
                              Semester {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diploma-pdf">Upload PDF File *</Label>
                    <Input
                      id="diploma-pdf"
                      name="pdfFile"
                      type="file"
                      accept=".pdf"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum file size: 10MB
                    </p>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Uploading..." : "Upload PDF Result"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Upload CSV Result (Detailed)</CardTitle>
                <CardDescription>Upload a CSV file with detailed subject-wise results</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCsvSubmit} className="space-y-4">
                  <input type="hidden" name="courseType" value="DIPLOMA" />
                  
                  <div className="space-y-2">
                    <Label htmlFor="csv-title">Result Title *</Label>
                    <Input
                      id="csv-title"
                      name="title"
                      placeholder="e.g., Full Stack Development - Semester 1 - Jan 2024"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="csv-course">Select Course *</Label>
                      <Select name="courseId" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose course" />
                        </SelectTrigger>
                        <SelectContent>
                          {diplomaCourses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="csv-semester">Semester *</Label>
                      <Select name="semester" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((sem) => (
                            <SelectItem key={sem} value={sem.toString()}>
                              Semester {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="csv-file">Upload CSV File *</Label>
                    <Input
                      id="csv-file"
                      name="csvFile"
                      type="file"
                      accept=".csv,.xlsx"
                      required
                    />
                  </div>

                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-base">CSV Format</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <p className="font-medium">Required columns:</p>
                        <div className="bg-background p-3 rounded font-mono text-xs overflow-x-auto">
                          RollNumber,StudentName,Subject1Name,Subject1Marks,Subject1Max,Subject2Name,Subject2Marks,Subject2Max,...,SGPA,CGPA,Grade,Status
                        </div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Roll numbers must be unique</li>
                          <li>• Subject data will be stored in JSON format</li>
                          <li>• Status should be PASS or FAIL</li>
                          <li>• Grade should be A, B, C, D, or F</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Processing CSV..." : "Upload CSV Result"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Training Results */}
        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Training Result (PDF)</CardTitle>
              <CardDescription>
                Upload a PDF file containing the industrial training assessment results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePdfSubmit} className="space-y-4">
                <input type="hidden" name="courseType" value="INDUSTRIAL_TRAINING" />
                
                <div className="space-y-2">
                  <Label htmlFor="training-title">Result Title *</Label>
                  <Input
                    id="training-title"
                    name="title"
                    placeholder="e.g., Python Full Stack - Jan 2024 Batch"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="training-course">Select Training *</Label>
                  <Select name="courseId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose training program" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainingCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="training-pdf">Upload PDF File *</Label>
                  <Input
                    id="training-pdf"
                    name="pdfFile"
                    type="file"
                    accept=".pdf"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum file size: 10MB
                  </p>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Uploading..." : "Upload Training Result"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <AlertCircle className="h-5 w-5" />
                Note
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-800">
                Training results are uploaded as PDF only. Students can view and download 
                the PDF from the public results page. A notice will be automatically created 
                when you upload the result.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
