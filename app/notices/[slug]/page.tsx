import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface NoticePageProps {
  params: Promise<{
    slug: string
  }>
}

// Mock notice data - replace with API call
const mockNotice = {
  id: "1",
  title: "New Batch for Full Stack Development Course Starting Soon",
  slug: "new-fullstack-batch-2024",
  content: `
    <div class="prose max-w-none">
      <p>We are excited to announce the launch of our new Full Stack Development batch starting from December 1st, 2024. This comprehensive program is designed to equip students with modern web development skills.</p>
      
      <h2>Course Highlights</h2>
      <ul>
        <li>6 months intensive training program</li>
        <li>Hands-on projects with real-world applications</li>
        <li>Industry-experienced instructors</li>
        <li>Placement assistance guaranteed</li>
        <li>Small batch size for personalized attention</li>
      </ul>
      
      <h2>Technologies Covered</h2>
      <ul>
        <li>Frontend: HTML5, CSS3, JavaScript, React.js, Next.js</li>
        <li>Backend: Node.js, Express.js, REST APIs</li>
        <li>Database: MongoDB, MySQL</li>
        <li>Tools: Git, Docker, AWS deployment</li>
      </ul>
      
      <h2>Eligibility</h2>
      <p>Candidates with basic computer knowledge and graduation in any stream are eligible to apply. Prior programming experience is not mandatory.</p>
      
      <h2>Important Dates</h2>
      <ul>
        <li>Application Deadline: November 25, 2024</li>
        <li>Interview Dates: November 26-28, 2024</li>
        <li>Batch Starts: December 1, 2024</li>
        <li>Course Duration: 6 months</li>
      </ul>
      
      <h2>How to Apply</h2>
      <p>Interested candidates can apply online through our application portal or visit our campus. For more information, contact our admissions team.</p>
      
      <p><strong>Note:</strong> Limited seats available. Applications will be processed on a first-come, first-served basis.</p>
    </div>
  `,
  publishedAt: "2024-10-25T10:00:00Z",
  updatedAt: "2024-10-25T10:00:00Z",
  pinned: true
}

export async function generateMetadata({ params }: NoticePageProps) {
  const { slug } = await params
  
  // TODO: Fetch notice data based on slug
  if (slug !== "new-fullstack-batch-2024") {
    return {
      title: "Notice Not Found"
    }
  }

  return {
    title: mockNotice.title,
    description: "Latest announcement from STEP Institute"
  }
}

export default async function NoticePage({ params }: NoticePageProps) {
  const { slug } = await params
  
  // TODO: Replace with actual API call
  if (slug !== "new-fullstack-batch-2024") {
    notFound()
  }

  const notice = mockNotice

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/notices">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Notices
            </Link>
          </Button>

          {/* Notice Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{notice.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Published: {new Date(notice.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </div>
              {notice.updatedAt !== notice.publishedAt && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Updated: {new Date(notice.updatedAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long", 
                    day: "numeric"
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Notice Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: notice.content }}
          />

          {/* Actions */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/apply">Apply Now</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact for More Info</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}