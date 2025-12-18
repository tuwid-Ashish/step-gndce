"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { StartupType, StartupStatus } from "@prisma/client"

// Helper to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Type for startup form data
interface StartupFormData {
  name: string
  type: StartupType
  sector: string
  description: string
  logoUrl?: string
  websiteUrl?: string
  foundedYear?: number
  founderNames: string[]
  status: StartupStatus
  highlights: string[]
  fundingReceived?: string
  teamSize?: number
  isActive: boolean
}

export async function createStartup(data: StartupFormData) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    const slug = generateSlug(data.name)

    // Check if slug already exists
    const existing = await prisma.startup.findUnique({
      where: { slug },
    })

    if (existing) {
      return { error: "A startup with this name already exists" }
    }

    const startup = await prisma.startup.create({
      data: {
        ...data,
        slug,
      },
    })

    revalidatePath("/startups")
    revalidatePath("/admin/startups")

    return { success: true, startup }
  } catch (error) {
    console.error("Error creating startup:", error)
    return { error: "Failed to create startup" }
  }
}

export async function updateStartup(id: string, data: StartupFormData) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    const slug = generateSlug(data.name)

    // Check if slug is taken by another startup
    const existing = await prisma.startup.findUnique({
      where: { slug },
    })

    if (existing && existing.id !== id) {
      return { error: "A startup with this name already exists" }
    }

    const startup = await prisma.startup.update({
      where: { id },
      data: {
        ...data,
        slug,
      },
    })

    revalidatePath("/startups")
    revalidatePath(`/startups/${slug}`)
    revalidatePath("/admin/startups")

    return { success: true, startup }
  } catch (error) {
    console.error("Error updating startup:", error)
    return { error: "Failed to update startup" }
  }
}

export async function deleteStartup(id: string) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return { error: "Only Super Admin can delete startups" }
    }

    await prisma.startup.delete({
      where: { id },
    })

    revalidatePath("/startups")
    revalidatePath("/admin/startups")

    return { success: true }
  } catch (error) {
    console.error("Error deleting startup:", error)
    return { error: "Failed to delete startup" }
  }
}
