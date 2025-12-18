"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Helper to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Type for faculty form data
interface FacultyFormData {
  name: string
  designation: string
  department: string
  email: string
  phone?: string
  photoUrl?: string
  specialization?: string
  qualifications?: string[]
  experience?: string
  bio?: string
  teachesDiploma: boolean
  teachesTraining: boolean
  linkedIn?: string
  isActive: boolean
}

export async function createFaculty(data: FacultyFormData) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    const slug = generateSlug(data.name)

    // Check if slug already exists
    const existing = await prisma.faculty.findUnique({
      where: { slug },
    })

    if (existing) {
      return { error: "A faculty member with this name already exists" }
    }

    const faculty = await prisma.faculty.create({
      data: {
        ...data,
        slug,
      },
    })

    revalidatePath("/faculty")
    revalidatePath("/admin/faculty")

    return { success: true, faculty }
  } catch (error) {
    console.error("Error creating faculty:", error)
    return { error: "Failed to create faculty member" }
  }
}

export async function updateFaculty(id: string, data: FacultyFormData) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    const slug = generateSlug(data.name)

    // Check if slug is taken by another faculty
    const existing = await prisma.faculty.findUnique({
      where: { slug },
    })

    if (existing && existing.id !== id) {
      return { error: "A faculty member with this name already exists" }
    }

    const faculty = await prisma.faculty.update({
      where: { id },
      data: {
        ...data,
        slug,
      },
    })

    revalidatePath("/faculty")
    revalidatePath(`/faculty/${slug}`)
    revalidatePath("/admin/faculty")

    return { success: true, faculty }
  } catch (error) {
    console.error("Error updating faculty:", error)
    return { error: "Failed to update faculty member" }
  }
}

export async function deleteFaculty(id: string) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return { error: "Unauthorized" }
    }

    await prisma.faculty.delete({
      where: { id },
    })

    revalidatePath("/faculty")
    revalidatePath("/admin/faculty")

    return { success: true }
  } catch (error) {
    console.error("Error deleting faculty:", error)
    return { error: "Failed to delete faculty member" }
  }
}

export async function toggleFacultyActive(id: string) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    const faculty = await prisma.faculty.findUnique({
      where: { id },
    })

    if (!faculty) {
      return { error: "Faculty not found" }
    }

    const updated = await prisma.faculty.update({
      where: { id },
      data: { isActive: !faculty.isActive },
    })

    revalidatePath("/faculty")
    revalidatePath(`/faculty/${faculty.slug}`)
    revalidatePath("/admin/faculty")

    return { success: true, faculty: updated }
  } catch (error) {
    console.error("Error toggling faculty active status:", error)
    return { error: "Failed to update faculty status" }
  }
}
