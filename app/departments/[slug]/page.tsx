import { Container } from "@/components/container"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FacultyCard } from "@/components/faculty-card"
import { Users, BookOpen, Award, Target, Mail, Phone, MapPin } from "lucide-react"
import { notFound } from "next/navigation"

// Type definitions
interface HeadOfDepartment {
  name: string
  email: string
  phone: string
  office: string
}

interface Program {
  name: string
  duration: string
  students: number
}

interface FacultyMember {
  slug: string
  name: string
  title: string
  dept: string
  specialization: string
}

interface Laboratory {
  name: string
  capacity: string
  equipment: string
}

interface DepartmentData {
  name: string
  shortName: string
  description: string
  established: string
  headOfDepartment: HeadOfDepartment
  programs: Program[]
  faculty: FacultyMember[]
  facilities: string[]
  achievements: string[]
  laboratories: Laboratory[]
}

// Mock departments data
const mockDepartmentsData: Record<string, DepartmentData> = {
  "computer-science": {
    name: "Computer Science & Engineering",
    shortName: "CSE",
    description: "Leading department in computer science education, focusing on cutting-edge technologies and industry-relevant skills.",
    established: "2015",
    headOfDepartment: {
      name: "Dr. Rajesh Kumar",
      email: "hod.cse@step-institute.edu",
      phone: "+91 9876543210",
      office: "Room 301, CS Block"
    },
    programs: [
      { name: "Diploma in Web Development", duration: "12 months", students: 45 },
      { name: "Diploma in Software Engineering", duration: "18 months", students: 38 },
      { name: "Diploma in Mobile App Development", duration: "10 months", students: 32 }
    ],
    faculty: [
      {
        slug: "dr-rajesh-kumar",
        name: "Dr. Rajesh Kumar",
        title: "Head of Department & Professor",
        dept: "Computer Science",
        specialization: "Web Development, Software Engineering"
      },
      {
        slug: "ms-kavita-reddy",
        name: "Ms. Kavita Reddy", 
        title: "Assistant Professor",
        dept: "Computer Science",
        specialization: "Mobile Development, React Native"
      }
    ],
    facilities: [
      "Advanced Computer Labs with latest hardware",
      "Software Development Studio",
      "Project Collaboration Spaces",
      "Industry-standard Development Tools",
      "Cloud Computing Infrastructure"
    ],
    achievements: [
      "95% placement rate in top IT companies",
      "50+ student projects deployed in production",
      "Industry partnerships with Google, Microsoft, Amazon",
      "Winner of State-level Coding Competition 2023"
    ],
    laboratories: [
      { name: "Programming Lab", capacity: "40 students", equipment: "Latest PCs, IDEs, Development Tools" },
      { name: "Web Development Lab", capacity: "35 students", equipment: "Modern Workstations, Server Setup" },
      { name: "Mobile Development Lab", capacity: "30 students", equipment: "Testing Devices, Emulators" }
    ]
  },
  "data-science": {
    name: "Data Science & Analytics",
    shortName: "DSA",
    description: "Innovative department specializing in data science, machine learning, and business analytics.",
    established: "2018",
    headOfDepartment: {
      name: "Prof. Priya Sharma",
      email: "hod.dsa@step-institute.edu", 
      phone: "+91 9876543211",
      office: "Room 205, DS Block"
    },
    programs: [
      { name: "Diploma in Data Science", duration: "15 months", students: 42 },
      { name: "Diploma in Business Analytics", duration: "12 months", students: 35 },
      { name: "Diploma in Machine Learning", duration: "14 months", students: 28 }
    ],
    faculty: [
      {
        slug: "prof-priya-sharma",
        name: "Prof. Priya Sharma",
        title: "Head of Department & Assistant Professor",
        dept: "Data Science",
        specialization: "Machine Learning, Data Analytics"
      }
    ],
    facilities: [
      "High-Performance Computing Cluster",
      "Big Data Analytics Lab",
      "Statistical Analysis Software",
      "Machine Learning Platforms",
      "Data Visualization Studios"
    ],
    achievements: [
      "90% placement rate in analytics roles",
      "Published 15+ research papers",
      "Kaggle competition winners",
      "Industry projects worth ₹50L+"
    ],
    laboratories: [
      { name: "Data Analytics Lab", capacity: "35 students", equipment: "High-end Workstations, Analytics Software" },
      { name: "Machine Learning Lab", capacity: "30 students", equipment: "GPU Clusters, ML Frameworks" },
      { name: "Big Data Lab", capacity: "25 students", equipment: "Distributed Computing Setup" }
    ]
  },
  "digital-marketing": {
    name: "Digital Marketing & E-Commerce",
    shortName: "DME",
    description: "Dynamic department focusing on modern digital marketing strategies and e-commerce solutions.",
    established: "2017",
    headOfDepartment: {
      name: "Mr. Arjun Singh",
      email: "hod.dme@step-institute.edu",
      phone: "+91 9876543212",
      office: "Room 105, Marketing Block"
    },
    programs: [
      { name: "Diploma in Digital Marketing", duration: "10 months", students: 55 },
      { name: "Diploma in E-Commerce Management", duration: "12 months", students: 40 },
      { name: "Diploma in Social Media Marketing", duration: "8 months", students: 48 }
    ],
    faculty: [
      {
        slug: "mr-arjun-singh",
        name: "Mr. Arjun Singh",
        title: "Head of Department & Senior Instructor",
        dept: "Digital Marketing",
        specialization: "SEO, Social Media Marketing"
      }
    ],
    facilities: [
      "Digital Marketing Studio",
      "Content Creation Labs",
      "Analytics & Campaign Management Tools",
      "E-Commerce Platform Sandbox",
      "Social Media Command Center"
    ],
    achievements: [
      "85% placement in marketing agencies",
      "Managed campaigns worth ₹1Cr+",
      "Google Partner Program certification",
      "Best Digital Campaign Award 2023"
    ],
    laboratories: [
      { name: "Digital Marketing Lab", capacity: "45 students", equipment: "Marketing Tools, Analytics Platforms" },
      { name: "Content Studio", capacity: "30 students", equipment: "Video/Photo Equipment, Editing Suites" },
      { name: "E-Commerce Lab", capacity: "35 students", equipment: "Platform Setups, Payment Gateways" }
    ]
  }
}

interface DepartmentPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: DepartmentPageProps) {
  const { slug } = await params
  const department = mockDepartmentsData[slug]
  
  if (!department) {
    return {
      title: "Department Not Found"
    }
  }

  return {
    title: `${department.name} - Department`,
    description: `Learn about the ${department.name} department at STEP Institute. ${department.description}`
  }
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = await params
  const department = mockDepartmentsData[slug]
  
  if (!department) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Departments", href: "/departments" },
    { label: department.shortName, href: `/departments/${slug}` }
  ]

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          
          {/* Hero Section */}
          <div className="bg-linear-to-r from-primary/10 to-brand-600/10 rounded-lg p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="w-24 h-24 bg-linear-to-br from-primary to-brand-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                {department.shortName}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{department.name}</h1>
                <p className="text-muted-foreground mb-4">{department.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <Badge variant="outline">Established {department.established}</Badge>
                  <Badge variant="outline">{department.programs.length} Programs</Badge>
                  <Badge variant="outline">{department.faculty.length} Faculty Members</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Head of Department */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Head of Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-20 h-20 bg-linear-to-br from-primary to-brand-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {department.headOfDepartment.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{department.headOfDepartment.name}</h3>
                  <p className="text-primary font-medium mb-3">Head of Department</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${department.headOfDepartment.email}`} className="hover:text-primary">
                        {department.headOfDepartment.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{department.headOfDepartment.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{department.headOfDepartment.office}</span>
                    </div>
                  </div>
                </div>
                <Button>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact HOD
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Department Information Tabs */}
          <Tabs defaultValue="programs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="labs">Laboratories</TabsTrigger>
            </TabsList>

            <TabsContent value="programs" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Academic Programs</h2>
                <p className="text-muted-foreground">Comprehensive diploma programs designed for industry readiness</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {department.programs.map((program: Program, index: number) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{program.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Current Students:</span>
                          <span className="font-medium">{program.students}</span>
                        </div>
                        <Button className="w-full" variant="outline">
                          <BookOpen className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faculty" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Faculty Members</h2>
                <p className="text-muted-foreground">Meet our experienced educators and industry experts</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {department.faculty.map((faculty: FacultyMember, index: number) => (
                  <FacultyCard key={index} {...faculty} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="facilities" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Department Facilities</h2>
                <p className="text-muted-foreground">State-of-the-art infrastructure supporting quality education</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {department.facilities.map((facility: string, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Target className="h-5 w-5 text-primary mt-1 shrink-0" />
                        <span>{facility}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Department Achievements</h2>
                <p className="text-muted-foreground">Recognition and milestones that define our excellence</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {department.achievements.map((achievement: string, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-primary mt-1 shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="labs" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Laboratory Facilities</h2>
                <p className="text-muted-foreground">Hands-on learning environments with modern equipment</p>
              </div>
              
              <div className="space-y-4">
                {department.laboratories.map((lab: Laboratory, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{lab.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Capacity:</span>
                          <p className="font-medium">{lab.capacity}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Equipment:</span>
                          <p className="font-medium">{lab.equipment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Contact Department */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Contact Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Department Office</h3>
                  <p className="text-muted-foreground mb-4">
                    Visit our department office for academic guidance, course information, and administrative support.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Office Hours: Monday - Friday, 9:00 AM - 5:00 PM
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Department
                  </Button>
                  <Button variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Schedule Visit
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