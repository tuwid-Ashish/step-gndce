"use client"

import { EventForm } from "@/components/event-form"
import { createEvent } from "@/app/actions/event"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewEventPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: { title: string; description: string; date: Date; venue: string; registrationLink?: string }) => {
    setIsLoading(true)
    const result = await createEvent(data)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Event created successfully")
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
        <h1 className="text-3xl font-bold">Create New Event</h1>
        <p className="text-muted-foreground">
          Add a new event, workshop, or seminar to the calendar
        </p>
      </div>

      <EventForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}
