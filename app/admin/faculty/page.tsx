import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FacultyList } from "@/components/faculty-list"
import { prisma } from "@/lib/prisma"
import { Plus, Users } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Faculty Management - Admin",
  description: "Manage faculty members and instructors",
}

export default async function AdminFacultyPage() {
  const allFaculty = await prisma.faculty.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      slug: true,
      name: true,
      designation: true,
      department: true,
      email: true,
      teachesDiploma: true,
      teachesTraining: true,
      isActive: true,
    },
  })

  const activeFaculty = allFaculty.filter((f) => f.isActive)
  const inactiveFaculty = allFaculty.filter((f) => !f.isActive)
  const diplomaFaculty = allFaculty.filter((f) => f.teachesDiploma)
  const trainingFaculty = allFaculty.filter((f) => f.teachesTraining)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Faculty Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage faculty members, instructors, and their teaching assignments
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/faculty/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Faculty Member
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Faculty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allFaculty.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Faculty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeFaculty.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Diploma Educators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{diplomaFaculty.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Training Instructors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingFaculty.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty List with Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Faculty Members
          </CardTitle>
          <CardDescription>
            View and manage all faculty members and instructors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">
                All ({allFaculty.length})
              </TabsTrigger>
              <TabsTrigger value="active">
                Active ({activeFaculty.length})
              </TabsTrigger>
              <TabsTrigger value="diploma">
                Diploma ({diplomaFaculty.length})
              </TabsTrigger>
              <TabsTrigger value="training">
                Training ({trainingFaculty.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <FacultyList faculty={allFaculty} />
            </TabsContent>

            <TabsContent value="active" className="mt-6">
              <FacultyList faculty={activeFaculty} />
            </TabsContent>

            <TabsContent value="diploma" className="mt-6">
              <FacultyList faculty={diplomaFaculty} />
            </TabsContent>

            <TabsContent value="training" className="mt-6">
              <FacultyList faculty={trainingFaculty} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
