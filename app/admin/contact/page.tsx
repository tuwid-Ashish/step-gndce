import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ContactMessage } from "@prisma/client"
import { ContactClient, SerializedContactMessage } from "./contact-client"

export const metadata = {
  title: "Contact Messages - STEP Admin",
  description: "Manage contact inquiries submitted by website visitors",
}

export default async function ContactMessagesPage() {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  let messages: ContactMessage[] = []
  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    })
  } catch {
    messages = []
  }

  const serialized: SerializedContactMessage[] = messages.map((msg) => ({
    id: msg.id,
    firstName: msg.firstName,
    lastName: msg.lastName,
    email: msg.email,
    phone: msg.phone,
    subject: msg.subject,
    message: msg.message,
    status: msg.status,
    adminNotes: msg.adminNotes,
    createdAt: msg.createdAt.toISOString(),
    updatedAt: msg.updatedAt.toISOString(),
  }))

  return <ContactClient initialMessages={serialized} />
}
