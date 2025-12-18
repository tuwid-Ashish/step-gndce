"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FacultyForm, type FacultyFormData } from "@/components/faculty-form"
import { createFaculty } from "@/app/actions/faculty"
import { toast } from "sonner"

export default function NewFacultyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: FacultyFormData) => {
    setIsSubmitting(true)
    try {
      const result = await createFaculty(data)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Faculty member created successfully")
        router.push("/admin/faculty")
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
          <CardTitle>Add New Faculty Member</CardTitle>
          <CardDescription>
            Create a new faculty member profile
          </CardDescription>
        </CardHeader>
      </Card>

      <FacultyForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
