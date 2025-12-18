import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, 
  Calendar, 
  ExternalLink,
  ArrowLeft,
  Download
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const notice = await prisma.notice.findUnique({
    where: { slug }
  })

  if (!notice) {
    return {
      title: "Notice Not Found"
    }
  }

  return {
    title: `${notice.title} | STEP-GNDEC`,
    description: notice.excerpt || notice.title
  }
}

export default async function NoticeDetailPage({ params }: PageProps) {
  const { slug } = await params
  const notice = await prisma.notice.findUnique({
    where: { slug }
  })

  if (!notice || notice.publishedAt > new Date()) {
    notFound()
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      ADMISSION: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
      EXAMINATION: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
      ACADEMIC: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
      GENERAL: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
      PLACEMENT: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20"
    }
    return colors[category as keyof typeof colors] || colors.GENERAL
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/notices" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Notices
            </Link>
          </Button>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Notice Header */}
          <Card className="mb-8">
            <CardHeader>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge className={getCategoryColor(notice.category)}>
                  <Bell className="mr-1 h-3 w-3" />
                  {notice.category}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(notice.publishedAt, "MMMM d, yyyy")}
                </div>
                {notice.isPinned && (
                  <Badge variant="outline">Pinned</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold md:text-4xl">
                {notice.title}
              </h1>
              {notice.excerpt && (
                <p className="mt-2 text-lg text-muted-foreground">
                  {notice.excerpt}
                </p>
              )}
            </CardHeader>
          </Card>

          {/* Notice Content */}
          <Card className="mb-8">
            <CardContent className="prose prose-gray dark:prose-invert max-w-none pt-6">
              <div className="whitespace-pre-wrap">
                {notice.content}
              </div>
            </CardContent>
          </Card>

          {/* Attachment */}
          {notice.attachmentUrl && (
            <Card>
              <CardHeader>
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <Download className="h-5 w-5" />
                  Attachment
                </h3>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a
                    href={notice.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    Download Attachment
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
