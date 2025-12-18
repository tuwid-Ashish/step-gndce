"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Type for blog form data
interface BlogFormData {
  title: string
  excerpt?: string
  content: string
  coverImage?: string
  isPublished: boolean
}

export async function createBlog(data: BlogFormData) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    const slug = generateSlug(data.title)

    // Check if slug already exists
    const existing = await prisma.blog.findUnique({
      where: { slug },
    })

    if (existing) {
      return { error: "A blog post with this title already exists" }
    }

    // Verify user exists in database
    const userExists = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    const blog = await prisma.blog.create({
      data: {
        ...data,
        slug,
        authorId: userExists ? session.user.id : undefined,
        publishedAt: data.isPublished ? new Date() : null,
      },
    })

    revalidatePath("/blog")
    revalidatePath("/admin/blog")

    return { success: true, blog }
  } catch (error) {
    console.error("Error creating blog:", error)
    return { error: "Failed to create blog post" }
  }
}

export async function updateBlog(id: string, data: BlogFormData) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    })

    if (!existingBlog) {
      return { error: "Blog post not found" }
    }

    const slug = generateSlug(data.title)

    // Check if slug is taken by another blog
    const slugTaken = await prisma.blog.findUnique({
      where: { slug },
    })

    if (slugTaken && slugTaken.id !== id) {
      return { error: "A blog post with this title already exists" }
    }

    // Handle published status change
    let publishedAt = existingBlog.publishedAt
    if (data.isPublished && !existingBlog.isPublished) {
      publishedAt = new Date()
    } else if (!data.isPublished) {
      publishedAt = null
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        ...data,
        slug,
        publishedAt,
      },
    })

    revalidatePath("/blog")
    revalidatePath(`/blog/${slug}`)
    revalidatePath("/admin/blog")

    return { success: true, blog }
  } catch (error) {
    console.error("Error updating blog:", error)
    return { error: "Failed to update blog post" }
  }
}

export async function deleteBlog(id: string) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return { error: "Unauthorized - Only Super Admin can delete blog posts" }
    }

    await prisma.blog.delete({
      where: { id },
    })

    revalidatePath("/blog")
    revalidatePath("/admin/blog")

    return { success: true }
  } catch (error) {
    console.error("Error deleting blog:", error)
    return { error: "Failed to delete blog post" }
  }
}

export async function toggleBlogPublish(id: string) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    const blog = await prisma.blog.findUnique({
      where: { id },
    })

    if (!blog) {
      return { error: "Blog post not found" }
    }

    const updated = await prisma.blog.update({
      where: { id },
      data: {
        isPublished: !blog.isPublished,
        publishedAt: !blog.isPublished ? new Date() : null,
      },
    })

    revalidatePath("/blog")
    revalidatePath(`/blog/${blog.slug}`)
    revalidatePath("/admin/blog")

    return { success: true, blog: updated }
  } catch (error) {
    console.error("Error toggling blog publish status:", error)
    return { error: "Failed to update blog status" }
  }
}
