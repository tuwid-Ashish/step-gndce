import { Container } from "@/components/container"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { prisma } from "@/lib/prisma"
import { 
  Mail, 
  Phone, 
  GraduationCap, 
  Award, 
  Briefcase, 
  CheckCircle,
  Linkedin
} from "lucide-react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

interface FacultyDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: FacultyDetailPageProps) {
  const { slug } = await params
  const faculty = await prisma.faculty.findUnique({
    where: { slug },
  })
  
  if (!faculty) {
    return {
      title: "Faculty Member Not Found"
    }
  }

  return {
    title: `${faculty.name} - ${faculty.designation} - STEP Institute`,
    description: faculty.bio || `${faculty.name}, ${faculty.designation} at STEP Institute. Specialization: ${faculty.specialization}`,
  }
}

export default async function FacultyDetailPage({ params }: FacultyDetailPageProps) {
  const { slug } = await params
  const faculty = await prisma.faculty.findUnique({
    where: { slug },
  })
  
  if (!faculty || !faculty.isActive) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Faculty", href: "/faculty" },
    { label: faculty.name, href: `/faculty/${slug}` }
  ]

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="bg-linear-to-br from-brand-50 to-brand-100 dark:from-brand-950 dark:to-brand-900 rounded-lg p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Photo and Basic Info */}
              <div className="flex flex-col items-center text-center">
                {faculty.photoUrl ? (
                  <Image
                  src={faculty.photoUrl}
                  alt={faculty.name}
                  width={192}
                  height={192}
                  className="rounded-full object-cover mb-4 border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-full bg-linear-to-br from-primary to-brand-600 flex items-center justify-center text-white text-4xl font-bold mb-4 border-4 border-white shadow-lg">
                    {faculty.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                )}
                
                <h1 className="text-3xl font-bold mb-2">{faculty.name}</h1>
                <p className="text-lg text-primary font-semibold mb-2">{faculty.designation}</p>
                <p className="text-muted-foreground mb-4">{faculty.department}</p>

                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {faculty.teachesDiploma && (
                    <Badge variant="default" className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      Diploma Educator
                    </Badge>
                  )}
                  {faculty.teachesTraining && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      Training Instructor
                    </Badge>
                  )}
                </div>

                <div className="flex gap-3 w-full">
                  <Button className="flex-1" asChild>
                    <a href={`mailto:${faculty.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                  </Button>
                  {faculty.linkedIn && (
                    <Button variant="outline" asChild>
                      <a href={faculty.linkedIn} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* About Section */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                {faculty.bio ? (
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {faculty.bio}
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">
                    Biography coming soon...
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {faculty.specialization && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-primary mt-1 shrink-0" />
                          <div>
                            <h3 className="font-semibold mb-1">Specialization</h3>
                            <p className="text-sm text-muted-foreground">{faculty.specialization}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {faculty.experience && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <Briefcase className="h-5 w-5 text-primary mt-1 shrink-0" />
                          <div>
                            <h3 className="font-semibold mb-1">Experience</h3>
                            <p className="text-sm text-muted-foreground">{faculty.experience}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {faculty.phone && (
                  <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{faculty.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs for Additional Information */}
          <Tabs defaultValue="qualifications" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="programs">Teaching Programs</TabsTrigger>
              <TabsTrigger value="expertise">Areas of Expertise</TabsTrigger>
            </TabsList>

            <TabsContent value="qualifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Educational Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {faculty.qualifications && faculty.qualifications.length > 0 ? (
                    <ul className="space-y-3">
                      {faculty.qualifications.map((qual, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Qualification details coming soon...
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="programs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Teaching Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faculty.teachesDiploma && (
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          Diploma Programs
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Teaches comprehensive year-long diploma courses in {faculty.department}.
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/diplomas">View All Diplomas</Link>
                        </Button>
                      </div>
                    )}

                    {faculty.teachesTraining && (
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-primary" />
                          Industrial Training Programs
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Conducts intensive 6-week and 6-month industrial training programs.
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/industrial-trainings">View All Trainings</Link>
                        </Button>
                      </div>
                    )}

                    {!faculty.teachesDiploma && !faculty.teachesTraining && (
                      <p className="text-muted-foreground italic">
                        Teaching program details coming soon...
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expertise" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Areas of Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {faculty.specialization ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        {faculty.specialization}
                      </p>
                      
                      <div className="mt-6 p-4 bg-brand-50 dark:bg-brand-950 rounded-lg">
                        <h4 className="text-sm font-semibold mb-2">Department</h4>
                        <p className="text-sm text-muted-foreground">{faculty.department}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Expertise details coming soon...
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  )
}