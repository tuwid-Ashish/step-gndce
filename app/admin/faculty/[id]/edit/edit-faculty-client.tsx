"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FacultyForm, type FacultyFormData } from "@/components/faculty-form"
import { updateFaculty } from "@/app/actions/faculty"
import { toast } from "sonner"

interface EditFacultyClientProps {
  faculty: {
    id: string
    name: string
    designation: string
    department: string
    email: string
    phone: string | null
    photoUrl: string | null
    specialization: string | null
    qualifications: string[]
    experience: string | null
    bio: string | null
    teachesDiploma: boolean
    teachesTraining: boolean
    linkedIn: string | null
    isActive: boolean
  }
}

export function EditFacultyClient({ faculty }: EditFacultyClientProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialData: FacultyFormData = {
    name: faculty.name,
    designation: faculty.designation,
    department: faculty.department,
    email: faculty.email,
    phone: faculty.phone || "",
    photoUrl: faculty.photoUrl || "",
    specialization: faculty.specialization || "",
    qualifications: faculty.qualifications || [],
    experience: faculty.experience || "",
    bio: faculty.bio || "",
    teachesDiploma: faculty.teachesDiploma,
    teachesTraining: faculty.teachesTraining,
    linkedIn: faculty.linkedIn || "",
    isActive: faculty.isActive,
  }

  const handleSubmit = async (data: FacultyFormData) => {
    setIsSubmitting(true)
    try {
      const result = await updateFaculty(faculty.id, data)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Faculty member updated successfully")
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
          <CardTitle>Edit Faculty Member</CardTitle>
          <CardDescription>
            Update information for {faculty.name}
          </CardDescription>
        </CardHeader>
      </Card>

      <FacultyForm 
        initialData={initialData} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </div>
  )
}
