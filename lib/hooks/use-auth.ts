"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAuth(requiredRole?: string) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/login")
      return
    }

    if (requiredRole && session.user.role !== requiredRole) {
      router.push("/admin")
    }
  }, [session, status, requiredRole, router])

  return { session, status, isLoading: status === "loading" }
}

export function useRequireAuth() {
  const { data: session, status } = useSession()

  return {
    session,
    status,
    isAuthenticated: !!session,
    isLoading: status === "loading",
    user: session?.user,
  }
}
