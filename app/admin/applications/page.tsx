import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Application } from "@prisma/client"
import { ApplicationsClient, SerializedApplication } from "./applications-client"

export const metadata = {
  title: "Applications Management - STEP Admin",
  description: "Manage applications for training programs and startup incubation",
}

export default async function ApplicationsPage() {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  let applications: Application[] = []
  try {
    applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
    })
  } catch {
    applications = []
  }

  const serialized: SerializedApplication[] = applications.map((app) => ({
    id: app.id,
    firstName: app.firstName,
    lastName: app.lastName,
    email: app.email,
    phone: app.phone,
    qualification: app.qualification,
    institution: app.institution,
    programType: app.programType,
    specificProgram: app.specificProgram,
    experience: app.experience,
    motivation: app.motivation,
    status: app.status,
    adminNotes: app.adminNotes,
    createdAt: app.createdAt.toISOString(),
    updatedAt: app.updatedAt.toISOString(),
  }))

  return <ApplicationsClient initialApplications={serialized} />
}
