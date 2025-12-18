"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Type for event form data
interface EventFormData {
  title: string
  description: string
  date: Date
  venue: string
  registrationLink?: string
}

export async function createEvent(data: EventFormData) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    const event = await prisma.event.create({
      data: {
        ...data,
      },
    })

    revalidatePath("/events")
    revalidatePath("/admin/events")

    return { success: true, event }
  } catch (error) {
    console.error("Error creating event:", error)
    return { error: "Failed to create event" }
  }
}

export async function updateEvent(id: string, data: EventFormData) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...data,
      },
    })

    revalidatePath("/events")
    revalidatePath(`/events/${id}`)
    revalidatePath("/admin/events")

    return { success: true, event }
  } catch (error) {
    console.error("Error updating event:", error)
    return { error: "Failed to update event" }
  }
}

export async function deleteEvent(id: string) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return { error: "Only Super Admin can delete events" }
    }

    await prisma.event.delete({
      where: { id },
    })

    revalidatePath("/events")
    revalidatePath("/admin/events")

    return { success: true }
  } catch (error) {
    console.error("Error deleting event:", error)
    return { error: "Failed to delete event" }
  }
}
