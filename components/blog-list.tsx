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
import { MoreHorizontal, Edit, Trash, Eye, EyeOff } from "lucide-react"
import { deleteBlog, toggleBlogPublish } from "@/app/actions/blog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"

interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string | null
  isPublished: boolean
  publishedAt: Date | null
  createdAt: Date
  author: {
    name: string
  } | null
}

interface BlogActionsProps {
  blog: Blog
}

function BlogActions({ blog }: BlogActionsProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      return
    }

    const result = await deleteBlog(blog.id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Blog post deleted successfully")
      router.refresh()
    }
  }

  const handleTogglePublish = async () => {
    const result = await toggleBlogPublish(blog.id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(
        `Blog post ${blog.isPublished ? "unpublished" : "published"} successfully`
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
        {blog.isPublished && (
          <DropdownMenuItem asChild>
            <Link href={`/blog/${blog.slug}`} target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              View Public Page
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href={`/admin/blog/${blog.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTogglePublish}>
          <EyeOff className="h-4 w-4 mr-2" />
          {blog.isPublished ? "Unpublish" : "Publish"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface BlogListProps {
  blogs: Blog[]
}

export function BlogList({ blogs }: BlogListProps) {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No blog posts found.</p>
        <Button asChild className="mt-4">
          <Link href="/admin/blog/new">Create First Blog Post</Link>
        </Button>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogs.map((blog) => (
          <TableRow key={blog.id}>
            <TableCell>
              <div>
                <div className="font-medium">{blog.title}</div>
                {blog.excerpt && (
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {blog.excerpt}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell className="text-sm">
              {blog.author?.name || "Unknown"}
            </TableCell>
            <TableCell>
              <Badge variant={blog.isPublished ? "default" : "secondary"}>
                {blog.isPublished ? "Published" : "Draft"}
              </Badge>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {blog.publishedAt ? format(new Date(blog.publishedAt), "MMM d, yyyy") : "-"}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {format(new Date(blog.createdAt), "MMM d, yyyy")}
            </TableCell>
            <TableCell className="text-right">
              <BlogActions blog={blog} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
