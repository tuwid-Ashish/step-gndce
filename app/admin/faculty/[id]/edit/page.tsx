import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { EditFacultyClient } from "./edit-faculty-client"

export const metadata = {
  title: "Edit Faculty - Admin",
  description: "Edit faculty member information",
}

interface EditFacultyPageProps {
  params: {
    id: string
  }
}

export default async function EditFacultyPage({ params }: EditFacultyPageProps) {
  const faculty = await prisma.faculty.findUnique({
    where: { id: params.id },
  })

  if (!faculty) {
    notFound()
  }

  return <EditFacultyClient faculty={faculty} />
}
