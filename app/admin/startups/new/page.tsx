"use client"

import { StartupForm } from "@/components/startup-form"
import { createStartup } from "@/app/actions/startup"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { StartupType, StartupStatus } from "@prisma/client"

type StartupFormData = {
  name: string
  type: StartupType
  sector: string
  description: string
  logoUrl?: string
  websiteUrl?: string
  foundedYear?: number
  founderNames: string[]
  status: StartupStatus
  highlights: string[]
  fundingReceived?: string
  teamSize?: number
  isActive: boolean
}

export default function NewStartupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: StartupFormData) => {
    setIsLoading(true)
    const result = await createStartup(data)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Startup created successfully")
      router.push("/admin/startups")
      router.refresh()
    }

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin/startups">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Startups
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Add New Startup/Company</h1>
        <p className="text-muted-foreground">
          Add a new startup or established company to the portfolio
        </p>
      </div>

      <StartupForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}
