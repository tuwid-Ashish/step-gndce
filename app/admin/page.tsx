import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Building2, BookOpen, LogOut, Shield, CalendarDays, GraduationCap, MessageSquare } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Admin Dashboard",
  description: "STEP Institute administration dashboard"
}

export default async function AdminDashboard() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const { user } = session
  
  // Fetch real counts from database
  let noticesCount = 0, blogsCount = 0, startupsCount = 0, eventsCount = 0, coursesCount = 0, facultyCount = 0, applicationsCount = 0, pendingAppsCount = 0, contactCount = 0, unreadContactCount = 0

  try {
    const results = await Promise.all([
      prisma.notice.count(),
      prisma.blog.count({ where: { isPublished: true } }),
      prisma.startup.count({ where: { isActive: true } }),
      prisma.event.count(),
      prisma.course.count({ where: { isActive: true } }),
      prisma.faculty.count({ where: { isActive: true } }),
      prisma.application.count(),
      prisma.application.count({ where: { status: "PENDING" } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: "UNREAD" } })
    ])
    ;[noticesCount, blogsCount, startupsCount, eventsCount, coursesCount, facultyCount, applicationsCount, pendingAppsCount, contactCount, unreadContactCount] = results
  } catch {
    // default 0
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name} • <Badge variant="secondary"><Shield className="mr-1 h-3 w-3" />{user.role.replace("_", " ")}</Badge>
          </p>
        </div>
        <form
          action={async () => {
            "use server"
            const { signOut } = await import("@/lib/auth")
            await signOut({ redirectTo: "/login" })
          }}
        >
          <Button variant="outline" type="submit">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </form>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              Applications
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{applicationsCount}</div>
            <p className="text-xs text-primary/80">
              {pendingAppsCount} pending review
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-400">
              Contact Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{contactCount}</div>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/80">
              {unreadContactCount} unread inquiries
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Notices
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{noticesCount}</div>
            <p className="text-xs text-muted-foreground">
              Published notices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blog Posts
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogsCount}</div>
            <p className="text-xs text-muted-foreground">
              Published articles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Startups
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{startupsCount}</div>
            <p className="text-xs text-muted-foreground">
              Incubated ventures
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Events
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventsCount}</div>
            <p className="text-xs text-muted-foreground">
              Total events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Courses
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coursesCount}</div>
            <p className="text-xs text-muted-foreground">
              Diplomas & trainings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Faculty Members
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facultyCount}</div>
            <p className="text-xs text-muted-foreground">
              Active faculty
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Content Management
            </CardTitle>
            <CardDescription>
              Manage notices, blog posts, events, and startup profiles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/notices">Notices</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/blog">Blog Posts</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/events">Events</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/startups">Startups</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Academic Management
            </CardTitle>
            <CardDescription>
              Manage courses, faculty, and student results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="default" size="sm" className="w-full justify-start font-semibold flex items-center gap-2" asChild>
              <Link href="/admin/applications">
                <FileText className="w-4 h-4" /> Applications Portal
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/courses">Courses & Diplomas</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/faculty">Faculty & Staff</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/results">Student Results</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}