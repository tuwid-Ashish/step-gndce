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

export async function createNotice(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const category = formData.get("category") as "GENERAL" | "URGENT" | "ADMISSION" | "EXAM" | "RESULT" | "EVENT"
  const isPinned = formData.get("isPinned") === "on"
  const attachmentUrl = formData.get("attachmentUrl") as string | null

  const slug = generateSlug(title)

  await prisma.notice.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      category,
      isPinned,
      attachmentUrl: attachmentUrl || null,
    },
  })

  revalidatePath("/admin/notices")
  revalidatePath("/notices")
  revalidatePath("/")
  redirect("/admin/notices")
}

export async function updateNotice(id: string, formData: FormData) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const category = formData.get("category") as "GENERAL" | "URGENT" | "ADMISSION" | "EXAM" | "RESULT" | "EVENT"
  const isPinned = formData.get("isPinned") === "on"
  const attachmentUrl = formData.get("attachmentUrl") as string | null

  await prisma.notice.update({
    where: { id },
    data: {
      title,
      content,
      excerpt,
      category,
      isPinned,
      attachmentUrl: attachmentUrl || null,
    },
  })

  revalidatePath("/admin/notices")
  revalidatePath("/notices")
  revalidatePath("/")
  redirect("/admin/notices")
}

export async function deleteNotice(id: string) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  await prisma.notice.delete({
    where: { id },
  })

  revalidatePath("/admin/notices")
  revalidatePath("/notices")
  revalidatePath("/")
}

export async function toggleNoticePin(id: string, isPinned: boolean) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  await prisma.notice.update({
    where: { id },
    data: { isPinned },
  })

  revalidatePath("/admin/notices")
  revalidatePath("/")
}
