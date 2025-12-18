import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlogList } from "@/components/blog-list"
import { prisma } from "@/lib/prisma"
import { Plus, FileText } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Blog Management - Admin",
  description: "Manage blog posts",
}

export default async function AdminBlogPage() {
  const allBlogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  const publishedBlogs = allBlogs.filter((b) => b.isPublished)
  const draftBlogs = allBlogs.filter((b) => !b.isPublished)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage blog posts for your website
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" />
            New Blog Post
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allBlogs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Published
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{publishedBlogs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Drafts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{draftBlogs.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Blog List with Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Blog Posts
          </CardTitle>
          <CardDescription>
            View and manage all blog posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">
                All ({allBlogs.length})
              </TabsTrigger>
              <TabsTrigger value="published">
                Published ({publishedBlogs.length})
              </TabsTrigger>
              <TabsTrigger value="drafts">
                Drafts ({draftBlogs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <BlogList blogs={allBlogs} />
            </TabsContent>

            <TabsContent value="published" className="mt-6">
              <BlogList blogs={publishedBlogs} />
            </TabsContent>

            <TabsContent value="drafts" className="mt-6">
              <BlogList blogs={draftBlogs} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
