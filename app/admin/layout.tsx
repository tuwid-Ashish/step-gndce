import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminSidebar } from "./admin-sidebar"

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
      {/* Admin Sidebar Navigation */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}