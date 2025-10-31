import { Container } from "@/components/container"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Calendar, Users, BookOpen, Award, ExternalLink } from "lucide-react"
import { notFound } from "next/navigation"

// Mock faculty data
const mockFacultyData: Record<string, any> = {
  "dr-rajesh-kumar": {
    name: "Dr. Rajesh Kumar",
    title: "Program Director & Associate Professor",
    dept: "Computer Science",
    email: "rajesh.kumar@step-institute.edu",
    phone: "+91 9876543210",
    office: "Room 301, CS Block",
    specialization: "Web Development, Software Engineering, Database Systems",
    bio: "Dr. Rajesh Kumar is an experienced educator and researcher with over 15 years in computer science education. He holds a Ph.D. in Computer Science from IIT Delhi and has published numerous papers in international journals. He specializes in web technologies, software engineering practices, and database management systems.",
    education: [
      { degree: "Ph.D. in Computer Science", institution: "IIT Delhi", year: "2008" },
      { degree: "M.Tech in Software Engineering", institution: "NIT Warangal", year: "2004" },
      { degree: "B.Tech in Computer Science", institution: "RVCE Bangalore", year: "2002" }
    ],
    experience: [
      { role: "Program Director & Associate Professor", org: "STEP Institute", period: "2018 - Present" },
      { role: "Assistant Professor", org: "STEP Institute", period: "2012 - 2018" },
      { role: "Software Engineer", org: "Infosys Limited", period: "2008 - 2012" },
      { role: "Junior Developer", org: "TCS", period: "2002 - 2008" }
    ],
    courses: [
      "Web Development Fundamentals",
      "Advanced JavaScript & Frameworks",
      "Database Management Systems",
      "Software Engineering Principles",
      "Full Stack Development"
    ],
    achievements: [
      "Best Faculty Award 2022",
      "Published 25+ research papers",
      "Industry Consultant for 5+ companies",
      "Mentored 200+ successful graduates"
    ],
    publications: [
      "Modern Web Development Practices (2023)",
      "Database Optimization Techniques (2022)",
      "Software Engineering in Practice (2021)"
    ]
  },
  "prof-priya-sharma": {
    name: "Prof. Priya Sharma",
    title: "Assistant Professor",
    dept: "Data Science",
    email: "priya.sharma@step-institute.edu",
    phone: "+91 9876543211",
    office: "Room 205, DS Block",
    specialization: "Machine Learning, Data Analytics, Python Programming",
    bio: "Prof. Priya Sharma is a passionate educator and researcher in the field of data science. She holds an M.Tech in Data Science and has extensive experience in machine learning, data analytics, and Python programming. She is known for her innovative teaching methods and industry-relevant curriculum design.",
    education: [
      { degree: "M.Tech in Data Science", institution: "IIIT Hyderabad", year: "2015" },
      { degree: "B.Tech in Information Technology", institution: "VIT Vellore", year: "2013" }
    ],
    experience: [
      { role: "Assistant Professor", org: "STEP Institute", period: "2019 - Present" },
      { role: "Data Scientist", org: "Analytics Corp", period: "2015 - 2019" },
      { role: "Junior Data Analyst", org: "DataTech Solutions", period: "2013 - 2015" }
    ],
    courses: [
      "Introduction to Data Science",
      "Machine Learning Fundamentals",
      "Python for Data Analysis",
      "Statistical Analytics",
      "Data Visualization"
    ],
    achievements: [
      "Excellence in Teaching Award 2023",
      "Led 10+ industry projects",
      "Kaggle Competition Winner",
      "Mentored 150+ students"
    ],
    publications: [
      "Machine Learning Applications in Business (2023)",
      "Data Analytics Best Practices (2022)"
    ]
  }
}

interface FacultyDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: FacultyDetailPageProps) {
  const faculty = mockFacultyData[params.slug]
  
  if (!faculty) {
    return {
      title: "Faculty Not Found"
    }
  }

  return {
    title: `${faculty.name} - ${faculty.title}`,
    description: `Learn about ${faculty.name}, ${faculty.title} at STEP Institute. Specializing in ${faculty.specialization}.`
  }
}

export default function FacultyDetailPage({ params }: FacultyDetailPageProps) {
  const faculty = mockFacultyData[params.slug]
  
  if (!faculty) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Faculty", href: "/faculty" },
    { label: faculty.name, href: `/faculty/${params.slug}` }
  ]

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          
          {/* Hero Section */}
          <div className="bg-linear-to-r from-primary/10 to-brand-600/10 rounded-lg p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="w-32 h-32 bg-linear-to-br from-primary to-brand-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {faculty.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{faculty.name}</h1>
                <p className="text-xl text-primary font-semibold mb-2">{faculty.title}</p>
                <Badge variant="outline" className="mb-4">{faculty.dept}</Badge>
                <p className="text-muted-foreground mb-4">{faculty.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${faculty.email}`} className="hover:text-primary">
                      {faculty.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{faculty.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{faculty.office}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Faculty
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Specializations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {faculty.specialization.split(', ').map((spec: string, index: number) => (
                        <Badge key={index} variant="secondary">{spec}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Key Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {faculty.achievements.map((achievement: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Educational Background</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faculty.education.map((edu: any, index: number) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faculty.experience.map((exp: any, index: number) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <h3 className="font-semibold">{exp.role}</h3>
                        <p className="text-muted-foreground">{exp.org}</p>
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Courses Taught</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {faculty.courses.map((course: string, index: number) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{course}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="research" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publications & Research</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faculty.publications.map((pub: string, index: number) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <span className="font-medium">{pub}</span>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Contact Card */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Office Hours</h3>
                  <p className="text-muted-foreground mb-4">
                    Monday - Friday: 10:00 AM - 4:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Schedule appointments in advance for personalized guidance and academic support.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Consultation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  )
}