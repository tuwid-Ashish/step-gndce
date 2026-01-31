"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

// Helper to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Helper to save uploaded image file
async function saveImageFile(file: File, facultySlug: string): Promise<string> {
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create images directory if it doesn't exist
    const imagesDir = join(process.cwd(), "public", "images", "faculty")
    if (!existsSync(imagesDir)) {
      await mkdir(imagesDir, { recursive: true })
    }

    // Generate unique filename with faculty slug
    const ext = file.name.split('.').pop()
    const filename = `${facultySlug}-${Date.now()}.${ext}`
    const filepath = join(imagesDir, filename)

    // Write file to public/images/faculty directory
    await writeFile(filepath, buffer)

    // Return the public path that will be stored in DB
    return `/images/faculty/${filename}`
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving image file:", error)
    throw new Error("Failed to save image file")
  }
}

export async function createFaculty(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    // Extract form data
    const name = formData.get("name") as string
    const designation = formData.get("designation") as string
    const department = formData.get("department") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const photoUrl = formData.get("photoUrl") as string
    const specialization = formData.get("specialization") as string
    const experience = formData.get("experience") as string
    const bio = formData.get("bio") as string
    const linkedIn = formData.get("linkedIn") as string
    const teachesDiploma = formData.get("teachesDiploma") === "true"
    const teachesTraining = formData.get("teachesTraining") === "true"
    const isActive = formData.get("isActive") === "true"
    const imageFile = formData.get("imageFile") as File | null
    
    // Parse qualifications
    const qualificationsJson = formData.get("qualifications") as string
    const qualifications = qualificationsJson ? JSON.parse(qualificationsJson) : []

    const slug = generateSlug(name)

    // Check if slug already exists
    const existing = await prisma.faculty.findUnique({
      where: { slug },
    })

    if (existing) {
      return { error: "A faculty member with this name already exists" }
    }

    // Handle image upload if file provided
    let finalPhotoUrl = photoUrl
    if (imageFile && imageFile.size > 0) {
      finalPhotoUrl = await saveImageFile(imageFile, slug)
    }

    const faculty = await prisma.faculty.create({
      data: {
        name,
        designation,
        department,
        email,
        phone: phone || undefined,
        photoUrl: finalPhotoUrl || undefined,
        specialization: specialization || undefined,
        qualifications,
        experience: experience || undefined,
        bio: bio || undefined,
        teachesDiploma,
        teachesTraining,
        linkedIn: linkedIn || undefined,
        isActive,
        slug,
      },
    })

    revalidatePath("/faculty")
    revalidatePath("/admin/faculty")

    return { success: true, faculty }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating faculty:", error)
    return { error: "Failed to create faculty member" }
  }
}

export async function updateFaculty(id: string, formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    // Extract form data
    const name = formData.get("name") as string
    const designation = formData.get("designation") as string
    const department = formData.get("department") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const photoUrl = formData.get("photoUrl") as string
    const specialization = formData.get("specialization") as string
    const experience = formData.get("experience") as string
    const bio = formData.get("bio") as string
    const linkedIn = formData.get("linkedIn") as string
    const teachesDiploma = formData.get("teachesDiploma") === "true"
    const teachesTraining = formData.get("teachesTraining") === "true"
    const isActive = formData.get("isActive") === "true"
    const imageFile = formData.get("imageFile") as File | null
    
    // Parse qualifications
    const qualificationsJson = formData.get("qualifications") as string
    const qualifications = qualificationsJson ? JSON.parse(qualificationsJson) : []

    const slug = generateSlug(name)

    // Check if slug is taken by another faculty
    const existing = await prisma.faculty.findUnique({
      where: { slug },
    })

    if (existing && existing.id !== id) {
      return { error: "A faculty member with this name already exists" }
    }

    // Handle image upload if file provided
    let finalPhotoUrl = photoUrl
    if (imageFile && imageFile.size > 0) {
      finalPhotoUrl = await saveImageFile(imageFile, slug)
    }

    const faculty = await prisma.faculty.update({
      where: { id },
      data: {
        name,
        designation,
        department,
        email,
        phone: phone || undefined,
        photoUrl: finalPhotoUrl || undefined,
        specialization: specialization || undefined,
        qualifications,
        experience: experience || undefined,
        bio: bio || undefined,
        teachesDiploma,
        teachesTraining,
        linkedIn: linkedIn || undefined,
        isActive,
        slug,
      },
    })

    revalidatePath("/faculty")
    revalidatePath(`/faculty/${slug}`)
    revalidatePath("/admin/faculty")

    return { success: true, faculty }
  } catch (error) {
    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.error("Error toggling faculty active status:", error)
    return { error: "Failed to update faculty status" }
  }
}
