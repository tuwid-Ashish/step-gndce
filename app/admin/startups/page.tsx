import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StartupList } from "@/components/startup-list"
import { Building2, Rocket, Award } from "lucide-react"
import Link from "next/link"

export default async function StartupsManagementPage() {
  const session = await auth()

  if (!session?.user || session.user.role === "CONTENT_EDITOR") {
    redirect("/admin")
  }

  const startups = await prisma.startup.findMany({
    orderBy: { createdAt: "desc" },
  })

  const companies = startups.filter((s) => s.type === "COMPANY")
  const startupsOnly = startups.filter((s) => s.type === "STARTUP")
  const graduated = startups.filter((s) => s.status === "GRADUATED")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Startups & Companies</h1>
          <p className="text-muted-foreground">
            Manage incubated startups and established companies
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/startups/new">Add Startup/Company</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ventures</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{startups.length}</div>
            <p className="text-xs text-muted-foreground">
              {startupsOnly.length} startups, {companies.length} companies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Startups</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {startupsOnly.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduated</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {graduated.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({startups.length})</TabsTrigger>
          <TabsTrigger value="startups">Startups ({startupsOnly.length})</TabsTrigger>
          <TabsTrigger value="companies">Companies ({companies.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <StartupList startups={startups} />
        </TabsContent>

        <TabsContent value="startups" className="space-y-4">
          <StartupList startups={startupsOnly} />
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <StartupList startups={companies} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
