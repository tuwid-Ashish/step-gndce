"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Download, ExternalLink } from "lucide-react"
import { getResultByRollNumber } from "@/app/actions/results"
import { toast } from "sonner"

interface ResultData {
  type: "PDF" | "DETAILED"
  title: string
  course: any
  pdfUrl?: string
  semester?: number
  rollNumber?: string
  studentName?: string
  grade?: string
  sgpa?: number
  cgpa?: number
  totalMarks?: number
  maxMarks?: number
  percentage?: number
  status?: string
  subjectData?: any
}

export function ResultsClient({ diplomaResults, trainingResults }: { diplomaResults: any[], trainingResults: any[] }) {
  const [result, setResult] = useState<ResultData | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedResultId, setSelectedResultId] = useState<string>("")
  const [resultType, setResultType] = useState<"diploma" | "training">("diploma")

  const handleDiplomaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    
    const formData = new FormData(e.currentTarget)
    const rollNumber = formData.get("rollNumber") as string
    const resultId = formData.get("resultId") as string

    if (!rollNumber || !resultId) {
      toast.error("Please fill all fields")
      setLoading(false)
      return
    }

    try {
      const response = await getResultByRollNumber(rollNumber, resultId)
      
      if (response.error) {
        toast.error(response.error)
      } else {
        setResult(response.result as ResultData)
      }
    } catch (error) {
      toast.error("Failed to fetch result")
    } finally {
      setLoading(false)
    }
  }

  const handleTrainingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    
    const formData = new FormData(e.currentTarget)
    const resultId = formData.get("resultId") as string

    if (!resultId) {
      toast.error("Please select a result")
      setLoading(false)
      return
    }

    try {
      const response = await getResultByRollNumber("", resultId)
      
      if (response.error) {
        toast.error(response.error)
      } else {
        setResult(response.result as ResultData)
      }
    } catch (error) {
      toast.error("Failed to fetch result")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Tabs value={resultType} onValueChange={(v) => setResultType(v as "diploma" | "training")} className="mb-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="diploma">Diploma Results</TabsTrigger>
          <TabsTrigger value="training">Training Results</TabsTrigger>
        </TabsList>

        {/* Diploma Results */}
        <TabsContent value="diploma">
          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Diploma Results
              </CardTitle>
              <CardDescription>
                Select course, semester and enter your roll number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDiplomaSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="diploma-result">Select Result *</Label>
                  <Select name="resultId" required onValueChange={setSelectedResultId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your result" />
                    </SelectTrigger>
                    <SelectContent>
                      {diplomaResults.length === 0 ? (
                        <SelectItem value="none" disabled>
                          No results available
                        </SelectItem>
                      ) : (
                        diplomaResults.map((res) => (
                          <SelectItem key={res.id} value={res.id}>
                            {res.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number *</Label>
                  <Input
                    id="rollNumber"
                    name="rollNumber"
                    placeholder="Enter your roll number"
                    required
                  />
                </div>

                <Button type="submit" disabled={loading || !selectedResultId} className="w-full">
                  {loading ? "Searching..." : "Check Result"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Results */}
        <TabsContent value="training">
          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Training Results
              </CardTitle>
              <CardDescription>
                Select your training program to view or download the result PDF
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrainingSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="training-result">Select Training Result *</Label>
                  <Select name="resultId" required onValueChange={setSelectedResultId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your training result" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainingResults.length === 0 ? (
                        <SelectItem value="none" disabled>
                          No results available
                        </SelectItem>
                      ) : (
                        trainingResults.map((res) => (
                          <SelectItem key={res.id} value={res.id}>
                            {res.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={loading || !selectedResultId} className="w-full">
                  {loading ? "Loading..." : "View Result PDF"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Result Display */}
      {result && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{result.title}</CardTitle>
            <CardDescription>
              {result.course?.title} {result.semester && `- Semester ${result.semester}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result.type === "PDF" ? (
              <div className="space-y-4">
                <div className="bg-muted/30 p-6 rounded-lg text-center space-y-4">
                  <FileText className="h-16 w-16 mx-auto text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Result PDF Available</h3>
                    <p className="text-sm text-muted-foreground">
                      Click below to view or download your result
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button asChild>
                      <a href={result.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in New Tab
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={result.pdfUrl} download>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Student Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Roll Number</p>
                    <p className="font-semibold">{result.rollNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Student Name</p>
                    <p className="font-semibold">{result.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Grade</p>
                    <p className="font-semibold text-lg">{result.grade}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className={`font-semibold ${result.status === "PASS" ? "text-green-600" : "text-red-600"}`}>
                      {result.status}
                    </p>
                  </div>
                </div>

                {/* Subject-wise Marks */}
                {result.subjectData && result.subjectData.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Subject-wise Performance</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 font-medium">Subject</th>
                            <th className="text-center p-3 font-medium">Marks Obtained</th>
                            <th className="text-center p-3 font-medium">Maximum Marks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.subjectData.map((subject: any, index: number) => (
                            <tr key={index} className="border-t">
                              <td className="p-3">{subject.name}</td>
                              <td className="p-3 text-center">{subject.obtained}</td>
                              <td className="p-3 text-center">{subject.max}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-muted font-semibold">
                          <tr>
                            <td className="p-3">Total</td>
                            <td className="p-3 text-center">{result.totalMarks}</td>
                            <td className="p-3 text-center">{result.maxMarks}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                {/* Performance Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {result.sgpa && (
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground">SGPA</p>
                        <p className="text-2xl font-bold">{result.sgpa.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  )}
                  {result.cgpa && (
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground">CGPA</p>
                        <p className="text-2xl font-bold">{result.cgpa.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  )}
                  {result.percentage && (
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground">Percentage</p>
                        <p className="text-2xl font-bold">{result.percentage.toFixed(2)}%</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
