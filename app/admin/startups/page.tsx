import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StartupList } from "@/components/startup-list"
import { ApplicationsClient, SerializedApplication } from "@/app/admin/applications/applications-client"
import { Building2, Rocket, Award, Plus, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Startups & Incubation - STEP Admin",
  description: "Manage incubated startups, companies, and incubation applications",
}

export default async function StartupsManagementPage() {
  const session = await auth()

  if (!session?.user || session.user.role === "CONTENT_EDITOR") {
    redirect("/admin")
  }

  let startups: any[] = []
  let incubationApplications: any[] = []

  try {
    const results = await Promise.all([
      prisma.startup.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.application.findMany({
        where: {
          OR: [
            { programType: "INCUBATION" },
            { programType: "BOTH" }
          ]
        },
        orderBy: { createdAt: "desc" }
      })
    ])
    startups = results[0]
    incubationApplications = results[1]
  } catch {
    startups = []
    incubationApplications = []
  }

  const companies = startups.filter((s) => s.type === "COMPANY")
  const startupsOnly = startups.filter((s) => s.type === "STARTUP")
  const graduated = startups.filter((s) => s.status === "GRADUATED")
  const pendingIncubation = incubationApplications.filter((a) => a.status === "PENDING")

  const serializedIncubationApps: SerializedApplication[] = incubationApplications.map((app) => ({
    id: app.id,
    firstName: app.firstName,
    lastName: app.lastName,
    email: app.email,
    phone: app.phone,
    qualification: app.qualification,
    institution: app.institution,
    programType: app.programType,
    specificProgram: app.specificProgram,
    experience: app.experience,
    motivation: app.motivation,
    status: app.status,
    adminNotes: app.adminNotes,
    createdAt: app.createdAt.toISOString(),
    updatedAt: app.updatedAt.toISOString(),
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Startups & Incubation Portal</h1>
          <p className="text-muted-foreground mt-1">
            Manage STEP incubated ventures, partner companies, and review incoming startup incubation applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/admin/applications">
              <FileText className="w-4 h-4 text-primary" />
              <span>Applications Portal</span>
            </Link>
          </Button>

          <Button asChild className="gap-2 font-semibold">
            <Link href="/admin/startups/new">
              <Plus className="w-4 h-4" /> Add Venture
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{startups.length}</div>
            <p className="text-xs text-muted-foreground">Registered ventures</p>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-blue-500/20 bg-blue-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">Incubating Startups</CardTitle>
            <Rocket className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{startupsOnly.length}</div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80">Active incubator cohort</p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partner Companies</CardTitle>
            <Building2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{companies.length}</div>
            <p className="text-xs text-muted-foreground">Established firms</p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduated</CardTitle>
            <Award className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{graduated.length}</div>
            <p className="text-xs text-muted-foreground">Successful alumni</p>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-amber-500/20 bg-amber-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-400">Incubation Submissions</CardTitle>
            <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{incubationApplications.length}</div>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/80">{pendingIncubation.length} pending review</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <TabsList className="bg-muted p-1">
            <TabsTrigger value="all" className="font-semibold text-xs">All Ventures ({startups.length})</TabsTrigger>
            <TabsTrigger value="startups" className="font-semibold text-xs">Startups ({startupsOnly.length})</TabsTrigger>
            <TabsTrigger value="companies" className="font-semibold text-xs">Companies ({companies.length})</TabsTrigger>
            <TabsTrigger value="graduated" className="font-semibold text-xs">Graduated ({graduated.length})</TabsTrigger>
            <TabsTrigger value="applications" className="font-bold text-xs gap-1.5 text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-3.5 h-3.5" />
              Incubation Applications ({incubationApplications.length})
            </TabsTrigger>
          </TabsList>

          <Link 
            href="/admin/applications" 
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 hidden sm:flex"
          >
            Open Full Applications Manager <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <TabsContent value="all" className="space-y-4 m-0">
          <StartupList startups={startups} />
        </TabsContent>

        <TabsContent value="startups" className="space-y-4 m-0">
          <StartupList startups={startupsOnly} />
        </TabsContent>

        <TabsContent value="companies" className="space-y-4 m-0">
          <StartupList startups={companies} />
        </TabsContent>

        <TabsContent value="graduated" className="space-y-4 m-0">
          <StartupList startups={graduated} />
        </TabsContent>

        <TabsContent value="applications" className="space-y-4 m-0">
          <div className="p-4 rounded-xl bg-card border shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-lg">Incoming Incubation Applications</h3>
                <p className="text-xs text-muted-foreground">Applications submitted by founders seeking incubation or seed funding support.</p>
              </div>
              <Button size="sm" variant="outline" asChild className="gap-1 text-xs">
                <Link href="/admin/applications">View All Submissions <ArrowRight className="w-3.5 h-3.5" /></Link>
              </Button>
            </div>

            <ApplicationsClient initialApplications={serializedIncubationApps} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
