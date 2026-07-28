"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { ApplicationType, ApplicationStatus } from "@prisma/client"

export type SubmitApplicationState = {
  success?: boolean
  error?: string
  applicationId?: string
}

export async function submitApplication(formData: FormData): Promise<SubmitApplicationState> {
  try {
    const firstName = (formData.get("firstName") as string || "").trim()
    const lastName = (formData.get("lastName") as string || "").trim()
    const email = (formData.get("email") as string || "").trim().toLowerCase()
    const phone = (formData.get("phone") as string || "").trim()
    const qualification = (formData.get("qualification") as string || "").trim()
    const institution = (formData.get("institution") as string || "").trim()
    const programTypeRaw = (formData.get("programType") as string || "TRAINING").toUpperCase()
    const specificProgram = (formData.get("specificProgram") as string || "").trim()
    const experience = (formData.get("experience") as string || "").trim()
    const motivation = (formData.get("motivation") as string || "").trim()

    if (!firstName || !lastName || !email || !phone || !qualification || !motivation) {
      return { error: "Please fill in all required fields." }
    }

    let programType: ApplicationType = ApplicationType.TRAINING
    if (programTypeRaw === "INCUBATION") programType = ApplicationType.INCUBATION
    else if (programTypeRaw === "BOTH") programType = ApplicationType.BOTH

    const application = await prisma.application.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        qualification,
        institution: institution || null,
        programType,
        specificProgram: specificProgram || null,
        experience: experience || null,
        motivation,
        status: ApplicationStatus.PENDING,
      },
    })

    revalidatePath("/admin/applications")
    revalidatePath("/admin")

    return {
      success: true,
      applicationId: application.id,
    }
  } catch {
    return {
      error: "An unexpected error occurred while saving your application. Please try again.",
    }
  }
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  adminNotes?: string
) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized access")
  }

  await prisma.application.update({
    where: { id },
    data: {
      status,
      adminNotes: adminNotes !== undefined ? adminNotes : undefined,
    },
  })

  revalidatePath("/admin/applications")
  revalidatePath("/admin")
}

export async function deleteApplication(id: string) {
  const session = await auth()
  if (!session || session.user.role === "CONTENT_EDITOR") {
    throw new Error("Unauthorized access")
  }

  await prisma.application.delete({
    where: { id },
  })

  revalidatePath("/admin/applications")
  revalidatePath("/admin")
}
