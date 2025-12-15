import Link from "next/link"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DiplomaCard } from "@/components/diploma-card"
import { NoticeCard } from "@/components/notice-card"
import { ProgramCard } from "@/components/program-card"
import { UpdateTag } from "@/components/update-tag"
import { DirectorStrip } from "@/components/director-strip"
import { ObjectivesBlock } from "@/components/objectives-block"
import { Testimonials } from "@/components/testimonials"
import { IncubatorTrust } from "@/components/incubator-trust"
import { director, objectives, testimonials, incubator } from "@/app/_data/legacy"
import { Trophy, GraduationCap, ArrowRight, Rocket, TrendingUp, Clock, Phone, Mail, MessageCircle, MapPin } from "lucide-react"

// TODO: replace with the actual STEP asset URLs or move files into /public and point there.
const HERO_VIDEO =
  "/drone-footage.mp4" // <- update path
const HERO_POSTER =
  "https://stepgndec.com/wp-content/uploads/hero-poster.jpg" // <- update path

export const metadata = {
  title: "STEP – Train. Incubate. Launch.",
  description:
    "One-year Diplomas & PG Diplomas,industrial trainings, and entrepreneurship programs at GNDEC, Ludhiana – with results, notices, and startup updates."
}

// Mock data (replace from DB/admin later)
const diplomas = [
  { slug: "diploma-computer-application", title: "Diploma in Computer Application (DCA)", blurb: "Software basics, office automation & practical computing.", duration: "1 Year", eligibility: "+2", fee: "—" },
  { slug: "diploma-business-administration", title: "Diploma in Business Administration (DBA)", blurb: "Foundational business skills for jobs & family businesses.", duration: "1 Year", eligibility: "+2", fee: "—" },
  { slug: "diploma-fashion-technology", title: "Diploma in Fashion Technology", blurb: "Design, pattern-making & garment production.", duration: "1 Year", eligibility: "+2", fee: "—" },
  { slug: "diploma-cad-cnc", title: "Diploma in CAD & CNC Programming", blurb: "CAD modelling with CNC programming basics.", duration: "1 Year", eligibility: "+2", fee: "—" }
]

const notices = [
  { id: "1", title: "Admissions Open (Diploma/PG Diploma)", slug: "admissions-open", excerpt: "Apply now. Limited seats.", date: "2025-10-20", pinned: true },
  { id: "2", title: "Exam Results Published", slug: "exam-results", excerpt: "Check your result using roll number.", date: "2025-10-25", pinned: true }
]

const startups = [
  { name: "TechSolve", href: "/startups/techsolve" },
  { name: "GreenLife", href: "/startups/greenlife" },
  { name: "DataInsight", href: "/startups/datainsight" },
  { name: "EduTech Pro", href: "/startups/edutech-pro" }
]

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* HERO with background video */}
      <section className="relative isolate">
        {/* Video bg */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-none">
          <iframe 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]"
            src="https://www.youtube.com/embed/ybtlmX3yPEk?autoplay=1&mute=1&loop=1&playlist=ybtlmX3yPEk&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1" 
            title="STEP GNDEC Background Video" 
            allow="autoplay; encrypted-media" 
            aria-hidden="true"

          />
          {/* Gradient scrim for readability */}
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-tr from-black/70 via-black/45 to-black/25" />
        </div>


        <Container>
          <div className="py-16 lg:py-24 grid items-center gap-8 md:grid-cols-2">
            <div className="text-white">
              <p className="text-sm tracking-wide opacity-90">Science & Technology Entrepreneurs’ Park, GNDEC</p>
              <h1 className="mt-2 text-4xl md:text-6xl font-bold leading-tight">
                Train. <span className="text-accent">Incubate.</span> Launch.
              </h1>
              <p className="mt-4 text-lg md:text-xl opacity-90">
                One-year Diplomas & PG Diplomas,industrial trainings, and entrepreneurship programs - all under one roof in Ludhiana.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/apply"><GraduationCap className="mr-2 h-5 w-5" /> Apply</Link>
                </Button>
                <Button size="lg" variant="outline" className="" asChild>
                  <Link href="/diplomas">View Diplomas <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/results"><Trophy className="mr-2 h-5 w-5" /> Check Results</Link>
                </Button>
              </div>
            </div>

            {/* Quick Facts card */}
            <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5 shadow-2xl ring-2 ring-black/10">
              <h3 className="text-center text-xl font-semibold text-primary">Programs at STEP</h3>
              <div className="mt-5 grid gap-4">
                <Block title="One-Year Diplomas" items={["DCA", "DBA", "Fashion", "CAD-CNC"]} />
                <Block title="PG Diplomas" items={["PGDCA", "PGDBA"]} />
                <Block title="Industrial Trainings" items={["Python", "Django", "Web Design"]} />
                <Block title="Entrepreneurship" items={["EAC", "EDP"]} />
              </div>
              {/* <p className="mt-3 text-center text-xs text-muted-foreground">
              Details as per official sections; see Diplomas, Results & Entrepreneurship pages.
              </p> */}
            </div>
          </div>
        </Container>
      </section>


      {/* INSTITUTE OBJECTIVES */}
      <ObjectivesBlock objectives={objectives} />

      {/* TESTIMONIALS */}
      <Testimonials testimonials={testimonials} />

      {/* DIPLOMA HIGHLIGHTS */}
      <section className="py-14">
        <Container>
          <Header title="Diploma Highlights" subtitle="Professional diplomas designed for industry readiness" cta={{ label: "View all", href: "/diplomas" }} />
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {diplomas.map((d) => (
              <DiplomaCard key={d.slug} {...d} />
            ))}
          </div>
        </Container>
      </section>
      {/* INCUBATOR TRUST */}
      <IncubatorTrust incubator={incubator} />

      {/* DIRECTOR MESSAGE */}
      <DirectorStrip director={director} />


      {/* NOTICE BOARD + RESULTS */}
      {/* <section className="bg-brand-50/40 py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Notice Board</h2>
                <UpdateTag variant="info">Live</UpdateTag>
              </div>
              <div className="grid gap-3">
                {notices.map((n) => <NoticeCard key={n.id} notice={n} />)}
              </div>
              <div className="mt-5">
                <Button variant="outline" asChild><Link href="/notices">View all</Link></Button>
              </div>
            </div>

            {/* Results callout
            <div>
              <Card className="border-primary/20 bg-linear-to-br from-primary/5 to-brand-600/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /> Check Your Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Enter your roll number to view results. Some exams may require DOB verification.
                  </p>
                  <div className="mt-4 space-y-3">
                    <Button className="w-full" asChild><Link href="/results">View Results</Link></Button>
                    <Button variant="outline" className="w-full" asChild><Link href="/notices">Latest Result Notices</Link></Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section> */}

      {/* ENTREPRENEURSHIP */}
      <section className="py-14">
        <Container>
          <Header
            title="Entrepreneurship @ STEP"
            subtitle="Right place to turn ideas into businesses with guidance & support"
            cta={{ label: "Explore programs", href: "/entrepreneurship" }}
            icon={<Rocket className="h-8 w-8 text-primary" />}
          />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <ProgramCard
              title="Entrepreneurship Awareness Camp (EAC)"
              description="Spark entrepreneurial thinking & explore opportunity identification."
              duration="3 Days"
              participants="—"
              href="/entrepreneurship"
              applyHref="/apply"
            />
            <ProgramCard
              title="Entrepreneurship Development Programme (EDP)"
              description="From idea to plan to execution with mentoring & reviews."
              duration="6–8 Weeks"
              participants="—"
              href="/entrepreneurship"
              applyHref="/apply"
            />
          </div>
        </Container>
      </section>

      {/* STARTUPS SPOTLIGHT */}
      <section className="bg-brand-50/30 py-14">
        <Container>
          <Header title="Startups & Companies" subtitle="A glimpse of incubated teams and their journeys" cta={{ label: "View portfolio", href: "/startups" }} icon={<TrendingUp className="h-8 w-8 text-primary" />} />
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {startups.map((s) => (
              <Card key={s.name} className="transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <Link href={s.href} className="block text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-linear-to-br from-primary to-brand-600 text-white">
                      {s.name[0]}
                    </div>
                    <p className="font-medium">{s.name}</p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CONTACT STRIP (single source of truth) */}
      <section className="border-y border-border bg-card py-10">
        <Container>
          <div className="grid items-center gap-6 text-center md:grid-cols-2 lg:grid-cols-4">
            <ContactItem icon={<Phone className="h-7 w-7 text-primary" />} title="Call" body={<a href="tel:+917837100954" className="hover:text-primary">+91 78371 00954</a>} />
            <ContactItem icon={<Mail className="h-7 w-7 text-primary" />} title="Email" body={<a href="mailto:info@stepgndec.com" className="hover:text-primary">info@stepgndec.com</a>} />
            <ContactItem icon={<MessageCircle className="h-7 w-7 text-green-600" />} title="WhatsApp" body={<a href="https://wa.me/917837100954" className="hover:text-green-600">+91 78371 00954</a>} />
            <ContactItem icon={<MapPin className="h-7 w-7 text-primary" />} title="Visit" body={<span className="text-sm text-muted-foreground">STEP-GNDEC, Gill’s Garden Road, Ludhiana – 141006</span>} />
          </div>
          <div className="mt-6 border-t border-border pt-4 text-center text-sm text-muted-foreground">
            <Clock className="mr-1 inline h-4 w-4 align-[-2px]" />
            Mon–Fri 09:00–17:00 · Sat 09:00–13:00
          </div>
        </Container>
      </section>
    </div>
  )
}

/* ---------- small internals ---------- */

function Header({
  title,
  subtitle,
  cta,
  icon
}: {
  title: string
  subtitle?: string
  cta?: { label: string; href: string }
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-end justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      {cta ? (
        <Link href={cta.href} className="text-sm underline">
          {cta.label}
        </Link>
      ) : null}
    </div>
  )
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <h4 className="font-medium text-primary">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <span key={i} className="inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-foreground">
            {i}
          </span>
        ))}
      </div>
    </div>
  )
}

function ContactItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2">{icon}</div>
      <p className="font-medium">{title}</p>
      <div className="text-muted-foreground">{body}</div>
    </div>
  )
}
