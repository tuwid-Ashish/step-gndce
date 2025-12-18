"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogForm, type BlogFormData } from "@/components/blog-form"
import { updateBlog } from "@/app/actions/blog"
import { toast } from "sonner"

interface EditBlogClientProps {
  blog: {
    id: string
    title: string
    excerpt: string | null
    content: string
    coverImage: string | null
    isPublished: boolean
  }
}

export function EditBlogClient({ blog }: EditBlogClientProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialData: BlogFormData = {
    title: blog.title,
    excerpt: blog.excerpt || "",
    content: blog.content,
    coverImage: blog.coverImage || "",
    isPublished: blog.isPublished,
  }

  const handleSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true)
    try {
      const result = await updateBlog(blog.id, data)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Blog post updated successfully")
        router.push("/admin/blog")
        router.refresh()
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
          <CardDescription>
            Update blog post: {blog.title}
          </CardDescription>
        </CardHeader>
      </Card>

      <BlogForm 
        initialData={initialData} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </div>
  )
}
