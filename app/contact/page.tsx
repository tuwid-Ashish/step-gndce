"use client"

import { useState } from "react"
import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, RefreshCw, MessageSquare } from "lucide-react"
import { siteConfig } from "@/components/site-config"
import { submitContactMessage } from "@/app/actions/contact"

export default function ContactPage() {
  const [subject, setSubject] = useState<string>("Admission Inquiry")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success?: boolean; messageId?: string; error?: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    const formData = new FormData(e.currentTarget)
    formData.set("subject", subject)

    const result = await submitContactMessage(formData)
    setIsSubmitting(false)

    if (result.success) {
      setSubmitResult(result)
      ;(e.target as HTMLFormElement).reset()
      setSubject("Admission Inquiry")
    } else {
      setSubmitResult({ error: result.error || "Failed to send message." })
    }
  }

  return (
    <div className="py-16 bg-gradient-to-b from-background via-muted/10 to-background min-h-screen">
      <Container>
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" /> Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact STEP Institute</h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our training programs, diploma courses, or startup incubation? Send us a message and our team will get back to you promptly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="border-2 shadow-lg bg-card overflow-hidden">
              <CardHeader className="border-b bg-muted/30 pb-6">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-sm">
                  Fill out the form below and our counseling team will respond within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                {/* Submission Success Alert */}
                {submitResult?.success && (
                  <div className="mb-6 p-6 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-950 dark:text-emerald-200 space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold">Message Sent Successfully!</h3>
                        <p className="text-sm opacity-90">
                          Thank you for reaching out. Inquiry Reference ID:{" "}
                          <code className="px-2 py-0.5 rounded bg-emerald-500/20 font-mono font-bold text-base">
                            #{submitResult.messageId?.slice(-6).toUpperCase()}
                          </code>
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground pl-10">
                      We have logged your query in our system and an admissions officer will email or call you shortly.
                    </p>
                    <div className="pt-2 pl-10">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSubmitResult(null)}
                        className="gap-1.5 border-emerald-500/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/10 text-xs"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Send Another Message
                      </Button>
                    </div>
                  </div>
                )}

                {/* Submission Error Alert */}
                {submitResult?.error && (
                  <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive flex items-center gap-3 text-sm font-medium">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{submitResult.error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-semibold">First Name *</Label>
                      <Input id="firstName" name="firstName" placeholder="e.g. Rahul" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-semibold">Last Name *</Label>
                      <Input id="lastName" name="lastName" placeholder="e.g. Verma" required className="bg-background" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email Address *</Label>
                    <Input id="email" name="email" type="email" placeholder="rahul@example.com" required className="bg-background" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold">Phone Number (Optional)</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" className="bg-background" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-semibold">Inquiry Subject *</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger className="w-full bg-background border-input shadow-xs text-foreground font-medium">
                        <SelectValue placeholder="Select inquiry subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover text-popover-foreground border border-border shadow-xl z-50">
                        <SelectItem value="Admission Inquiry">Admission Inquiry</SelectItem>
                        <SelectItem value="Training Programs">Training Programs & Courses</SelectItem>
                        <SelectItem value="Startup Incubation">Startup Incubation & Funding</SelectItem>
                        <SelectItem value="Placement Support">Placement & Internship Support</SelectItem>
                        <SelectItem value="Other">Other General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold">Your Message *</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      placeholder="Please details your questions or request..." 
                      rows={4}
                      required 
                      className="bg-background"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full font-bold h-11 text-base shadow-md hover:shadow-lg transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" /> Sending Message...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border shadow-sm bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground text-xs">Available Monday to Saturday during office hours</p>
                  <div className="space-y-1 font-medium text-foreground">
                    <a href={`tel:${siteConfig.contact.phone[0]}`} className="block hover:text-primary transition-colors">
                      {siteConfig.contact.phone[0]}
                    </a>
                    <a href={`tel:${siteConfig.contact.phone[1]}`} className="block hover:text-primary transition-colors">
                      {siteConfig.contact.phone[1]}
                    </a>
                    <a href={`tel:${siteConfig.contact.phone[2]}`} className="block hover:text-primary transition-colors">
                      {siteConfig.contact.phone[2]}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground text-xs">Send us an email anytime for detailed inquiries</p>
                  <div className="space-y-1 font-medium text-foreground">
                    <a href={`mailto:${siteConfig.contact.email}`} className="block hover:text-primary transition-colors">
                      {siteConfig.contact.email}
                    </a>
                    <a href={`mailto:${siteConfig.contact.email_2}`} className="block hover:text-primary transition-colors">
                      {siteConfig.contact.email_2}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    Campus Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-muted-foreground text-xs mb-1">Visit us at our campus</p>
                  <address className="font-medium not-italic leading-relaxed">
                    {siteConfig.contact.address}
                  </address>
                </CardContent>
              </Card>

              <Card className="border shadow-sm bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b">
                    <span>Monday - Friday</span>
                    <span className="font-bold">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span>Saturday</span>
                    <span className="font-bold">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Sunday</span>
                    <span className="font-bold text-destructive">Closed</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}