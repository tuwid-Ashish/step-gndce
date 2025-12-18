import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Container } from "@/components/container"
import { MainLogo } from "@/components/main-logo"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Settings, LogOut } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border bg-background">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <MainLogo />
              <div className="flex items-center gap-2 px-3 py-1 bg-warning/10 rounded-full">
                <Shield className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning">Admin Panel</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <LogOut className="h-4 w-4 mr-2" />
                  Exit Admin
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Admin Sidebar Navigation */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside className="w-64 border-r border-border bg-muted/30">
          <nav className="p-4 space-y-2">
            <Link 
              href="/admin" 
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Dashboard
            </Link>
            
            <div className="pt-2">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Results Management
              </h3>
              <Link 
                href="/admin/results/exams" 
                className="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Manage Exams
              </Link>
              <Link 
                href="/admin/results/upload" 
                className="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Upload Results
              </Link>
              <Link 
                href="/admin/results/entries" 
                className="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                View Entries
              </Link>
            </div>

            <div className="pt-2">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Content Management
              </h3>
              <Link 
                href="/admin/notices" 
                className="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Notices
              </Link>
              <Link 
                href="/admin/blog" 
                className="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Blog Posts
              </Link>
              <Link 
                href="/admin/startups" 
                className="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Startups
              </Link>
            </div>

            <div className="pt-2">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                User Management
              </h3>
              <Link 
                href="/admin/users" 
                className="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Users
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}