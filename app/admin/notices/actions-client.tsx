"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pin, PinOff, Trash2 } from "lucide-react"
import { toggleNoticePin, deleteNotice } from "@/app/actions/notices"
import { toast } from "sonner"

export function TogglePinButton({ noticeId, isPinned }: { noticeId: string; isPinned: boolean }) {
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    try {
      await toggleNoticePin(noticeId, !isPinned)
      toast.success(isPinned ? "Notice unpinned" : "Notice pinned")
    } catch (error) {
      toast.error("Failed to update notice")
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
      {isPinned ? (
        <PinOff className="h-4 w-4" />
      ) : (
        <Pin className="h-4 w-4" />
      )}
    </Button>
  )
}

export function DeleteNoticeButton({ noticeId }: { noticeId: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this notice?")) return

    setLoading(true)
    try {
      await deleteNotice(noticeId)
      toast.success("Notice deleted")
    } catch (error) {
      toast.error("Failed to delete notice")
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
