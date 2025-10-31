"use client"

import { useState } from "react"
import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResultCard } from "@/components/result-card"
import { Search } from "lucide-react"
import { ResultEntry } from "@/types/result"

export default function ResultsPage() {
  const [result, setResult] = useState<ResultEntry | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    // TODO: Replace with actual API call
    setTimeout(() => {
      // Mock result data
      const mockResult: ResultEntry = {
        examCode: "STEP-2024-01",
        rollNo: "ST2024001",
        student: "John Doe",
        subjects: [
          { name: "Web Development", marks: 85, maxMarks: 100 },
          { name: "Database Management", marks: 78, maxMarks: 100 },
          { name: "Project Work", marks: 92, maxMarks: 100 }
        ],
        total: 255,
        maxTotal: 300,
        pass: true,
        percentage: 85,
        grade: "A",
        rank: 12
      }
      setResult(mockResult)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Check Results</h1>
            <p className="text-xl text-muted-foreground">
              Enter your details below to check your examination results
            </p>
          </div>

          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Results
              </CardTitle>
              <CardDescription>
                Please provide your exam details to view results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="exam">Select Exam</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="step-2024-01">STEP Training Assessment - Jan 2024</SelectItem>
                      <SelectItem value="step-2024-02">STEP Training Assessment - Mar 2024</SelectItem>
                      <SelectItem value="step-2024-03">STEP Training Assessment - Jun 2024</SelectItem>
                      <SelectItem value="step-2024-04">STEP Training Assessment - Sep 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rollno">Roll Number</Label>
                  <Input
                    id="rollno"
                    placeholder="Enter your roll number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth (Optional)</Label>
                  <Input
                    id="dob"
                    type="date"
                    placeholder="DD/MM/YYYY"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Searching..." : "Check Results"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Result Display */}
          {result && (
            <div className="flex justify-center">
              <ResultCard result={result} />
            </div>
          )}

          {/* Instructions */}
          <div className="bg-muted/30 rounded-lg p-6 mt-8">
            <h2 className="text-lg font-semibold mb-4">Instructions</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Enter your roll number exactly as provided during registration</li>
              <li>• Date of birth is optional but may be required for verification</li>
              <li>• Results are typically available within 15 days of exam completion</li>
              <li>• Contact our support team if you face any issues accessing results</li>
              <li>• Download and save your result for future reference</li>
            </ul>
          </div>

          {/* TODO: Add more sections */}
          <div className="bg-brand-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Result download as PDF</li>
              <li>• Result verification QR codes</li>
              <li>• Semester-wise result history</li>
              <li>• Grade statistics and class rank</li>
              <li>• SMS and email result notifications</li>
              <li>• Revaluation request system</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}