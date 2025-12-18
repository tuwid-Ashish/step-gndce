import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pin, Edit, Trash2, PinOff } from "lucide-react"
import Link from "next/link"
import { DeleteNoticeButton, TogglePinButton } from "./actions-client"

export const metadata = {
  title: "Manage Notices",
  description: "Create and manage notices and announcements"
}

export default async function ManageNoticesPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const notices = await prisma.notice.findMany({
    orderBy: [
      { isPinned: "desc" },
      { publishedAt: "desc" }
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Notices</h1>
          <p className="text-muted-foreground">
            Create and manage notices and announcements
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/notices/new">
            <Plus className="mr-2 h-4 w-4" />
            New Notice
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{notices.length}</div>
            <p className="text-xs text-muted-foreground">Total Notices</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {notices.filter((n) => n.isPinned).length}
            </div>
            <p className="text-xs text-muted-foreground">Pinned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {notices.filter((n) => n.category === "URGENT").length}
            </div>
            <p className="text-xs text-muted-foreground">Urgent</p>
          </CardContent>
        </Card>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No notices yet</p>
              <Button asChild className="mt-4">
                <Link href="/admin/notices/new">Create your first notice</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          notices.map((notice) => (
            <Card key={notice.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      {notice.isPinned && (
                        <Pin className="h-4 w-4 text-primary" />
                      )}
                      <h3 className="text-lg font-semibold">
                        {notice.title}
                      </h3>
                    </div>
                    
                    {notice.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {notice.excerpt}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={
                        notice.category === "URGENT" ? "destructive" :
                        notice.category === "ADMISSION" ? "default" :
                        "secondary"
                      }>
                        {notice.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(notice.publishedAt).toLocaleDateString()}
                      </span>
                      {notice.attachmentUrl && (
                        <Badge variant="outline">Has Attachment</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <TogglePinButton 
                      noticeId={notice.id} 
                      isPinned={notice.isPinned}
                    />
                    
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/notices/${notice.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    
                    <DeleteNoticeButton noticeId={notice.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
