"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface BlogFormData {
  title: string
  excerpt?: string
  content: string
  coverImage?: string
  isPublished: boolean
}

interface BlogFormProps {
  initialData?: BlogFormData
  onSubmit: (data: BlogFormData) => Promise<void>
  isSubmitting: boolean
}

const defaultValues: BlogFormData = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  isPublished: false,
}

export function BlogForm({ initialData, onSubmit, isSubmitting }: BlogFormProps) {
  const form = useForm<BlogFormData>({
    defaultValues: initialData || defaultValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Post Information</CardTitle>
            <CardDescription>
              Enter the basic details of the blog post
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog post title" {...field} required />
                  </FormControl>
                  <FormDescription>
                    A compelling title for your blog post
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief summary of the blog post..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A short summary that appears in blog listings (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    Link to the cover image for this blog post
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>
              Write your blog post content (supports markdown formatting)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Content *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog post content here...

You can use markdown formatting:

# Heading 1
## Heading 2
### Heading 3

**bold text**
*italic text*

- List item 1
- List item 2

1. Numbered item
2. Another item

[Link text](https://example.com)

```code block```"
                      className="min-h-[400px] font-mono"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormDescription>
                    Write your content using markdown syntax for formatting
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Publishing */}
        <Card>
          <CardHeader>
            <CardTitle>Publishing Options</CardTitle>
            <CardDescription>
              Control the visibility of this blog post
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Publish this blog post</FormLabel>
                    <FormDescription>
                      Make this blog post visible on the public website
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <a href="/admin/blog">Cancel</a>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Blog Post" : "Create Blog Post"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
