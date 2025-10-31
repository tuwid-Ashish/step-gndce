import { Container } from "@/components/container"
import { NoticeCard } from "@/components/notice-card"
import { UpdateTag } from "@/components/update-tag"
import { Notice } from "@/types/notices"
import { Bell } from "lucide-react"

export const metadata = {
  title: "Notice Board",
  description: "Latest announcements and updates from STEP Institute"
}

// Mock data - replace with API call
const mockNotices: Notice[] = [
  {
    id: "1",
    title: "New Batch for Full Stack Development Course Starting Soon",
    slug: "new-fullstack-batch-2024",
    excerpt: "We are excited to announce the launch of our new Full Stack Development batch starting from December 1st, 2024. Limited seats available.",
    pinned: true,
    date: "2024-10-25",
    publishedAt: "2024-10-25T10:00:00Z"
  },
  {
    id: "2", 
    title: "Startup Pitch Competition - Register Now",
    slug: "startup-pitch-competition-2024",
    excerpt: "Join our annual startup pitch competition with a prize pool of ₹5 lakhs. Open to all students and alumni. Registration deadline: November 15th.",
    pinned: true,
    date: "2024-10-20",
    publishedAt: "2024-10-20T14:00:00Z"
  },
  {
    id: "3",
    title: "Guest Lecture by Industry Expert on AI/ML Trends",
    slug: "guest-lecture-ai-ml-trends",
    excerpt: "Don't miss our upcoming guest lecture by Dr. Sarah Johnson, AI researcher at Google, on emerging trends in artificial intelligence and machine learning.",
    pinned: false,
    date: "2024-10-18",
    publishedAt: "2024-10-18T09:00:00Z"
  },
  {
    id: "4",
    title: "Placement Drive Results - October 2024",
    slug: "placement-drive-results-october-2024",
    excerpt: "We are pleased to share the results of our October placement drive. 85% of our students received job offers from top companies.",
    pinned: false,
    date: "2024-10-15",
    publishedAt: "2024-10-15T16:00:00Z"
  },
  {
    id: "5",
    title: "Workshop on Digital Marketing for Startups",
    slug: "digital-marketing-workshop-startups",
    excerpt: "Learn effective digital marketing strategies for your startup in this hands-on workshop. Free for all incubated startups.",
    pinned: false,
    date: "2024-10-10",
    publishedAt: "2024-10-10T11:00:00Z"
  }
]

export default function NoticesPage() {
  const pinnedNotices = mockNotices.filter(notice => notice.pinned)
  const regularNotices = mockNotices.filter(notice => !notice.pinned)

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Bell className="h-8 w-8" />
              Notice Board
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest announcements and important information
            </p>
          </div>

          {/* Pinned Notices */}
          {pinnedNotices.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold">Pinned Notices</h2>
                <UpdateTag variant="info">Important</UpdateTag>
              </div>
              <div className="grid gap-6">
                {pinnedNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Notices */}
          <div>
            <h2 className="text-2xl font-bold mb-6">All Notices</h2>
            <div className="grid gap-6">
              {regularNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          </div>

          {/* TODO: Add pagination */}
          <div className="bg-brand-50 rounded-lg p-6 mt-12">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Search and filter notices by category</li>
              <li>• Email notifications for important notices</li>
              <li>• Archive of past notices</li>
              <li>• RSS feed for notice updates</li>
              <li>• Mobile app push notifications</li>
              <li>• Notice subscription preferences</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}