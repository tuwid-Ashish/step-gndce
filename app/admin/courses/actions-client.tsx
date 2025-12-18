"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Trash2 } from "lucide-react"
import { toggleCourseActive, deleteCourse } from "@/app/actions/courses"
import { toast } from "sonner"

export function ToggleActiveButton({ courseId, isActive }: { courseId: string; isActive: boolean }) {
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    try {
      await toggleCourseActive(courseId, !isActive)
      toast.success(isActive ? "Course deactivated" : "Course activated")
    } catch (error) {
      toast.error("Failed to update course")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={loading}
    >
      {isActive ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4" />
      )}
    </Button>
  )
}

export function DeleteCourseButton({ courseId }: { courseId: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this course?")) return

    setLoading(true)
    try {
      await deleteCourse(courseId)
      toast.success("Course deleted")
    } catch (error) {
      toast.error("Failed to delete course")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
  )
}
