"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  Archive, 
  Eye, 
  Trash2, 
  Calendar, 
  Mail, 
  Phone, 
  X,
  Save,
  ArrowLeft,
  MailCheck,
  FileText
} from "lucide-react"
import { ContactStatus } from "@prisma/client"
import { updateContactStatus, deleteContactMessage } from "@/app/actions/contact"

export type SerializedContactMessage = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: ContactStatus
  adminNotes: string | null
  createdAt: string
  updatedAt: string
}

interface ContactClientProps {
  initialMessages: SerializedContactMessage[]
}

export function ContactClient({ initialMessages }: ContactClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [selectedMsg, setSelectedMsg] = useState<SerializedContactMessage | null>(null)
  const [notes, setNotes] = useState<string>("")
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMsg(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Filtered messages
  const filteredMessages = initialMessages.filter((msg) => {
    const fullName = `${msg.firstName} ${msg.lastName}`.toLowerCase()
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (msg.phone && msg.phone.includes(searchQuery)) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "ALL" || msg.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Quick stats
  const totalCount = initialMessages.length
  const unreadCount = initialMessages.filter((m) => m.status === "UNREAD").length
  const resolvedCount = initialMessages.filter((m) => m.status === "RESOLVED").length

  const handleOpenDetail = async (msg: SerializedContactMessage) => {
    setSelectedMsg(msg)
    setNotes(msg.adminNotes || "")

    // Automatically mark unread messages as READ upon viewing
    if (msg.status === "UNREAD") {
      try {
        await updateContactStatus(msg.id, "READ", msg.adminNotes || undefined)
        setSelectedMsg({ ...msg, status: "READ" })
      } catch {
        // ignore
      }
    }
  }

  const handleStatusChange = async (newStatus: ContactStatus) => {
    if (!selectedMsg) return
    setIsUpdating(true)
    try {
      await updateContactStatus(selectedMsg.id, newStatus, notes)
      setSelectedMsg({
        ...selectedMsg,
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
    if (!selectedMsg) return
    setIsUpdating(true)
    try {
      await updateContactStatus(selectedMsg.id, selectedMsg.status, notes)
      setSelectedMsg({
        ...selectedMsg,
        adminNotes: notes,
      })
    } catch {
      // ignore
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact message? This action cannot be undone.")) return
    try {
      await deleteContactMessage(id)
      if (selectedMsg?.id === id) {
        setSelectedMsg(null)
      }
    } catch {
      // ignore
    }
  }

  const getStatusBadge = (status: ContactStatus) => {
    switch (status) {
      case "RESOLVED":
        return <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 gap-1"><CheckCircle2 className="w-3 h-3" /> Resolved</Badge>
      case "ARCHIVED":
        return <Badge variant="secondary" className="gap-1"><Archive className="w-3 h-3" /> Archived</Badge>
      case "READ":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30 gap-1"><MailCheck className="w-3 h-3" /> Read</Badge>
      default:
        return <Badge className="bg-amber-500 text-amber-950 font-bold gap-1 animate-pulse"><Clock className="w-3 h-3" /> New Unread</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Messages & Inquiries</h1>
        <p className="text-muted-foreground mt-1">
          Review, manage, and respond to messages submitted via the website Contact Us page.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground">All time messages</p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-400">Unread Messages</CardTitle>
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{unreadCount}</div>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/80">Requires response</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Resolved Inquiries</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{resolvedCount}</div>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">Successfully addressed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by sender name, email, subject, or message content..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-1 bg-muted p-1 rounded-md text-xs font-medium shrink-0">
            <Filter className="w-3.5 h-3.5 ml-1 text-muted-foreground" />
            {["ALL", "UNREAD", "READ", "RESOLVED", "ARCHIVED"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  statusFilter === st
                    ? "bg-background text-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {st === "ALL" ? "All Messages" : st.charAt(0) + st.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">Contact Messages ({filteredMessages.length})</CardTitle>
          <CardDescription>Click on any message to view full details and manage inquiry status.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {filteredMessages.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground space-y-2">
              <MessageSquare className="w-10 h-10 mx-auto opacity-40" />
              <p className="font-medium text-base">No contact messages found</p>
              <p className="text-xs">Try clearing search or changing status filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-4 hover:bg-muted/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer ${
                    msg.status === "UNREAD" ? "bg-amber-500/5 font-medium" : ""
                  }`}
                  onClick={() => handleOpenDetail(msg)}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-bold text-base text-foreground">
                        {msg.firstName} {msg.lastName}
                      </h3>
                      <Badge variant="outline" className="font-semibold text-xs text-primary bg-primary/10">
                        {msg.subject}
                      </Badge>
                      {getStatusBadge(msg.status)}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {msg.message}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap pt-0.5">
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {msg.email}</span>
                      {msg.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {msg.phone}</span>}
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenDetail(msg)
                      }}
                      className="gap-1 font-semibold text-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-primary" /> Read Message
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(msg.id)
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

      {/* Message Detail Modal / Overlay */}
      {selectedMsg && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          onClick={() => setSelectedMsg(null)}
        >
          <Card 
            className="w-full max-w-2xl max-h-[90vh] flex flex-col border-2 shadow-2xl bg-card overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Navigation */}
            <div className="bg-muted/60 border-b px-6 py-2.5 flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedMsg(null)}
                className="gap-1.5 text-xs font-bold bg-background shadow-xs hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 text-primary" /> Back to Messages List
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono hidden sm:inline">Press Esc to close</span>
                <Button variant="ghost" size="icon" onClick={() => setSelectedMsg(null)} className="h-8 w-8 rounded-full">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Modal Header */}
            <CardHeader className="border-b bg-card pb-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <CardTitle className="text-xl font-bold">{selectedMsg.firstName} {selectedMsg.lastName}</CardTitle>
                    {getStatusBadge(selectedMsg.status)}
                  </div>
                  <CardDescription className="text-xs mt-1">
                    Subject: <strong className="text-foreground">{selectedMsg.subject}</strong> • Submitted {new Date(selectedMsg.createdAt).toLocaleString()}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            {/* Content Body */}
            <CardContent className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              {/* Status Action Buttons */}
              <div className="p-4 rounded-xl bg-muted/40 border space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Inquiry Status Action</h4>
                <div className="flex flex-wrap items-center gap-2">
                  <Button 
                    size="sm" 
                    variant={selectedMsg.status === "READ" ? "default" : "outline"}
                    onClick={() => handleStatusChange("READ")}
                    disabled={isUpdating}
                    className="gap-1.5 text-xs"
                  >
                    <MailCheck className="w-3.5 h-3.5" /> Mark Read
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedMsg.status === "RESOLVED" ? "default" : "outline"}
                    onClick={() => handleStatusChange("RESOLVED")}
                    disabled={isUpdating}
                    className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Resolve Inquiry
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedMsg.status === "ARCHIVED" ? "secondary" : "outline"}
                    onClick={() => handleStatusChange("ARCHIVED")}
                    disabled={isUpdating}
                    className="gap-1.5 text-xs"
                  >
                    <Archive className="w-3.5 h-3.5" /> Archive
                  </Button>
                </div>
              </div>

              {/* Sender Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-muted/20 border text-xs">
                <div>
                  <strong className="text-muted-foreground block mb-0.5">Email Address:</strong>
                  <a href={`mailto:${selectedMsg.email}`} className="text-primary font-medium hover:underline flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> {selectedMsg.email}
                  </a>
                </div>
                <div>
                  <strong className="text-muted-foreground block mb-0.5">Phone Number:</strong>
                  {selectedMsg.phone ? (
                    <a href={`tel:${selectedMsg.phone}`} className="text-foreground font-medium hover:underline flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> {selectedMsg.phone}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">Not provided</span>
                  )}
                </div>
              </div>

              {/* Message Body */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Message Content</h4>
                <div className="p-4 rounded-xl bg-muted/30 border text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                  {selectedMsg.message}
                </div>
              </div>

              {/* Internal Admin Notes */}
              <div className="space-y-2 pt-2 border-t">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Internal Response Notes
                </h4>
                <Textarea 
                  placeholder="Record call summary, response email notes, assigned team member..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="bg-background text-xs"
                />
                <Button size="sm" onClick={handleSaveNotes} disabled={isUpdating} className="gap-1.5 text-xs">
                  <Save className="w-3.5 h-3.5" /> Save Admin Notes
                </Button>
              </div>
            </CardContent>

            {/* Bottom Footer */}
            <CardFooter className="border-t bg-muted/30 px-6 py-3 flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedMsg(null)}
                className="gap-1.5 text-xs font-bold"
              >
                <ArrowLeft className="w-4 h-4 text-primary" /> Back to Messages List
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedMsg(null)}
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
