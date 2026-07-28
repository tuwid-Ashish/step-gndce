"use client"

import { useState, useRef } from "react"
import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, GraduationCap, Rocket, CheckCircle, ArrowDown, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react"
import { submitApplication } from "@/app/actions/application"

export default function ApplyPage() {
  const [selectedProgram, setSelectedProgram] = useState<"TRAINING" | "INCUBATION" | "BOTH">("TRAINING")
  const [specificProgram, setSpecificProgram] = useState<string>("")
  const [qualification, setQualification] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [highlightForm, setHighlightForm] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success?: boolean; applicationId?: string; error?: string } | null>(null)

  const formRef = useRef<HTMLDivElement>(null)

  const handleProgramSelect = (program: "TRAINING" | "INCUBATION") => {
    setSelectedProgram(program)
    setSpecificProgram("")
    
    // Trigger highlight ring animation
    setHighlightForm(true)
    setTimeout(() => setHighlightForm(false), 2500)

    // Smooth scroll to form
    if (formRef.current) {
      const offset = 80 // header offset
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = formRef.current.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    const formData = new FormData(e.currentTarget)
    formData.set("programType", selectedProgram)
    formData.set("specificProgram", specificProgram)
    formData.set("qualification", qualification)

    const result = await submitApplication(formData)
    setIsSubmitting(false)

    if (result.success) {
      setSubmitResult(result)
      // Reset form fields
      ;(e.target as HTMLFormElement).reset()
      setSpecificProgram("")
      setQualification("")
    } else {
      setSubmitResult({ error: result.error || "Failed to submit application." })
    }
  }

  return (
    <div className="py-12 bg-gradient-to-b from-background via-muted/20 to-background min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-4 h-4" /> Official Application Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Apply to <span className="text-primary">STEP Institute</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your path: Upskill with cutting-edge training programs or turn your startup idea into reality with full incubation support.
            </p>
          </div>

          {/* Program Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Training Card */}
            <Card 
              className={`relative overflow-hidden transition-all duration-300 border-2 cursor-pointer ${
                selectedProgram === "TRAINING" 
                  ? "border-primary shadow-xl ring-2 ring-primary/20 bg-card" 
                  : "border-border hover:border-primary/50 hover:shadow-md"
              }`}
              onClick={() => handleProgramSelect("TRAINING")}
            >
              {selectedProgram === "TRAINING" && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <GraduationCap className="h-9 w-9" />
                </div>
                <CardTitle className="text-2xl font-bold">Training Programs</CardTitle>
                <CardDescription className="text-sm mt-1">
                  Skill development programs in high-demand technology and management domains
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span><strong>6 - 8 Months</strong> hands-on training duration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Industry-relevant project-based curriculum</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>100% Placement assistance & interview prep</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>STEP & GNDCE recognized certification</span>
                  </li>
                </ul>

                <Button 
                  type="button"
                  size="lg"
                  className="w-full gap-2 font-semibold shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProgramSelect("TRAINING")
                  }}
                >
                  <span>Apply for Training</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </Button>
              </CardContent>
            </Card>

            {/* Incubation Card */}
            <Card 
              className={`relative overflow-hidden transition-all duration-300 border-2 cursor-pointer ${
                selectedProgram === "INCUBATION" 
                  ? "border-primary shadow-xl ring-2 ring-primary/20 bg-card" 
                  : "border-border hover:border-primary/50 hover:shadow-md"
              }`}
              onClick={() => handleProgramSelect("INCUBATION")}
            >
              {selectedProgram === "INCUBATION" && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Rocket className="h-9 w-9" />
                </div>
                <CardTitle className="text-2xl font-bold">Startup Incubation</CardTitle>
                <CardDescription className="text-sm mt-1">
                  Comprehensive incubation support for startup ideas and early-stage ventures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span><strong>12 Months</strong> intensive incubation program</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Seed funding assistance up to ₹10 Lakhs</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>1-on-1 industry mentorship & investor pitch access</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Dedicated co-working space & lab infrastructure</span>
                  </li>
                </ul>

                <Button 
                  type="button"
                  variant="outline"
                  size="lg"
                  className={`w-full gap-2 font-semibold border-2 ${
                    selectedProgram === "INCUBATION" 
                      ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90" 
                      : "hover:border-primary hover:text-primary"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProgramSelect("INCUBATION")
                  }}
                >
                  <span>Apply for Incubation</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Form Anchor Container */}
          <div 
            ref={formRef} 
            className={`transition-all duration-500 rounded-2xl scroll-mt-24 ${
              highlightForm 
                ? "ring-4 ring-primary shadow-2xl scale-[1.01]" 
                : ""
            }`}
          >
            <Card className="border-2 shadow-lg bg-card">
              <CardHeader className="border-b bg-muted/40 pb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      <FileText className="h-6 w-6 text-primary" />
                      STEP Application Form
                    </CardTitle>
                    <CardDescription className="text-base mt-1">
                      Complete the form below to submit your application directly to our team.
                    </CardDescription>
                  </div>

                  {/* Program Selector Tabs inside Form */}
                  <div className="flex items-center p-1 bg-muted rounded-lg border text-xs font-medium shrink-0">
                    <button
                      type="button"
                      onClick={() => setSelectedProgram("TRAINING")}
                      className={`px-3 py-1.5 rounded-md transition-all ${
                        selectedProgram === "TRAINING"
                          ? "bg-background text-foreground shadow-xs font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Training
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProgram("INCUBATION")}
                      className={`px-3 py-1.5 rounded-md transition-all ${
                        selectedProgram === "INCUBATION"
                          ? "bg-background text-foreground shadow-xs font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Incubation
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProgram("BOTH")}
                      className={`px-3 py-1.5 rounded-md transition-all ${
                        selectedProgram === "BOTH"
                          ? "bg-background text-foreground shadow-xs font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Both
                    </button>
                  </div>
                </div>

                {/* Active Selection Alert Banner */}
                <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>
                      Applying for: <strong>
                        {selectedProgram === "TRAINING" && "Training Programs"}
                        {selectedProgram === "INCUBATION" && "Startup Incubation"}
                        {selectedProgram === "BOTH" && "Training + Incubation (Combined)"}
                      </strong>
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground hidden sm:inline">Fill required fields below</span>
                </div>
              </CardHeader>

              <CardContent className="p-6 md:p-8">
                {/* Submission Success Alert */}
                {submitResult?.success && (
                  <div className="mb-8 p-6 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-950 dark:text-emerald-200 space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold">Application Submitted Successfully!</h3>
                        <p className="text-sm opacity-90">
                          Thank you for applying. Your application reference code is{" "}
                          <code className="px-2 py-0.5 rounded bg-emerald-500/20 font-mono font-bold text-base">
                            #{submitResult.applicationId?.slice(-6).toUpperCase()}
                          </code>
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground pl-10">
                      Our administrative team will review your application within 3-5 business days and contact you via email or phone.
                    </p>
                    <div className="pt-2 pl-10">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSubmitResult(null)}
                        className="gap-1.5 border-emerald-500/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/10"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Submit Another Application
                      </Button>
                    </div>
                  </div>
                )}

                {/* Submission Error Alert */}
                {submitResult?.error && (
                  <div className="mb-8 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive flex items-center gap-3 text-sm font-medium">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{submitResult.error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Section 1: Personal Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2 text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-extrabold">1</span>
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-semibold">First Name *</Label>
                        <Input id="firstName" name="firstName" placeholder="e.g. Gurpreet" required className="bg-background" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-semibold">Last Name *</Label>
                        <Input id="lastName" name="lastName" placeholder="e.g. Singh" required className="bg-background" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold">Email Address *</Label>
                        <Input id="email" name="email" type="email" placeholder="gurpreet@example.com" required className="bg-background" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold">Phone Number *</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required className="bg-background" />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Educational Background */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2 text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-extrabold">2</span>
                      Educational Background
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="qualification" className="text-sm font-semibold">Highest Qualification *</Label>
                        <Select value={qualification} onValueChange={setQualification} required>
                          <SelectTrigger className="w-full bg-background border-input shadow-xs text-foreground font-medium">
                            <SelectValue placeholder="Select highest qualification" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover text-popover-foreground border border-border shadow-xl z-50">
                            <SelectItem value="10th">10th Matriculation</SelectItem>
                            <SelectItem value="12th">12th Senior Secondary</SelectItem>
                            <SelectItem value="diploma">Polytechnic Diploma</SelectItem>
                            <SelectItem value="bachelor">Bachelor&apos;s Degree (B.Tech/BCA/B.Sc/etc.)</SelectItem>
                            <SelectItem value="master">Master&apos;s Degree (M.Tech/MCA/MBA/etc.)</SelectItem>
                            <SelectItem value="phd">PhD / Doctorate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institution" className="text-sm font-semibold">Institution / College Name</Label>
                        <Input id="institution" name="institution" placeholder="e.g. GNDEC Ludhiana" className="bg-background" />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Program Preferences */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2 text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-extrabold">3</span>
                      Program Choice & Specialization
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="programType" className="text-sm font-semibold">Program Category *</Label>
                        <Select 
                          value={selectedProgram} 
                          onValueChange={(val: "TRAINING" | "INCUBATION" | "BOTH") => {
                            setSelectedProgram(val)
                            setSpecificProgram("")
                          }}
                        >
                          <SelectTrigger className="w-full bg-background border-input shadow-xs text-foreground font-medium">
                            <SelectValue placeholder="Select program category" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover text-popover-foreground border border-border shadow-xl z-50">
                            <SelectItem value="TRAINING">Training Program</SelectItem>
                            <SelectItem value="INCUBATION">Startup Incubation</SelectItem>
                            <SelectItem value="BOTH">Both (Training & Incubation)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specificProgram" className="text-sm font-semibold">Specific Domain / Stream</Label>
                        <Select value={specificProgram} onValueChange={setSpecificProgram}>
                          <SelectTrigger className="w-full bg-background border-input shadow-xs text-foreground font-medium">
                            <SelectValue placeholder="Select domain specialization" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover text-popover-foreground border border-border shadow-xl z-50 max-h-60">
                            {selectedProgram === "TRAINING" && (
                              <>
                                <SelectItem value="fullstack">Full Stack Web Development</SelectItem>
                                <SelectItem value="datascience">Data Science, Machine Learning & AI</SelectItem>
                                <SelectItem value="mobile">Mobile App Development (Flutter/React Native)</SelectItem>
                                <SelectItem value="cybersecurity">Cybersecurity & Ethical Hacking</SelectItem>
                                <SelectItem value="cad_cam">CAD / CAM & Industrial Design</SelectItem>
                                <SelectItem value="digital_marketing">Digital Marketing & E-Commerce</SelectItem>
                              </>
                            )}

                            {selectedProgram === "INCUBATION" && (
                              <>
                                <SelectItem value="pre_incubation">Pre-Incubation (Idea / Prototype Stage)</SelectItem>
                                <SelectItem value="full_incubation">Full Incubation (Early Stage Startup)</SelectItem>
                                <SelectItem value="tech_commercialization">Tech Commercialization & Patent Support</SelectItem>
                                <SelectItem value="scaleup">Scale-Up & Investor Readiness Accelerator</SelectItem>
                              </>
                            )}

                            {selectedProgram === "BOTH" && (
                              <>
                                <SelectItem value="fullstack_preinc">Full Stack Dev + Pre-Incubation</SelectItem>
                                <SelectItem value="datascience_inc">AI & Data Science + Startup Incubation</SelectItem>
                                <SelectItem value="general_both">General Combined Program</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Experience & Motivation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2 text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-extrabold">4</span>
                      Experience & Statement of Purpose
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-sm font-semibold">Prior Experience / Projects (Optional)</Label>
                      <Textarea 
                        id="experience" 
                        name="experience"
                        placeholder="Briefly describe any relevant projects, technical skills, or business experience..."
                        rows={3}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motivation" className="text-sm font-semibold">Why do you want to join STEP Institute? *</Label>
                      <Textarea 
                        id="motivation" 
                        name="motivation"
                        placeholder="Tell us about your career or business goals and how this program will help you achieve them..."
                        rows={3}
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full text-base font-bold h-12 shadow-md hover:shadow-lg transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin" /> Submitting Application...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <FileText className="w-5 h-5" /> Submit Application
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Process Timeline */}
          <div className="bg-card border-2 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-center mb-6">What Happens After You Submit?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center space-y-2 p-4 rounded-xl bg-muted/40">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-base font-bold shadow-xs">1</div>
                <h3 className="font-bold text-base">Application Screening</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">Our evaluation panel reviews your profile and motivation statement within 3-5 business days.</p>
              </div>
              <div className="text-center space-y-2 p-4 rounded-xl bg-muted/40">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-base font-bold shadow-xs">2</div>
                <h3 className="font-bold text-base">Interaction / Interview</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">Shortlisted candidates are invited for a personal interaction or pitch deck presentation.</p>
              </div>
              <div className="text-center space-y-2 p-4 rounded-xl bg-muted/40">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-base font-bold shadow-xs">3</div>
                <h3 className="font-bold text-base">Onboarding & Confirmation</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">Selected candidates receive official offer letters with program schedule and next steps.</p>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}