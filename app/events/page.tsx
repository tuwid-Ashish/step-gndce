import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Events",
  description: "Upcoming workshops, seminars, and events at STEP Institute"
}

// Mock events data
const mockEvents = [
  {
    id: "1",
    title: "AI/ML Workshop for Beginners",
    slug: "ai-ml-workshop-beginners",
    description: "Introduction to artificial intelligence and machine learning concepts with hands-on exercises.",
    date: "2024-11-15",
    time: "10:00 AM - 4:00 PM",
    location: "STEP Institute Auditorium",
    capacity: 50,
    registered: 32,
    featured: true
  },
  {
    id: "2", 
    title: "Startup Funding Masterclass",
    slug: "startup-funding-masterclass",
    description: "Learn about different funding options and how to prepare for investor meetings.",
    date: "2024-11-20",
    time: "2:00 PM - 5:00 PM", 
    location: "Online",
    capacity: 100,
    registered: 78,
    featured: false
  },
  {
    id: "3",
    title: "Tech Career Fair 2024",
    slug: "tech-career-fair-2024",
    description: "Meet with top tech companies and explore career opportunities.",
    date: "2024-12-05",
    time: "9:00 AM - 6:00 PM",
    location: "STEP Institute Campus",
    capacity: 200,
    registered: 145,
    featured: true
  }
]

export default function EventsPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
            <p className="text-xl text-muted-foreground">
              Join our workshops, seminars, and networking events to enhance your skills and career prospects
            </p>
          </div>

          <div className="grid gap-6">
            {mockEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">
                        <Link 
                          href={`/events/${event.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {event.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-base">
                        {event.description}
                      </CardDescription>
                    </div>
                    {event.featured && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {event.registered}/{event.capacity} registered
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" asChild>
                      <Link href={`/events/${event.slug}`}>View Details</Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      Register Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* TODO: Add more sections */}
          <div className="bg-brand-50 rounded-lg p-6 mt-12">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Event calendar integration</li>
              <li>• Online event registration system</li>
              <li>• Event categories and filtering</li>
              <li>• Speaker profiles and bios</li>
              <li>• Event recordings and materials</li>
              <li>• Networking features for attendees</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}