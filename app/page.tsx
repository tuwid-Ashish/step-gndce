import Link from "next/link"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DiplomaCard } from "@/components/diploma-card"
import { DirectorStrip } from "@/components/director-strip"
import { ObjectivesBlock } from "@/components/objectives-block"
import { Testimonials } from "@/components/testimonials"
import { IncubatorTrust } from "@/components/incubator-trust"
import { director, objectives, testimonials, incubator } from "@/app/_data/legacy"
import { Trophy, GraduationCap, ArrowRight, TrendingUp,} from "lucide-react"
import { prisma } from "@/lib/prisma"

// TODO: replace with the actual STEP asset URLs or move files into /public and point there.
const HERO_POSTER ="/image.png" // <- update path

export const metadata = {
  title: "STEP - Train. Incubate. Launch.",
  description:
    "One-year Diplomas & PG Diplomas,industrial trainings, and entrepreneurship programs at GNDEC, Ludhiana"
}

const diplomasData = await prisma.course.findMany({
    where: {
      type: "DIPLOMA",
      isActive: true
    },
    select: {
      id: true,
      slug: true,
      code: true,
      title: true,
      description: true,
      category: true,
      duration: true,
      eligibility: true,
      highlights: true,
    },
    orderBy:{
      createdAt: "asc"
    },
    take: 4
  })

// Mock data (replace from DB/admin later)

const startups = [
  { name: "My Virtual Teams", href: "/startups/" },
  { name: "Radius 7 Innovation", href: "/startups/" },
  { name: "Invent Infotech", href: "/startups/" },
  { name: "Wesualize Design", href: "/startups/" }
]

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* HERO with background video */}
      <section className="relative isolate">
        {/* Video bg */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-none pointer-events-none select-none">
          {/* Poster image for loading state */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_POSTER})` }} />
          <iframe 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[56.25vw] min-h-screen min-w-[177.77vh] pointer-events-none"
            src="https://www.youtube.com/embed/ybtlmX3yPEk?autoplay=1&mute=1&loop=1&playlist=ybtlmX3yPEk&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1" 
            title="STEP GNDEC Background Video" 
            allow="autoplay; encrypted-media" 
            aria-hidden="true"
          />
          {/* Gradient scrim for readability */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/45" />
        </div>


        <Container>
          <div className="py-16 lg:py-24 grid items-center gap-8 md:grid-cols-2">
            <div className="text-white space-y-4">
              <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-amber-400/90">Science & Technology Entrepreneurs’ Park, GNDEC</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Train. <span className="text-amber-400">Incubate.</span> Launch.
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                One-year Diplomas & PG Diplomas, industrial trainings, and entrepreneurship programs — all under one roof in Ludhiana.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Button size="lg" className="font-bold shadow-lg hover:shadow-xl transition-all" asChild>
                  <Link href="/apply"><GraduationCap className="mr-2 h-5 w-5" /> Apply Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white font-semibold backdrop-blur-md" asChild>
                  <Link href="/diplomas">View Diplomas <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white font-semibold backdrop-blur-md" asChild>
                  <Link href="/results"><Trophy className="mr-2 h-5 w-5 text-amber-400" /> Check Results</Link>
                </Button>
              </div>
            </div>

            {/* Quick Facts card */}
            <div className="rounded-2xl border border-white/15 bg-black/50 backdrop-blur-xl p-6 md:p-8 shadow-2xl ring-1 ring-white/10 text-white space-y-5">
              <h3 className="text-center text-xl font-bold tracking-wide text-amber-400">
                Programs at STEP
              </h3>
              <div className="grid gap-4.5">
                <Block title="One-Year Diplomas" items={["DCA", "DBA", "Fashion", "CAD-CNC"]} />
                <Block title="PG Diplomas" items={["PGDCA", "PGDBA"]} />
                <Block title="Industrial Trainings" items={["Python", "Django", "Web Design"]} />
                <Block title="Entrepreneurship" items={["EAC", "EDP"]} />
              </div>
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
            {diplomasData.map((d) => (
              <DiplomaCard key={d.slug} {...d} />
            ))}
          </div>
        </Container>
      </section>
      {/* INCUBATOR TRUST */}
      <IncubatorTrust incubator={incubator} />

      {/* DIRECTOR MESSAGE */}
      <DirectorStrip director={director} />

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
      {/* <section className="border-y border-border bg-card py-10">
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
      </section> */}
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
    <div className="space-y-1.5">
      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300/90">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <span 
            key={i} 
            className="inline-flex items-center rounded-lg bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/15 hover:bg-white/20 hover:border-amber-400/40 transition-all shadow-xs"
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  )
}

// function ContactItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: React.ReactNode }) {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="mb-2">{icon}</div>
//       <p className="font-medium">{title}</p>
//       <div className="text-muted-foreground">{body}</div>
//     </div>
//   )
// }
