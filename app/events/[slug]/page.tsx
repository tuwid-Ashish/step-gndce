import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface EventPageProps {
  params: Promise<{
    slug: string
  }>
}

// Mock event data
const mockEvent = {
  id: "1",
  title: "AI/ML Workshop for Beginners",
  slug: "ai-ml-workshop-beginners",
  description: "Introduction to artificial intelligence and machine learning concepts with hands-on exercises.",
  content: `
    <div class="prose max-w-none">
      <p>Join us for an exciting introduction to the world of Artificial Intelligence and Machine Learning! This beginner-friendly workshop is designed for students and professionals who want to understand the fundamentals of AI/ML.</p>
      
      <h2>What You'll Learn</h2>
      <ul>
        <li>Basic concepts of AI and Machine Learning</li>
        <li>Popular ML algorithms and when to use them</li>
        <li>Hands-on practice with Python and popular libraries</li>
        <li>Real-world applications and case studies</li>
        <li>Career opportunities in AI/ML field</li>
      </ul>
      
      <h2>Prerequisites</h2>
      <p>No prior experience with AI/ML required! Basic programming knowledge (any language) is helpful but not mandatory.</p>
      
      <h2>What to Bring</h2>
      <ul>
        <li>Laptop with Python installed (installation guide will be shared)</li>
        <li>Notebook and pen for taking notes</li>
        <li>Enthusiasm to learn!</li>
      </ul>
      
      <h2>Speaker</h2>
      <p>Dr. Rajesh Kumar, PhD in Computer Science with 10+ years of experience in AI research and industry applications. Currently works as Senior Data Scientist at a leading tech company.</p>
      
      <h2>Certificate</h2>
      <p>All participants will receive a certificate of participation.</p>
    </div>
  `,
  date: "2024-11-15",
  time: "10:00 AM - 4:00 PM",
  location: "STEP Institute Auditorium",
  capacity: 50,
  registered: 32,
  featured: true,
  fee: "Free for STEP students, ₹500 for external participants"
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params
  
  // TODO: Fetch event data based on slug
  if (slug !== "ai-ml-workshop-beginners") {
    return {
      title: "Event Not Found"
    }
  }

  return {
    title: mockEvent.title,
    description: mockEvent.description
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  
  // TODO: Replace with actual API call
  if (slug !== "ai-ml-workshop-beginners") {
    notFound()
  }

  const event = mockEvent

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>

          {/* Event Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">
              {event.description}
            </p>
            
            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Date</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Time</div>
                  <div className="text-sm text-muted-foreground">{event.time}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">{event.location}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Capacity</div>
                  <div className="text-sm text-muted-foreground">
                    {event.registered}/{event.capacity} registered
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Content */}
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />

          {/* Registration Section */}
          <div className="bg-brand-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Registration</h2>
            <p className="mb-4 text-muted-foreground">
              <strong>Fee:</strong> {event.fee}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1">
                Register Now
              </Button>
              <Button size="lg" variant="outline">
                Add to Calendar
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Registration deadline: 2 days before the event
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}