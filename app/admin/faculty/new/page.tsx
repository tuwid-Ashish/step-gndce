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
      // Convert form data to FormData for file upload support
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("designation", data.designation)
      formData.append("department", data.department)
      formData.append("email", data.email)
      formData.append("phone", data.phone || "")
      formData.append("photoUrl", data.photoUrl || "")
      formData.append("specialization", data.specialization || "")
      formData.append("qualifications", JSON.stringify(data.qualifications || []))
      formData.append("experience", data.experience || "")
      formData.append("bio", data.bio || "")
      formData.append("teachesDiploma", String(data.teachesDiploma))
      formData.append("teachesTraining", String(data.teachesTraining))
      formData.append("linkedIn", data.linkedIn || "")
      formData.append("isActive", String(data.isActive))
      
      // Add image file if provided
      if (data.imageFile) {
        formData.append("imageFile", data.imageFile)
      }
      
      const result = await createFaculty(formData)
      
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
