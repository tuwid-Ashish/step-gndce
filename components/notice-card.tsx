import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UpdateTag } from "@/components/update-tag"
import { Notice } from "@/types/notices"
import Link from "next/link"

interface NoticeCardProps {
  notice: Notice
}

export function NoticeCard({ notice }: NoticeCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-snug">
            <Link 
              href={`/notices/${notice.slug}`}
              className="hover:text-primary transition-colors"
            >
              {notice.title}
            </Link>
          </CardTitle>
          {notice.pinned && (
            <UpdateTag variant="info">Pinned</UpdateTag>
          )}
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {new Date(notice.date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long", 
            day: "numeric"
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">
          {notice.excerpt}
        </p>
      </CardContent>
    </Card>
  )
}