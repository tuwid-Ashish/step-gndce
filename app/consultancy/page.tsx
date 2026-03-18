import Link from "next/link"
import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Cpu, HardHat, Lightbulb, Wrench } from "lucide-react"

export const metadata = {
  title: "Industry Consultancy | STEP-GNDEC",
  description:
    "Professional consultancy for industry projects, hardware systems, and IT solutions with expert support from STEP-GNDEC.",
}

const itSolutions = [
  "Web and software solution consulting",
  "Automation and digitization roadmap",
  "Database and workflow optimization",
  "Technical implementation guidance",
]

const hardwareConsultancy = [
  "Mechanical design support and CAD drafting",
  "AutoCAD-based drawing, review, and validation",
  "Workshop and prototype development guidance",
  "Production process improvement consulting",
]

const projectSupport = [
  "Problem scoping and requirement mapping",
  "Design and execution planning",
  "Expert mentoring during implementation",
  "Documentation and final project validation",
]

export default function ConsultancyPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="mx-auto max-w-6xl space-y-12">
          <section className="rounded-xl bg-linear-to-br from-brand-50 to-background p-8 md:p-12">
            <Badge variant="outline" className="mb-4">
              Industry Collaboration Cell
            </Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Industry Project & Professional Consultancy</h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              STEP-GNDEC supports industries, startups, and institutions with practical consultancy in hardware and IT
              solutions. We handle project planning, execution guidance, and technical mentoring through our expert
              faculty and domain specialists.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contact?subject=consultancy">Request Consultancy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/apply?program=industry-consultancy">Submit Project Requirement</Link>
              </Button>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Cpu className="h-5 w-5" />
                  IT Solutions Consultancy
                </CardTitle>
                <CardDescription>Digital systems, software planning, and implementation support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {itSolutions.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-success" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <HardHat className="h-5 w-5" />
                  Hardware Consultancy
                </CardTitle>
                <CardDescription>
                  Mechanical and design-focused support including AutoCAD and practical fabrication workflows
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {hardwareConsultancy.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-success" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lightbulb className="h-5 w-5" />
                  Industry Project Handling
                </CardTitle>
                <CardDescription>End-to-end support from concept to implementation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {projectSupport.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-success" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 rounded-xl border border-border bg-muted/20 p-6 md:grid-cols-2 md:p-8">
            <div>
              <h2 className="mb-3 text-2xl font-semibold">Integrated with Our Training & Diploma Programs</h2>
              <p className="text-muted-foreground">
                Our consultancy ecosystem is backed by hands-on labs and course expertise in Mechanical, AutoCAD,
                IT, and applied technologies. This ensures practical, implementation-ready outcomes for every
                consultation project.
              </p>
            </div>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start" asChild>
                <Link href="/industrial-trainings">
                  <Wrench className="mr-2 h-4 w-4" />
                  Explore Industrial Trainings
                </Link>
              </Button>
              <Button variant="secondary" className="w-full justify-start" asChild>
                <Link href="/diplomas">
                  <HardHat className="mr-2 h-4 w-4" />
                  Explore Diploma Programs
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}