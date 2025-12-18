import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { format, isFuture, isPast } from "date-fns"

export const metadata = {
  title: "Events",
  description: "Upcoming workshops, seminars, and events at STEP Institute"
}

export default async function EventsPage() {
  const allEvents = await prisma.event.findMany({
    orderBy: { date: "asc" },
  })

  const upcomingEvents = allEvents.filter((event) => isFuture(new Date(event.date)))
  const pastEvents = allEvents.filter((event) => isPast(new Date(event.date)))

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Events & Workshops</h1>
            <p className="text-xl text-muted-foreground">
              Join our workshops, seminars, and networking events to enhance your skills and career prospects
            </p>
          </div>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
              <div className="grid gap-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-green-600">Upcoming</Badge>
                          </div>
                          <CardTitle className="text-2xl mb-2">
                            {event.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {event.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-6 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">
                            {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      {event.registrationLink && (
                        <Button asChild>
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Register Now
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Past Events</h2>
              <div className="grid gap-4">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Completed</Badge>
                          </div>
                          <CardTitle className="text-lg">
                            {event.title}
                          </CardTitle>
                          <CardDescription>
                            {event.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {upcomingEvents.length === 0 && pastEvents.length === 0 && (
            <div className="bg-brand-50 rounded-lg p-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-4">No Events Scheduled</h2>
              <p className="text-muted-foreground mb-6">
                Check back soon for upcoming workshops, seminars, and networking events.
              </p>
              <Button asChild>
                <Link href="/contact">Get Notified</Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}