"use client"

import { Startup } from "@prisma/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, ExternalLink, Building2 } from "lucide-react"
import Link from "next/link"
import { deleteStartup } from "@/app/actions/startup"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface StartupListProps {
  startups: Startup[]
}

function StartupActions({ startup }: { startup: Startup }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${startup.name}?`)) return

    const result = await deleteStartup(startup.id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Startup deleted successfully")
      router.refresh()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {startup.isActive && (
          <DropdownMenuItem asChild>
            <Link href={`/startups/${startup.slug}`} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Public Page
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href={`/admin/startups/${startup.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function StartupList({ startups }: StartupListProps) {
  if (startups.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No startups found</h3>
        <p className="text-muted-foreground mb-4">
          Get started by adding your first startup or company.
        </p>
        <Button asChild>
          <Link href="/admin/startups/new">Add First Startup</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Founded</TableHead>
            <TableHead>Visible</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {startups.map((startup) => (
            <TableRow key={startup.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{startup.name}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {startup.description}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {startup.type === "STARTUP" ? "Startup" : "Company"}
                </Badge>
              </TableCell>
              <TableCell>{startup.sector}</TableCell>
              <TableCell>
                {startup.status === "GRADUATED" ? (
                  <Badge className="bg-green-600">Graduated</Badge>
                ) : startup.status === "ACTIVE" ? (
                  <Badge className="bg-blue-600">Active</Badge>
                ) : (
                  <Badge className="bg-orange-600">Incubating</Badge>
                )}
              </TableCell>
              <TableCell>
                {startup.foundedYear || <span className="text-muted-foreground">N/A</span>}
              </TableCell>
              <TableCell>
                {startup.isActive ? (
                  <Badge variant="outline" className="text-green-600">Yes</Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">No</Badge>
                )}
              </TableCell>
              <TableCell>
                <StartupActions startup={startup} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
