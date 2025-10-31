import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, GraduationCap, Rocket, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Apply Now",
  description: "Apply for training programs or startup incubation at STEP Institute"
}

export default function ApplyPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Apply to STEP Institute</h1>
            <p className="text-xl text-muted-foreground">
              Take the first step towards your career growth or entrepreneurial journey
            </p>
          </div>

          {/* Program Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Training Programs</CardTitle>
                <CardDescription>
                  Skill development programs in technology and professional domains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    6-8 months duration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Industry-relevant curriculum
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Placement assistance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Certification provided
                  </li>
                </ul>
                <Button className="w-full">Apply for Training</Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Rocket className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Startup Incubation</CardTitle>
                <CardDescription>
                  Comprehensive support for your startup idea and business development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    12 months incubation period
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Funding up to ₹10 lakhs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Mentorship & networking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Office space provided
                  </li>
                </ul>
                <Button className="w-full">Apply for Incubation</Button>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Application Form
              </CardTitle>
              <CardDescription>
                Please fill out all required fields to submit your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="Enter your first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Enter your last name" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                    </div>
                  </div>
                </div>

                {/* Educational Background */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Educational Background</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="qualification">Highest Qualification *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10th">10th Grade</SelectItem>
                          <SelectItem value="12th">12th Grade</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="institution">Institution Name</Label>
                      <Input id="institution" placeholder="Enter institution name" />
                    </div>
                  </div>
                </div>

                {/* Program Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Program Selection</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="programType">Program Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select program type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="training">Training Program</SelectItem>
                          <SelectItem value="incubation">Startup Incubation</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="program">Specific Program</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specific program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fullstack">Full Stack Development</SelectItem>
                          <SelectItem value="datascience">Data Science & AI</SelectItem>
                          <SelectItem value="mobile">Mobile App Development</SelectItem>
                          <SelectItem value="cyber">Cybersecurity</SelectItem>
                          <SelectItem value="pre-incubation">Pre-Incubation</SelectItem>
                          <SelectItem value="incubation">Full Incubation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Prior Experience (if any)</Label>
                    <Textarea 
                      id="experience" 
                      placeholder="Describe your relevant experience, projects, or skills"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motivation">Why do you want to join STEP Institute?</Label>
                    <Textarea 
                      id="motivation" 
                      placeholder="Tell us about your goals and how this program will help you achieve them"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="bg-muted/30 rounded-lg p-6 mt-8">
            <h2 className="text-lg font-semibold mb-4">What Happens Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                <h3 className="font-medium mb-1">Application Review</h3>
                <p className="text-muted-foreground">We'll review your application within 3-5 business days</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                <h3 className="font-medium mb-1">Interview Process</h3>
                <p className="text-muted-foreground">Qualified candidates will be invited for an interview</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                <h3 className="font-medium mb-1">Final Decision</h3>
                <p className="text-muted-foreground">You'll receive our final decision within 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}