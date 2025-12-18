import { Container } from "@/components/container"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { FacultyCard } from "@/components/faculty-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { prisma } from "@/lib/prisma"
import { Users, GraduationCap, Briefcase } from "lucide-react"

export const metadata = {
  title: "Faculty & Staff - STEP Institute",
  description: "Meet our experienced faculty members - diploma educators and industrial training instructors at STEP Institute.",
}

export default async function FacultyPage() {
  // Fetch all active faculty
  const allFaculty = await prisma.faculty.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  })

  // Filter by type
  const diplomaFaculty = allFaculty.filter((f) => f.teachesDiploma && !f.teachesTraining)
  const trainingFaculty = allFaculty.filter((f) => f.teachesTraining && !f.teachesDiploma)
  const bothFaculty = allFaculty.filter((f) => f.teachesDiploma && f.teachesTraining)

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Faculty & Staff", href: "/faculty" },
  ]

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Faculty & Staff</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet our dedicated team of experienced educators and industry experts who are committed to shaping the future of our students.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-linear-to-br from-brand-50 to-brand-100 dark:from-brand-950 dark:to-brand-900 rounded-lg p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-brand-600 dark:text-brand-400" />
              <div className="text-3xl font-bold mb-1">{allFaculty.length}</div>
              <div className="text-sm text-muted-foreground">Total Faculty</div>
            </div>
            <div className="bg-linear-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 rounded-lg p-6 text-center">
              <GraduationCap className="h-12 w-12 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
              <div className="text-3xl font-bold mb-1">{diplomaFaculty.length + bothFaculty.length}</div>
              <div className="text-sm text-muted-foreground">Diploma Educators</div>
            </div>
            <div className="bg-linear-to-br from-orange-50 to-amber-100 dark:from-orange-950 dark:to-amber-900 rounded-lg p-6 text-center">
              <Briefcase className="h-12 w-12 mx-auto mb-3 text-orange-600 dark:text-orange-400" />
              <div className="text-3xl font-bold mb-1">{trainingFaculty.length + bothFaculty.length}</div>
              <div className="text-sm text-muted-foreground">Training Instructors</div>
            </div>
          </div>

          {/* Faculty Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="all">
                All Faculty ({allFaculty.length})
              </TabsTrigger>
              <TabsTrigger value="diploma">
                Diploma ({diplomaFaculty.length + bothFaculty.length})
              </TabsTrigger>
              <TabsTrigger value="training">
                Training ({trainingFaculty.length + bothFaculty.length})
              </TabsTrigger>
              <TabsTrigger value="both">
                Both ({bothFaculty.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {allFaculty.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No faculty members found.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allFaculty.map((faculty) => (
                    <FacultyCard
                      key={faculty.id}
                      slug={faculty.slug}
                      name={faculty.name}
                      title={faculty.designation}
                      dept={faculty.department}
                      specialization={faculty.specialization || ""}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="diploma" className="space-y-6">
              {diplomaFaculty.length + bothFaculty.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No diploma faculty found.
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Diploma Educators</h2>
                    <p className="text-muted-foreground">
                      Our diploma faculty members provide comprehensive education in year-long diploma programs.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...bothFaculty, ...diplomaFaculty].map((faculty) => (
                      <FacultyCard
                        key={faculty.id}
                        slug={faculty.slug}
                        name={faculty.name}
                        title={faculty.designation}
                        dept={faculty.department}
                        specialization={faculty.specialization || ""}
                      />
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="training" className="space-y-6">
              {trainingFaculty.length + bothFaculty.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No training instructors found.
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Training Instructors</h2>
                    <p className="text-muted-foreground">
                      Our training instructors deliver intensive industrial training programs focused on practical skills.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...bothFaculty, ...trainingFaculty].map((faculty) => (
                      <FacultyCard
                        key={faculty.id}
                        slug={faculty.slug}
                        name={faculty.name}
                        title={faculty.designation}
                        dept={faculty.department}
                        specialization={faculty.specialization || ""}
                      />
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="both" className="space-y-6">
              {bothFaculty.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No faculty members teaching both diploma and training.
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Dual Role Faculty</h2>
                    <p className="text-muted-foreground">
                      These faculty members teach both diploma courses and industrial training programs, bringing comprehensive expertise.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bothFaculty.map((faculty) => (
                      <FacultyCard
                        key={faculty.id}
                        slug={faculty.slug}
                        name={faculty.name}
                        title={faculty.designation}
                        dept={faculty.department}
                        specialization={faculty.specialization || ""}
                      />
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  )
}