import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, TrendingUp, ExternalLink, Rocket } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Startups",
  description: "Discover the innovative startups incubated at STEP Institute"
}

export default async function StartupsPage() {
  const startups = await prisma.startup.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  })

  const totalStartups = startups.length
  const startupsOnly = startups.filter((s) => s.type === "STARTUP")
  const companies = startups.filter((s) => s.type === "COMPANY")
  const graduated = startups.filter((s) => s.status === "GRADUATED")

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Startup Portfolio</h1>
            <p className="text-xl text-muted-foreground">
              Discover the innovative startups and companies that have grown with our incubation program
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Building2 className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle>{totalStartups}</CardTitle>
                <CardDescription>Total Ventures</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Rocket className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle>{startupsOnly.length}</CardTitle>
                <CardDescription>Active Startups</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle>{graduated.length}</CardTitle>
                <CardDescription>Graduated</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {startups.length === 0 ? (
            <div className="bg-brand-50 rounded-lg p-12 text-center">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground mb-6">
                Our startup portfolio will be available soon. Stay tuned for exciting ventures!
              </p>
            </div>
          ) : (
            <>
              {/* Startup Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {startups.map((startup) => (
                  <Card key={startup.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        {startup.logoUrl ? (
                          <div className="h-12 w-12 rounded-lg overflow-hidden mb-3">
                            <img
                              src={startup.logoUrl}
                              alt={startup.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                            <Building2 className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <Badge
                          className={
                            startup.status === "GRADUATED"
                              ? "bg-green-600"
                              : startup.status === "ACTIVE"
                              ? "bg-blue-600"
                              : "bg-orange-600"
                          }
                        >
                          {startup.status === "GRADUATED"
                            ? "Graduated"
                            : startup.status === "ACTIVE"
                            ? "Active"
                            : "Incubating"}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">
                        <Link 
                          href={`/startups/${startup.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {startup.name}
                        </Link>
                      </CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mr-2">
                          {startup.type === "STARTUP" ? "Startup" : "Company"}
                        </Badge>
                        {startup.sector}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {startup.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Key Highlights:</h4>
                        <ul className="text-xs space-y-1">
                          {startup.highlights.slice(0, 2).map((highlight, index) => (
                            <li key={index} className="text-muted-foreground">
                              • {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link href={`/startups/${startup.slug}`}>View Details</Link>
                        </Button>
                        {startup.websiteUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={startup.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  )
}