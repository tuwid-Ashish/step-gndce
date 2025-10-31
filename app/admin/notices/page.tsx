import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Pin, Eye, Edit } from "lucide-react"

export const metadata = {
  title: "Manage Notices",
  description: "Create and manage notices and announcements"
}

// Mock notices data
const mockNotices = [
  {
    id: "1",
    title: "New Batch for Full Stack Development Course Starting Soon",
    excerpt: "We are excited to announce the launch of our new Full Stack Development batch...",
    status: "published",
    pinned: true,
    publishedAt: "2024-10-25",
    views: 1250
  },
  {
    id: "2",
    title: "Startup Pitch Competition - Register Now", 
    excerpt: "Join our annual startup pitch competition with a prize pool of ₹5 lakhs...",
    status: "published",
    pinned: true,
    publishedAt: "2024-10-20",
    views: 890
  },
  {
    id: "3",
    title: "Guest Lecture on AI/ML Trends",
    excerpt: "Don't miss our upcoming guest lecture by Dr. Sarah Johnson...",
    status: "draft",
    pinned: false,
    publishedAt: null,
    views: 0
  }
]

export default function ManageNoticesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Notices</h1>
          <p className="text-muted-foreground">
            Create and manage notices and announcements
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Notice
        </Button>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {mockNotices.map((notice) => (
          <Card key={notice.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{notice.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {notice.excerpt}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {notice.pinned && (
                    <Badge variant="secondary">
                      <Pin className="h-3 w-3 mr-1" />
                      Pinned
                    </Badge>
                  )}
                  <Badge variant={notice.status === 'published' ? 'default' : 'outline'}>
                    {notice.status === 'published' ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {notice.status === 'published' ? (
                    <span>
                      Published {new Date(notice.publishedAt!).toLocaleDateString()} • {notice.views} views
                    </span>
                  ) : (
                    <span>Draft - Not published</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    {notice.pinned ? 'Unpin' : 'Pin'}
                  </Button>
                  <Button variant="ghost" size="sm">
                    {notice.status === 'published' ? 'Unpublish' : 'Publish'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TODO Notice */}
      <Card className="border-brand-200 bg-brand-50">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Rich text editor for notice content</li>
            <li>• Image upload and media management</li>
            <li>• Scheduling and auto-publish features</li>
            <li>• Categories and tagging system</li>
            <li>• Email notifications to subscribers</li>
            <li>• Analytics and engagement metrics</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}