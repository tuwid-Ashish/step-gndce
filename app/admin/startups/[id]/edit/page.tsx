import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { EditStartupClient } from "./edit-startup-client"

interface EditStartupPageProps {
  params: Promise<{ id: string }>
}

export default async function EditStartupPage({ params }: EditStartupPageProps) {
  const { id } = await params
  const startup = await prisma.startup.findUnique({
    where: { id },
  })

  if (!startup) {
    notFound()
  }

  return <EditStartupClient startup={startup} />
}
