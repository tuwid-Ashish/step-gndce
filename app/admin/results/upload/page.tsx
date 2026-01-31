import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { UploadResultClient } from "./upload-result-client"

export const metadata = {
  title: "Upload Results",
  description: "Upload examination results via PDF or CSV file"
}

export default async function UploadResultsPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  // CONTENT_EDITOR cannot access results
  if (session.user.role === "CONTENT_EDITOR") {
    redirect("/admin")
  }

  // Fetch courses for selection
  const courses = await prisma.course.findMany({
    where: { isActive: true },
    select: {
      id: true,
      title: true,
      type: true,
      code: true,
    },
    orderBy: { title: "asc" }
  })

  return <UploadResultClient courses={courses} />
}
