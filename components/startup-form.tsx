"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Plus, X } from "lucide-react"
import { useState } from "react"
import { StartupType, StartupStatus } from "@prisma/client"

const startupFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.nativeEnum(StartupType),
  sector: z.string().min(2, "Sector is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  logoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  websiteUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  foundedYear: z.number().min(1900).max(new Date().getFullYear()).optional().or(z.literal(undefined)),
  founderNames: z.array(z.string()).min(1, "At least one founder is required"),
  status: z.nativeEnum(StartupStatus),
  highlights: z.array(z.string()).min(1, "At least one highlight is required"),
  fundingReceived: z.string().optional().or(z.literal("")),
  teamSize: z.number().positive().optional().or(z.literal(undefined)),
  isActive: z.boolean().default(true),
})

type StartupFormValues = z.infer<typeof startupFormSchema>

interface StartupFormProps {
  initialData?: StartupFormValues & { id?: string }
  onSubmit: (data: StartupFormValues) => Promise<void>
  isLoading?: boolean
}

export function StartupForm({ initialData, onSubmit, isLoading }: StartupFormProps) {
  const [founders, setFounders] = useState<string[]>(initialData?.founderNames || [""])
  const [highlights, setHighlights] = useState<string[]>(initialData?.highlights || [""])

  const form = useForm<StartupFormValues>({
    resolver: zodResolver(startupFormSchema),
    defaultValues: initialData || {
      name: "",
      type: "STARTUP",
      sector: "",
      description: "",
      logoUrl: "",
      websiteUrl: "",
      foundedYear: undefined,
      founderNames: [""],
      status: "INCUBATING",
      highlights: [""],
      fundingReceived: "",
      teamSize: undefined,
      isActive: true,
    },
  })

  const handleFormSubmit = (data: StartupFormValues) => {
    // Filter out empty strings from arrays
    const cleanData = {
      ...data,
      founderNames: founders.filter(f => f.trim() !== ""),
      highlights: highlights.filter(h => h.trim() !== ""),
    }
    onSubmit(cleanData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the basic details about the startup or company.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="TechFlow Solutions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="STARTUP">Startup</SelectItem>
                        <SelectItem value="COMPANY">Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sector/Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="EdTech, AgriTech, FinTech..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="INCUBATING">Incubating</SelectItem>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="GRADUATED">Graduated</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what the startup does, its mission, and key offerings..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="foundedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Founded Year (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2023"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Size (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="15"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fundingReceived"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="₹50 Lakhs seed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL (Optional)</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL (Optional)</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Founders */}
        <Card>
          <CardHeader>
            <CardTitle>Founders</CardTitle>
            <CardDescription>
              Add the names of founders or key leadership.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {founders.map((founder, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Founder name"
                  value={founder}
                  onChange={(e) => {
                    const newFounders = [...founders]
                    newFounders[index] = e.target.value
                    setFounders(newFounders)
                    form.setValue("founderNames", newFounders.filter(f => f.trim() !== ""))
                  }}
                />
                {founders.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newFounders = founders.filter((_, i) => i !== index)
                      setFounders(newFounders)
                      form.setValue("founderNames", newFounders.filter(f => f.trim() !== ""))
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFounders([...founders, ""])}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Founder
            </Button>
          </CardContent>
        </Card>

        {/* Highlights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Achievements & Highlights</CardTitle>
            <CardDescription>
              Add key milestones, achievements, or impressive metrics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="₹2Cr revenue in first year"
                  value={highlight}
                  onChange={(e) => {
                    const newHighlights = [...highlights]
                    newHighlights[index] = e.target.value
                    setHighlights(newHighlights)
                    form.setValue("highlights", newHighlights.filter(h => h.trim() !== ""))
                  }}
                />
                {highlights.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newHighlights = highlights.filter((_, i) => i !== index)
                      setHighlights(newHighlights)
                      form.setValue("highlights", newHighlights.filter(h => h.trim() !== ""))
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setHighlights([...highlights, ""])}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Highlight
            </Button>
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle>Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Display on website
                    </FormLabel>
                    <FormDescription>
                      Show this startup on the public startups page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData?.id ? "Update Startup" : "Create Startup"}
        </Button>
      </form>
    </Form>
  )
}
