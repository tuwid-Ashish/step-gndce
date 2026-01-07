"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export async function createCourse(formData: FormData) {
  const session = await auth()
  if (!session || session.user.role === "CONTENT_EDITOR") {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const code = formData.get("code") as string
  const description = formData.get("description") as string
  const type = formData.get("type") as "DIPLOMA" | "INDUSTRIAL_TRAINING"
  const category = formData.get("category") as "CS_IT" | "MECHANICAL" | "CIVIL" | "ELECTRONICS" | "MANAGEMENT" | "FASHION" | "OTHER"
  const duration = formData.get("duration") as string
  const eligibility = formData.get("eligibility") as string | null
  const syllabusUrl = formData.get("syllabusUrl") as string | null
  const highlightsRaw = formData.get("highlights") as string

  const highlights = highlightsRaw
    .split("\n")
    .map((h) => h.trim())
    .filter((h) => h.length > 0)

  const slug = generateSlug(title)

  await prisma.course.create({
    data: {
      title,
      slug,
      code,
      description,
      type,
      category,
      duration,
      eligibility,
      syllabusUrl,
      highlights,
      isActive: true,
    },
  })

  revalidatePath("/admin/courses")
  revalidatePath("/diplomas")
  revalidatePath("/industrial-trainings")
  revalidatePath("/")
  redirect("/admin/courses")
}

export async function updateCourse(id: string, formData: FormData) {
  const session = await auth()
  if (!session || session.user.role === "CONTENT_EDITOR") {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const code = formData.get("code") as string
  const description = formData.get("description") as string
  const type = formData.get("type") as "DIPLOMA" | "INDUSTRIAL_TRAINING"
  const category = formData.get("category") as "CS_IT" | "MECHANICAL" | "CIVIL" | "ELECTRONICS" | "MANAGEMENT" | "FASHION" | "OTHER"
  const duration = formData.get("duration") as string
  const eligibility = formData.get("eligibility") as string | null
  const syllabusUrl = formData.get("syllabusUrl") as string | null
  const highlightsRaw = formData.get("highlights") as string

  const highlights = highlightsRaw
    .split("\n")
    .map((h) => h.trim())
    .filter((h) => h.length > 0)

  await prisma.course.update({
    where: { id },
    data: {
      title,
      code,
      description,
      type,
      category,
      duration,
      eligibility,
      syllabusUrl,
      highlights,
    },
  })

  revalidatePath("/admin/courses")
  revalidatePath("/diplomas")
  revalidatePath("/industrial-trainings")
  revalidatePath("/")
  redirect("/admin/courses")
}

export async function deleteCourse(id: string) {
  const session = await auth()
  if (!session || session.user.role === "CONTENT_EDITOR") {
    throw new Error("Unauthorized")
  }

  await prisma.course.delete({
    where: { id },
  })

  revalidatePath("/admin/courses")
  revalidatePath("/diplomas")
  revalidatePath("/industrial-trainings")
  revalidatePath("/")
}

export async function toggleCourseActive(id: string, isActive: boolean) {
  const session = await auth()
  if (!session || session.user.role === "CONTENT_EDITOR") {
    throw new Error("Unauthorized")
  }

  await prisma.course.update({
    where: { id },
    data: { isActive },
  })

  revalidatePath("/admin/courses")
  revalidatePath("/diplomas")
  revalidatePath("/industrial-trainings")
  revalidatePath("/")
}
