"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  FileText, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Trash2, 
  GraduationCap, 
  Rocket, 
  Calendar, 
  Mail, 
  Phone, 
  Building, 
  User, 
  X,
  Save,
  Layers,
  ArrowLeft
} from "lucide-react"
import { ApplicationStatus, ApplicationType } from "@prisma/client"
import { updateApplicationStatus, deleteApplication } from "@/app/actions/application"

export type SerializedApplication = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  qualification: string
  institution: string | null
  programType: ApplicationType
  specificProgram: string | null
  experience: string | null
  motivation: string
  status: ApplicationStatus
  adminNotes: string | null
  createdAt: string
  updatedAt: string
}

interface ApplicationsClientProps {
  initialApplications: SerializedApplication[]
}

export function ApplicationsClient({ initialApplications }: ApplicationsClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [programFilter, setProgramFilter] = useState<string>("ALL")
  const [selectedApp, setSelectedApp] = useState<SerializedApplication | null>(null)
  const [notes, setNotes] = useState<string>("")
  const [isUpdating, setIsUpdating] = useState(false)

  // Filtered applications
  const filteredApps = initialApplications.filter((app) => {
    const fullName = `${app.firstName} ${app.lastName}`.toLowerCase()
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery)

    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter
    const matchesProgram = programFilter === "ALL" || app.programType === programFilter

    return matchesSearch && matchesStatus && matchesProgram
  })

  // Quick stats
  const totalCount = initialApplications.length
  const pendingCount = initialApplications.filter((a) => a.status === "PENDING").length
  const trainingCount = initialApplications.filter((a) => a.programType === "TRAINING" || a.programType === "BOTH").length
  const incubationCount = initialApplications.filter((a) => a.programType === "INCUBATION" || a.programType === "BOTH").length

  const handleOpenDetail = (app: SerializedApplication) => {
    setSelectedApp(app)
    setNotes(app.adminNotes || "")
  }

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    if (!selectedApp) return
    setIsUpdating(true)
    try {
      await updateApplicationStatus(selectedApp.id, newStatus, notes)
      setSelectedApp({
        ...selectedApp,
        status: newStatus,
        adminNotes: notes,
      })
    } catch {
      // ignore
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedApp) return
    setIsUpdating(true)
    try {
      await updateApplicationStatus(selectedApp.id, selectedApp.status, notes)
      setSelectedApp({
        ...selectedApp,
        adminNotes: notes,
      })
    } catch {
      // ignore
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) return
    try {
      await deleteApplication(id)
      if (selectedApp?.id === id) {
        setSelectedApp(null)
      }
    } catch {
      // ignore
    }
  }

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "ACCEPTED":
        return <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 gap-1"><CheckCircle2 className="w-3 h-3" /> Accepted</Badge>
      case "REJECTED":
        return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" /> Rejected</Badge>
      case "REVIEWED":
        return <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30 gap-1"><Eye className="w-3 h-3" /> Reviewed</Badge>
      default:
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30 gap-1"><Clock className="w-3 h-3" /> Pending</Badge>
    }
  }

  const getProgramBadge = (type: ApplicationType) => {
    switch (type) {
      case "TRAINING":
        return <Badge variant="secondary" className="bg-primary/10 text-primary gap-1"><GraduationCap className="w-3 h-3" /> Training</Badge>
      case "INCUBATION":
        return <Badge variant="secondary" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 gap-1"><Rocket className="w-3 h-3" /> Incubation</Badge>
      default:
        return <Badge variant="secondary" className="bg-purple-500/10 text-purple-700 dark:text-purple-300 gap-1"><Layers className="w-3 h-3" /> Both</Badge>
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedApp(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Applications Management</h1>
        <p className="text-muted-foreground mt-1">
          Review, filter, and track applications submitted for Training Programs and Startup Incubation.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground">All time submissions</p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-400">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{pendingCount}</div>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/80">Requires action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Applicants</CardTitle>
            <GraduationCap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingCount}</div>
            <p className="text-xs text-muted-foreground">Skill programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incubation Applicants</CardTitle>
            <Rocket className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incubationCount}</div>
            <p className="text-xs text-muted-foreground">Startup ventures</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by applicant name, email, or phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-muted p-1 rounded-md text-xs font-medium">
              <Filter className="w-3.5 h-3.5 ml-1 text-muted-foreground" />
              {["ALL", "PENDING", "REVIEWED", "ACCEPTED", "REJECTED"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    statusFilter === st
                      ? "bg-background text-foreground font-bold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {st === "ALL" ? "All Status" : st.charAt(0) + st.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            {/* Program Filter */}
            <div className="flex items-center gap-1 bg-muted p-1 rounded-md text-xs font-medium">
              {["ALL", "TRAINING", "INCUBATION", "BOTH"].map((pr) => (
                <button
                  key={pr}
                  onClick={() => setProgramFilter(pr)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    programFilter === pr
                      ? "bg-background text-foreground font-bold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {pr === "ALL" ? "All Programs" : pr.charAt(0) + pr.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">Applications ({filteredApps.length})</CardTitle>
          <CardDescription>Click on any application to view full details, update status, or add notes.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {filteredApps.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground space-y-2">
              <FileText className="w-10 h-10 mx-auto opacity-40" />
              <p className="font-medium text-base">No applications found matching your criteria</p>
              <p className="text-xs">Try resetting search or filter options.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredApps.map((app) => (
                <div 
                  key={app.id} 
                  className={`p-4 hover:bg-muted/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer ${
                    selectedApp?.id === app.id ? "bg-muted/60" : ""
                  }`}
                  onClick={() => handleOpenDetail(app)}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-bold text-base text-foreground">
                        {app.firstName} {app.lastName}
                      </h3>
                      {getProgramBadge(app.programType)}
                      {getStatusBadge(app.status)}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {app.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {app.phone}</span>
                      <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" /> {app.institution || app.qualification}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>

                    {app.specificProgram && (
                      <p className="text-xs font-medium text-primary/90">
                        Domain: <span className="text-foreground capitalize">{app.specificProgram}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenDetail(app)
                      }}
                      className="gap-1 font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5 text-primary" /> View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(app.id)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Detail Modal / Overlay */}
      {selectedApp && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          onClick={() => setSelectedApp(null)}
        >
          <Card 
            className="w-full max-w-3xl max-h-[90vh] flex flex-col border-2 shadow-2xl bg-card overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Navigation Top Bar */}
            <div className="bg-muted/60 border-b px-6 py-2.5 flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedApp(null)}
                className="gap-1.5 text-xs font-bold bg-background shadow-xs hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 text-primary" /> Back to Applications List
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono hidden sm:inline">Press Esc to close</span>
                <Button variant="ghost" size="icon" onClick={() => setSelectedApp(null)} className="h-8 w-8 rounded-full">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Modal Header */}
            <CardHeader className="border-b bg-card pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <CardTitle className="text-2xl font-bold">{selectedApp.firstName} {selectedApp.lastName}</CardTitle>
                    {getProgramBadge(selectedApp.programType)}
                    {getStatusBadge(selectedApp.status)}
                  </div>
                  <CardDescription className="text-xs mt-1">
                    Submitted on {new Date(selectedApp.createdAt).toLocaleString()} • Ref <code className="font-mono font-bold text-foreground">#{selectedApp.id.slice(-6).toUpperCase()}</code>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            {/* Scrollable Content Body */}
            <CardContent className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Status Action Buttons */}
              <div className="p-4 rounded-xl bg-muted/40 border space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Update Application Status</h4>
                <div className="flex flex-wrap items-center gap-2">
                  <Button 
                    size="sm" 
                    variant={selectedApp.status === "PENDING" ? "default" : "outline"}
                    onClick={() => handleStatusChange("PENDING")}
                    disabled={isUpdating}
                    className="gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5" /> Pending
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedApp.status === "REVIEWED" ? "default" : "outline"}
                    onClick={() => handleStatusChange("REVIEWED")}
                    disabled={isUpdating}
                    className="gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> Mark Reviewed
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedApp.status === "ACCEPTED" ? "default" : "outline"}
                    onClick={() => handleStatusChange("ACCEPTED")}
                    disabled={isUpdating}
                    className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Accept Applicant
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedApp.status === "REJECTED" ? "destructive" : "outline"}
                    onClick={() => handleStatusChange("REJECTED")}
                    disabled={isUpdating}
                    className="gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </Button>
                </div>
              </div>

              {/* Applicant Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <h4 className="font-bold border-b pb-1 text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> Personal Details
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <p><strong className="text-muted-foreground">Full Name:</strong> {selectedApp.firstName} {selectedApp.lastName}</p>
                    <p><strong className="text-muted-foreground">Email:</strong> {selectedApp.email}</p>
                    <p><strong className="text-muted-foreground">Phone:</strong> {selectedApp.phone}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold border-b pb-1 text-foreground flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" /> Educational Background
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <p><strong className="text-muted-foreground">Qualification:</strong> {selectedApp.qualification}</p>
                    <p><strong className="text-muted-foreground">Institution:</strong> {selectedApp.institution || "N/A"}</p>
                    <p><strong className="text-muted-foreground">Selected Stream:</strong> {selectedApp.specificProgram || "General"}</p>
                  </div>
                </div>
              </div>

              {/* Experience & Motivation */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-foreground">Prior Experience / Projects</h4>
                  <div className="p-3 rounded-lg bg-muted/30 border text-xs leading-relaxed text-foreground">
                    {selectedApp.experience || "No prior experience submitted."}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-foreground">Statement of Purpose / Motivation</h4>
                  <div className="p-3 rounded-lg bg-muted/30 border text-xs leading-relaxed text-foreground">
                    {selectedApp.motivation}
                  </div>
                </div>
              </div>

              {/* Internal Admin Notes */}
              <div className="space-y-2 pt-2 border-t">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Internal Admin Notes
                </h4>
                <Textarea 
                  placeholder="Add notes regarding interview status, qualifications, background check..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="bg-background text-xs"
                />
                <Button size="sm" onClick={handleSaveNotes} disabled={isUpdating} className="gap-1.5">
                  <Save className="w-3.5 h-3.5" /> Save Admin Notes
                </Button>
              </div>
            </CardContent>

            {/* Modal Bottom Footer */}
            <CardFooter className="border-t bg-muted/30 px-6 py-3 flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedApp(null)}
                className="gap-1.5 text-xs font-bold"
              >
                <ArrowLeft className="w-4 h-4 text-primary" /> Back to Applications
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedApp(null)}
                className="text-xs text-muted-foreground"
              >
                Close Window
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
