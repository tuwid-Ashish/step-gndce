import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { EditBlogClient } from "./edit-blog-client"

export const metadata = {
  title: "Edit Blog Post - Admin",
  description: "Edit blog post",
}

interface EditBlogPageProps {
  params: {
    id: string
  }
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
  })

  if (!blog) {
    notFound()
  }

  return <EditBlogClient blog={blog} />
}
