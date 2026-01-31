"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteResult } from "@/app/actions/results"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function DeleteResultButton({ resultId, title }: { resultId: string; title: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"? This will also delete all associated entries.`)) {
      return
    }

    try {
      const result = await deleteResult(resultId)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Result deleted successfully")
        router.refresh()
      }
    } catch (error) {
      toast.error("Failed to delete result")
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDelete}>
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
