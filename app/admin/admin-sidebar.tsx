"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Award, 
  GraduationCap, 
  Users, 
  Bell, 
  BookOpen, 
  Calendar, 
  Rocket, 
  ArrowUpRight,
  MessageSquare
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const isLinkActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname === href || pathname.startsWith(href + "/")
  }

  const getLinkClasses = (href: string) => {
    const active = isLinkActive(href)
    if (active) {
      return "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold bg-primary text-primary-foreground shadow-xs transition-all"
    }
    return "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
  }

  return (
    <aside className="w-64 border-r border-border bg-muted/20 shrink-0">
      <nav className="p-4 space-y-6 sticky top-0">
        {/* Top Brand Header link back to public site */}
        <div className="px-3 py-2 rounded-lg bg-card border shadow-xs flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Admin Workspace</span>
          <Link href="/" target="_blank" className="text-xs text-primary hover:underline flex items-center gap-0.5">
            Site <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Dashboard */}
        <div className="space-y-1">
          <Link 
            href="/admin" 
            className={getLinkClasses("/admin")}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className={`w-4 h-4 ${isLinkActive("/admin") ? "text-primary-foreground" : "text-primary"}`} />
              <span>Dashboard</span>
            </div>
          </Link>
        </div>
        
        {/* Admissions & Submissions Section */}
        <div className="space-y-1.5">
          <h3 className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Admissions & Submissions
          </h3>
          <Link 
            href="/admin/applications" 
            className={getLinkClasses("/admin/applications")}
          >
            <div className="flex items-center gap-2.5">
              <FileText className={`w-4 h-4 ${isLinkActive("/admin/applications") ? "text-primary-foreground" : "text-primary"}`} />
              <span>Applications Portal</span>
            </div>
            {isLinkActive("/admin/applications") && (
              <span className="text-[10px] uppercase tracking-wide bg-primary-foreground/20 px-1.5 py-0.5 rounded font-mono">
                Active
              </span>
            )}
          </Link>

          <Link 
            href="/admin/contact" 
            className={getLinkClasses("/admin/contact")}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className={`w-4 h-4 ${isLinkActive("/admin/contact") ? "text-primary-foreground" : "text-amber-500"}`} />
              <span>Contact Messages</span>
            </div>
            {isLinkActive("/admin/contact") && (
              <span className="text-[10px] uppercase tracking-wide bg-primary-foreground/20 px-1.5 py-0.5 rounded font-mono">
                Active
              </span>
            )}
          </Link>
        </div>

        {/* Academic & Results Management */}
        <div className="space-y-1.5">
          <h3 className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Academic & Results
          </h3>
          <Link 
            href="/admin/results" 
            className={getLinkClasses("/admin/results")}
          >
            <div className="flex items-center gap-2.5">
              <Award className={`w-4 h-4 ${isLinkActive("/admin/results") ? "text-primary-foreground" : "text-amber-500"}`} />
              <span>Student Results</span>
            </div>
          </Link>

          <Link 
            href="/admin/courses" 
            className={getLinkClasses("/admin/courses")}
          >
            <div className="flex items-center gap-2.5">
              <GraduationCap className={`w-4 h-4 ${isLinkActive("/admin/courses") ? "text-primary-foreground" : "text-blue-500"}`} />
              <span>Courses & Diplomas</span>
            </div>
          </Link>

          <Link 
            href="/admin/faculty" 
            className={getLinkClasses("/admin/faculty")}
          >
            <div className="flex items-center gap-2.5">
              <Users className={`w-4 h-4 ${isLinkActive("/admin/faculty") ? "text-primary-foreground" : "text-emerald-500"}`} />
              <span>Faculty & Staff</span>
            </div>
          </Link>
        </div>

        {/* Incubation & Content Management */}
        <div className="space-y-1.5">
          <h3 className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Incubation & Content
          </h3>
          <Link 
            href="/admin/startups" 
            className={getLinkClasses("/admin/startups")}
          >
            <div className="flex items-center gap-2.5">
              <Rocket className={`w-4 h-4 ${isLinkActive("/admin/startups") ? "text-primary-foreground" : "text-purple-500"}`} />
              <span>Startups & Incubation</span>
            </div>
          </Link>

          <Link 
            href="/admin/notices" 
            className={getLinkClasses("/admin/notices")}
          >
            <div className="flex items-center gap-2.5">
              <Bell className={`w-4 h-4 ${isLinkActive("/admin/notices") ? "text-primary-foreground" : "text-rose-500"}`} />
              <span>Notices & Circulars</span>
            </div>
          </Link>

          <Link 
            href="/admin/blog" 
            className={getLinkClasses("/admin/blog")}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className={`w-4 h-4 ${isLinkActive("/admin/blog") ? "text-primary-foreground" : "text-sky-500"}`} />
              <span>Blog Articles</span>
            </div>
          </Link>

          <Link 
            href="/admin/events" 
            className={getLinkClasses("/admin/events")}
          >
            <div className="flex items-center gap-2.5">
              <Calendar className={`w-4 h-4 ${isLinkActive("/admin/events") ? "text-primary-foreground" : "text-indigo-500"}`} />
              <span>Events Calendar</span>
            </div>
          </Link>
        </div>
      </nav>
    </aside>
  )
}
