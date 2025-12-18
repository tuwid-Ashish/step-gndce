import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventList } from "@/components/event-list"
import { Calendar, CalendarCheck, CalendarClock } from "lucide-react"
import Link from "next/link"
import { isFuture, isPast, isToday } from "date-fns"

export default async function EventsPage() {
  const session = await auth()

  if (!session?.user || session.user.role === "CONTENT_EDITOR") {
    redirect("/admin")
  }

  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
  })

  const upcomingEvents = events.filter((event) => isFuture(new Date(event.date)))
  const completedEvents = events.filter((event) => isPast(new Date(event.date)) && !isToday(new Date(event.date)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Events Management</h1>
          <p className="text-muted-foreground">
            Create and manage campus events, workshops, and seminars
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">Create Event</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {upcomingEvents.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {completedEvents.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Events ({events.length})</TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <EventList events={events} />
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <EventList events={upcomingEvents} />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <EventList events={completedEvents} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
