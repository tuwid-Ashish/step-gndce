"use client"

import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Building2, 
  Rocket, 
  Search, 
  Filter,
  Globe,
  Award,
  CheckCircle2,
  Calendar
} from "lucide-react"
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
    if (!confirm(`Are you sure you want to delete "${startup.name}"?`)) return

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
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-popover text-popover-foreground border border-border shadow-xl z-50">
        {startup.isActive && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/startups/${startup.slug}`} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4 text-primary" />
              View Public Page
            </Link>
          </DropdownMenuItem>
        )}
        {startup.websiteUrl && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={startup.websiteUrl} target="_blank">
              <Globe className="mr-2 h-4 w-4 text-blue-500" />
              Visit Website
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/admin/startups/${startup.id}/edit`}>
            <Edit className="mr-2 h-4 w-4 text-amber-500" />
            Edit Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-destructive cursor-pointer hover:bg-destructive/10">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Startup
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function StartupList({ startups }: StartupListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sectorFilter, setSectorFilter] = useState("ALL")

  // Extract unique sectors for quick filtering
  const uniqueSectors = Array.from(new Set(startups.map((s) => s.sector))).filter(Boolean)

  const filteredStartups = startups.filter((startup) => {
    const matchesSearch = 
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (startup.description && startup.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (startup.founderNames && startup.founderNames.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())))

    const matchesSector = sectorFilter === "ALL" || startup.sector === sectorFilter

    return matchesSearch && matchesSector
  })

  if (startups.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-xl bg-card">
        <Building2 className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
        <h3 className="text-lg font-bold mb-1">No startups or companies listed</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
          Start building your incubation portfolio by adding your first incubated startup or company profile.
        </p>
        <Button asChild className="gap-2">
          <Link href="/admin/startups/new">
            <Rocket className="w-4 h-4" /> Add First Venture
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-1">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, sector, founder..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>

        {uniqueSectors.length > 0 && (
          <div className="flex items-center gap-1 bg-muted p-1 rounded-md text-xs font-medium w-full sm:w-auto overflow-x-auto">
            <Filter className="w-3.5 h-3.5 ml-1 text-muted-foreground shrink-0" />
            <button
              onClick={() => setSectorFilter("ALL")}
              className={`px-2.5 py-1 rounded transition-colors shrink-0 ${
                sectorFilter === "ALL"
                  ? "bg-background text-foreground font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Sectors
            </button>
            {uniqueSectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setSectorFilter(sector)}
                className={`px-2.5 py-1 rounded transition-colors shrink-0 ${
                  sectorFilter === sector
                    ? "bg-background text-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Startup Table */}
      <div className="border rounded-xl bg-card overflow-hidden shadow-xs">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="font-bold">Venture Name</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Sector</TableHead>
              <TableHead className="font-bold">Incubation Status</TableHead>
              <TableHead className="font-bold">Founders / Team</TableHead>
              <TableHead className="font-bold">Founded</TableHead>
              <TableHead className="font-bold">Public</TableHead>
              <TableHead className="w-[70px] text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStartups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground text-sm">
                  No ventures found matching &quot;{searchQuery}&quot;
                </TableCell>
              </TableRow>
            ) : (
              filteredStartups.map((startup) => (
                <TableRow key={startup.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="space-y-0.5">
                      <div className="font-bold text-foreground text-base flex items-center gap-2">
                        {startup.name}
                        {startup.websiteUrl && (
                          <Link href={startup.websiteUrl} target="_blank" className="text-muted-foreground hover:text-primary">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                        {startup.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium text-xs">
                      {startup.type === "STARTUP" ? (
                        <span className="flex items-center gap-1 text-blue-700 dark:text-blue-400">
                          <Rocket className="w-3 h-3" /> Startup
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-purple-700 dark:text-purple-400">
                          <Building2 className="w-3 h-3" /> Company
                        </span>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-muted">
                      {startup.sector}
                    </span>
                  </TableCell>
                  <TableCell>
                    {startup.status === "GRADUATED" ? (
                      <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 gap-1 font-semibold">
                        <Award className="w-3 h-3" /> Graduated
                      </Badge>
                    ) : startup.status === "ACTIVE" ? (
                      <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30 gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 gap-1 font-semibold">
                        <Rocket className="w-3 h-3" /> Incubating
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {startup.founderNames && startup.founderNames.length > 0 ? (
                      <div className="text-xs text-foreground font-medium line-clamp-1">
                        {startup.founderNames.join(", ")}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {startup.foundedYear ? (
                      <span className="text-xs flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-3 h-3" /> {startup.foundedYear}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {startup.isActive ? (
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">
                        Visible
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground text-xs">
                        Hidden
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <StartupActions startup={startup} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
