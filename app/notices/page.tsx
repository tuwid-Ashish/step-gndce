import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Pin, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export const metadata = {
  title: "Notices & Announcements | STEP-GNDEC",
  description: "Stay updated with latest notices and announcements"
}

export default async function NoticesPage() {
  const notices = await prisma.notice.findMany({
    where: {
      publishedAt: {
        lte: new Date()
      }
    },
    orderBy: [
      { isPinned: "desc" },
      { publishedAt: "desc" }
    ]
  })

  const pinnedNotices = notices.filter(n => n.isPinned)
  const regularNotices = notices.filter(n => !n.isPinned)

  const getCategoryColor = (category: string) => {
    const colors = {
      ADMISSION: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      EXAMINATION: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      ACADEMIC: "bg-green-500/10 text-green-700 dark:text-green-400",
      GENERAL: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
      PLACEMENT: "bg-orange-500/10 text-orange-700 dark:text-orange-400"
    }
    return colors[category as keyof typeof colors] || colors.GENERAL
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4" variant="outline">
            <Bell className="mr-2 h-3 w-3" />
            Latest Updates
          </Badge>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Notices & Announcements
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Stay informed with the latest notices, announcements, and important updates
            from STEP Institute.
          </p>
        </div>

        {/* Pinned Notices */}
        {pinnedNotices.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Pin className="h-6 w-6 text-primary" />
              Pinned Notices
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {pinnedNotices.map((notice) => (
                <Card
                  key={notice.id}
                  className="border-primary/50 bg-primary/5"
                >
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <Badge className={getCategoryColor(notice.category)}>
                        {notice.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {format(notice.publishedAt, "MMM d, yyyy")}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold">
                      {notice.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notice.excerpt && (
                      <p className="text-sm text-muted-foreground">
                        {notice.excerpt}
                      </p>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/notices/${notice.slug}`}>
                        Read More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Notices */}
        {regularNotices.length > 0 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">All Notices</h2>
            <div className="space-y-3">
              {regularNotices.map((notice) => (
                <Card
                  key={notice.id}
                  className="group transition-all hover:shadow-md"
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <Badge className={getCategoryColor(notice.category)}>
                          {notice.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(notice.publishedAt, "MMM d, yyyy")}
                        </span>
                      </div>
                      <h3 className="mb-1 font-semibold group-hover:text-primary">
                        {notice.title}
                      </h3>
                      {notice.excerpt && (
                        <p className="line-clamp-1 text-sm text-muted-foreground">
                          {notice.excerpt}
                        </p>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/notices/${notice.slug}`}>
                        View
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {notices.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <Bell className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold">No Notices Available</h3>
              <p className="text-muted-foreground">
                Check back soon for important announcements and updates.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
