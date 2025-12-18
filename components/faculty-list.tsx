"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, Eye, EyeOff, GraduationCap, Briefcase } from "lucide-react"
import { deleteFaculty, toggleFacultyActive } from "@/app/actions/faculty"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Faculty {
  id: string
  slug: string
  name: string
  designation: string
  department: string
  email: string
  teachesDiploma: boolean
  teachesTraining: boolean
  isActive: boolean
}

interface FacultyActionsProps {
  faculty: Faculty
}

function FacultyActions({ faculty }: FacultyActionsProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${faculty.name}?`)) {
      return
    }

    const result = await deleteFaculty(faculty.id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Faculty member deleted successfully")
      router.refresh()
    }
  }

  const handleToggleActive = async () => {
    const result = await toggleFacultyActive(faculty.id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(
        `Faculty member ${faculty.isActive ? "deactivated" : "activated"} successfully`
      )
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
        <DropdownMenuItem asChild>
          <Link href={`/faculty/${faculty.slug}`} target="_blank">
            <Eye className="h-4 w-4 mr-2" />
            View Public Page
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/faculty/${faculty.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleToggleActive}>
          <EyeOff className="h-4 w-4 mr-2" />
          {faculty.isActive ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface FacultyListProps {
  faculty: Faculty[]
}

export function FacultyList({ faculty }: FacultyListProps) {
  if (faculty.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No faculty members found.</p>
        <Button asChild className="mt-4">
          <Link href="/admin/faculty/new">Add First Faculty Member</Link>
        </Button>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Teaching</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {faculty.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium">{member.name}</TableCell>
            <TableCell>{member.designation}</TableCell>
            <TableCell>{member.department}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{member.email}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {member.teachesDiploma && (
                  <Badge variant="default" className="text-xs flex items-center gap-1">
                    <GraduationCap className="h-3 w-3" />
                    Diploma
                  </Badge>
                )}
                {member.teachesTraining && (
                  <Badge variant="secondary" className="text-xs flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    Training
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={member.isActive ? "default" : "secondary"}>
                {member.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <FacultyActions faculty={member} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
