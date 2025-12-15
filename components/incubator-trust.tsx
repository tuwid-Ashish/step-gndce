import { Button } from "@/components/ui/button"
import { Lightbulb, Rocket, Users, Award } from "lucide-react"
import Link from "next/link"


interface IncubatorTrustProps {
  incubator: {
    tagline: string
    bullets: string[]
  }
}

const icons = [Lightbulb, Rocket, Users, Award]

export function IncubatorTrust({ incubator }: IncubatorTrustProps) {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="mx-auto max-w-[1320px] px-5">
        <div className="text-center mb-8">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Entrepreneurship & Innovation Hub
          </h2>
          <p className="text-muted-foreground">{incubator.tagline}</p>
        </div>
        
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {incubator.bullets.map((bullet, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div 
                key={i} 
                className="rounded-xl border border-border bg-card p-5 text-center shadow-sm"
              >
                <Icon 
                  className="mx-auto mb-3 h-8 w-8 text-primary" 
                  aria-hidden="true"
                />
                <p className="text-sm font-medium">{bullet}</p>
              </div>
            )
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/entrepreneurship">Explore Programs</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/startups">View Startups</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
