"use client"

import { Startup } from "@prisma/client"
import { StartupForm } from "@/components/startup-form"
import { updateStartup } from "@/app/actions/startup"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditStartupClientProps {
  startup: Startup
}

export function EditStartupClient({ startup }: EditStartupClientProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const initialData = {
    id: startup.id,
    name: startup.name,
    type: startup.type,
    sector: startup.sector,
    description: startup.description,
    logoUrl: startup.logoUrl || "",
    websiteUrl: startup.websiteUrl || "",
    foundedYear: startup.foundedYear || undefined,
    founderNames: startup.founderNames,
    status: startup.status,
    highlights: startup.highlights,
    fundingReceived: startup.fundingReceived || "",
    teamSize: startup.teamSize || undefined,
    isActive: startup.isActive,
  }

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const result = await updateStartup(startup.id, data)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Startup updated successfully")
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
        <h1 className="text-3xl font-bold">Edit {startup.name}</h1>
        <p className="text-muted-foreground">
          Update startup/company information
        </p>
      </div>

      <StartupForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}
