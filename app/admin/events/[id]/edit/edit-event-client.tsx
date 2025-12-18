"use client"

import { Event } from "@prisma/client"
import { EventForm } from "@/components/event-form"
import { updateEvent } from "@/app/actions/event"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditEventClientProps {
  event: Event
}

export function EditEventClient({ event }: EditEventClientProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const initialData = {
    id: event.id,
    title: event.title,
    description: event.description,
    date: new Date(event.date),
    venue: event.venue,
    registrationLink: event.registrationLink || "",
  }

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const result = await updateEvent(event.id, data)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Event updated successfully")
      router.push("/admin/events")
      router.refresh()
    }

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Event</h1>
        <p className="text-muted-foreground">
          Update event details and information
        </p>
      </div>

      <EventForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}
