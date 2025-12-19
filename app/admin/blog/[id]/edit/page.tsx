import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { EditBlogClient } from "./edit-blog-client"

export const metadata = {
  title: "Edit Blog Post - Admin",
  description: "Edit blog post",
}

interface EditBlogPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params
  const blog = await prisma.blog.findUnique({
    where: { id },
  })

  if (!blog) {
    notFound()
  }

  return <EditBlogClient blog={blog} />
}
