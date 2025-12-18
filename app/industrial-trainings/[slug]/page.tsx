import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Briefcase, 
  Clock, 
  FileCheck, 
  BookOpen, 
  ExternalLink,
  ArrowLeft,
  Download,
  FileText,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const course = await prisma.course.findFirst({
    where: { slug, type: "INDUSTRIAL_TRAINING" }
  })

  if (!course) {
    return {
      title: "Training Not Found"
    }
  }

  return {
    title: `${course.title} | STEP-GNDEC`,
    description: course.description || `Learn more about ${course.title}`
  }
}

export default async function TrainingDetailPage({ params }: PageProps) {
  const { slug } = await params
  const course = await prisma.course.findFirst({
    where: {
      slug,
      type: "INDUSTRIAL_TRAINING",
      isActive: true
    }
  })

  if (!course) {
    notFound()
  }

  return (
    <div className="py-8">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link href="/industrial-trainings" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Industrial Trainings
              </Link>
            </Button>
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950 dark:to-amber-900 rounded-lg p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Badge className="mb-3">{course.code}</Badge>
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {course.description}
                </p>
                {course.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {course.highlights.slice(0, 4).map((highlight, index) => (
                      <Badge key={index} variant="outline">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Duration</div>
                          <div className="text-sm text-muted-foreground">{course.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Eligibility</div>
                          <div className="text-sm text-muted-foreground">{course.eligibility || "Open for all"}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileCheck className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Program Type</div>
                          <div className="text-sm text-muted-foreground">Industrial Training</div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-6" size="lg" asChild>
                      <Link href={`/apply?program=${course.slug}`}>
                        Apply Now
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Overview</CardTitle>
                  <CardDescription>
                    Complete details about this industrial training program
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p>
                      {course.description || `This intensive training program provides hands-on experience and practical skills in ${course.title.toLowerCase()}.`}
                    </p>
                    <h3>Training Benefits</h3>
                    <ul>
                      <li>Practical hands-on training with real projects</li>
                      <li>Industry-relevant skills and tools</li>
                      <li>Expert instructors from the field</li>
                      <li>Certificate of completion</li>
                      <li>Flexible schedule options</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Topics Covered</CardTitle>
                  <CardDescription>
                    Key topics and skills you'll learn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {course.highlights.length > 0 ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      {course.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Detailed topics will be shared upon enrollment.</p>
                  )}
                  
                  {course.syllabusUrl && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-medium mb-3">Download Complete Training Plan</h4>
                      <Button asChild>
                        <a
                          href={course.syllabusUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download Syllabus PDF
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="downloads" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Resources</CardTitle>
                  <CardDescription>
                    Download training plan and application forms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {course.syllabusUrl && (
                      <Button variant="outline" className="justify-start h-auto p-4" asChild>
                        <a href={course.syllabusUrl} target="_blank" rel="noopener noreferrer">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">Training Syllabus</div>
                              <div className="text-sm text-muted-foreground">Complete training plan and schedule</div>
                            </div>
                          </div>
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" className="justify-start h-auto p-4" asChild>
                      <Link href="/apply">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5" />
                          <div className="text-left">
                            <div className="font-medium">Registration Form</div>
                            <div className="text-sm text-muted-foreground">Register for this training online</div>
                          </div>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4" asChild>
                      <Link href="/contact">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5" />
                          <div className="text-left">
                            <div className="font-medium">Training Brochure</div>
                            <div className="text-sm text-muted-foreground">Contact us for detailed information</div>
                          </div>
                        </div>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get More Information</CardTitle>
                  <CardDescription>
                    Have questions about this training program?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Our training coordinators are available to help you with program details, 
                      registration, and any questions you may have.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button size="lg" asChild>
                        <Link href="/contact">
                          Contact Training Cell
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href="/apply">
                          Register Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  )
}
