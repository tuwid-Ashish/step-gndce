"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { ContactStatus } from "@prisma/client"

export type SubmitContactState = {
  success?: boolean
  error?: string
  messageId?: string
}

export async function submitContactMessage(formData: FormData): Promise<SubmitContactState> {
  try {
    const firstName = (formData.get("firstName") as string || "").trim()
    const lastName = (formData.get("lastName") as string || "").trim()
    const email = (formData.get("email") as string || "").trim().toLowerCase()
    const phone = (formData.get("phone") as string || "").trim()
    const subject = (formData.get("subject") as string || "General Inquiry").trim()
    const message = (formData.get("message") as string || "").trim()

    if (!firstName || !lastName || !email || !message) {
      return { error: "Please fill in all required fields (First Name, Last Name, Email, Message)." }
    }

    const contactMsg = await prisma.contactMessage.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        subject,
        message,
        status: ContactStatus.UNREAD,
      },
    })

    revalidatePath("/admin/contact")
    revalidatePath("/admin")

    return {
      success: true,
      messageId: contactMsg.id,
    }
  } catch {
    return {
      error: "An unexpected error occurred while sending your message. Please try again.",
    }
  }
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus,
  adminNotes?: string
) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized access")
  }

  await prisma.contactMessage.update({
    where: { id },
    data: {
      status,
      adminNotes: adminNotes !== undefined ? adminNotes : undefined,
    },
  })

  revalidatePath("/admin/contact")
  revalidatePath("/admin")
}

export async function deleteContactMessage(id: string) {
  const session = await auth()
  if (!session || session.user.role === "CONTENT_EDITOR") {
    throw new Error("Unauthorized access")
  }

  await prisma.contactMessage.delete({
    where: { id },
  })

  revalidatePath("/admin/contact")
  revalidatePath("/admin")
}
