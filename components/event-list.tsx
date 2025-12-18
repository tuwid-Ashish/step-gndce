"use client"

import { Event } from "@prisma/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, ExternalLink, Calendar } from "lucide-react"
import Link from "next/link"
import { format, isFuture, isPast } from "date-fns"
import { deleteEvent } from "@/app/actions/event"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface EventListProps {
  events: Event[]
}

function EventActions({ event }: { event: Event }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return

    const result = await deleteEvent(event.id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Event deleted successfully")
      router.refresh()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/admin/events/${event.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        {event.registrationLink && (
          <DropdownMenuItem asChild>
            <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Registration Link
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No events found</h3>
        <p className="text-muted-foreground mb-4">
          Get started by creating your first event.
        </p>
        <Button asChild>
          <Link href="/admin/events/new">Create First Event</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registration</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => {
            const eventDate = new Date(event.date)
            const isUpcoming = isFuture(eventDate)
            const isCompleted = isPast(eventDate)

            return (
              <TableRow key={event.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {event.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{event.venue}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {format(eventDate, "MMM d, yyyy")}
                  </div>
                </TableCell>
                <TableCell>
                  {isUpcoming ? (
                    <Badge className="bg-green-600">Upcoming</Badge>
                  ) : isCompleted ? (
                    <Badge variant="secondary">Completed</Badge>
                  ) : (
                    <Badge variant="outline">Today</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {event.registrationLink ? (
                    <Badge variant="outline" className="text-blue-600">
                      Available
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  <EventActions event={event} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
