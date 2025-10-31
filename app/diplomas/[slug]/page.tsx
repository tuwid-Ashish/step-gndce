import { Container } from "@/components/container"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, IndianRupee, GraduationCap, Download, FileText, User, CheckCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface DiplomaPageProps {
  params: Promise<{
    slug: string
  }>
}

// Mock diploma data
const mockDiploma = {
  slug: "full-stack-web-development",
  title: "Diploma in Full Stack Web Development",
  fee: "₹75,000",
  duration: "12 months",
  eligibility: "12th Pass or equivalent",
  description: "Master modern web development with comprehensive training in frontend and backend technologies. Build real-world projects and get placement assistance from our industry partners.",
  category: "Technology",
  highlights: [
    "100% Placement Assistance",
    "Industry-Standard Projects",
    "Expert Faculty",
    "Modern Curriculum"
  ],
  syllabus: [
    {
      module: "Frontend Development",
      topics: ["HTML5 & CSS3", "JavaScript ES6+", "React.js", "State Management", "Responsive Design"]
    },
    {
      module: "Backend Development", 
      topics: ["Node.js", "Express.js", "RESTful APIs", "Database Design", "Authentication"]
    },
    {
      module: "Database Technologies",
      topics: ["MongoDB", "MySQL", "Database Modeling", "Queries & Optimization", "Data Security"]
    },
    {
      module: "DevOps & Deployment",
      topics: ["Git & GitHub", "Docker", "AWS Basics", "CI/CD Pipelines", "Production Deployment"]
    }
  ],
  outcomes: [
    "Build complete web applications from scratch",
    "Design and implement RESTful APIs",
    "Work with modern JavaScript frameworks",
    "Deploy applications to cloud platforms",
    "Follow industry best practices and coding standards",
    "Collaborate effectively in development teams"
  ],
  faculty: {
    name: "Dr. Rajesh Kumar",
    title: "Program Director",
    experience: "15+ years in web development",
    email: "rajesh.kumar@step-institute.edu"
  }
}

export async function generateMetadata({ params }: DiplomaPageProps) {
  const { slug } = await params
  
  // TODO: Fetch diploma data based on slug
  if (slug !== "full-stack-web-development") {
    return {
      title: "Diploma Not Found"
    }
  }

  return {
    title: mockDiploma.title,
    description: mockDiploma.description
  }
}

export default async function DiplomaPage({ params }: DiplomaPageProps) {
  const { slug } = await params
  
  // TODO: Replace with actual API call
  if (slug !== "full-stack-web-development") {
    notFound()
  }

  const diploma = mockDiploma

  return (
    <div className="py-8">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: "Diplomas", href: "/diplomas" },
              { label: diploma.title }
            ]}
            className="mb-6"
          />

          {/* Hero Section */}
          <div className="bg-linear-to-br from-brand-50 to-brand-100 rounded-lg p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Badge className="mb-3">{diploma.category}</Badge>
                <h1 className="text-4xl font-bold mb-4">{diploma.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {diploma.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {diploma.highlights.map((highlight, index) => (
                    <Badge key={index} variant="outline">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Duration</div>
                          <div className="text-sm text-muted-foreground">{diploma.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <IndianRupee className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Fee</div>
                          <div className="text-sm text-muted-foreground">{diploma.fee}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Eligibility</div>
                          <div className="text-sm text-muted-foreground">{diploma.eligibility}</div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-6" size="lg" asChild>
                      <Link href={`/apply?program=${diploma.slug}`}>
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
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Program Overview</CardTitle>
                  <CardDescription>
                    Complete details about the diploma program
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p>
                      Our Full Stack Web Development diploma is designed to provide comprehensive training
                      in modern web technologies. You'll learn to build complete web applications from 
                      frontend to backend, including database design and cloud deployment.
                    </p>
                    <h3>What Makes This Program Special?</h3>
                    <ul>
                      <li>Industry-current curriculum updated every 6 months</li>
                      <li>Hands-on projects with real client requirements</li>
                      <li>Mentorship from working professionals</li>
                      <li>Job placement assistance with 90% success rate</li>
                      <li>Flexible learning options (weekend/evening batches)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="syllabus" className="space-y-6">
              <div className="grid gap-6">
                {diploma.syllabus.map((module, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">Module {index + 1}: {module.module}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="outcomes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Outcomes</CardTitle>
                  <CardDescription>
                    Skills and knowledge you'll gain upon completion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {diploma.outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="downloads" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Program Resources</CardTitle>
                  <CardDescription>
                    Download brochures, syllabus, and application forms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="flex items-center gap-3">
                        <Download className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">Program Brochure</div>
                          <div className="text-sm text-muted-foreground">Complete program details (PDF, 2.5 MB)</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">Detailed Syllabus</div>
                          <div className="text-sm text-muted-foreground">Module-wise curriculum (PDF, 1.8 MB)</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">Application Form</div>
                          <div className="text-sm text-muted-foreground">Admission application (PDF, 500 KB)</div>
                        </div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faculty" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Faculty In-Charge</CardTitle>
                  <CardDescription>
                    Meet the program director and lead instructor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{diploma.faculty.name}</h3>
                      <p className="text-muted-foreground mb-2">{diploma.faculty.title}</p>
                      <p className="text-sm mb-3">{diploma.faculty.experience}</p>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${diploma.faculty.email}`}>
                          Contact Faculty
                        </a>
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