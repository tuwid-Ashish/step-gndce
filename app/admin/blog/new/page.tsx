"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogForm, type BlogFormData } from "@/components/blog-form"
import { createBlog } from "@/app/actions/blog"
import { toast } from "sonner"

export default function NewBlogPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true)
    try {
      const result = await createBlog(data)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Blog post created successfully")
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
          <CardTitle>Create New Blog Post</CardTitle>
          <CardDescription>
            Write and publish a new blog post
          </CardDescription>
        </CardHeader>
      </Card>

      <BlogForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
