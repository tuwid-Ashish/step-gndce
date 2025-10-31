import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Startups",
  description: "Discover the innovative startups incubated at STEP Institute"
}

// Mock startup data
const mockStartups = [
  {
    id: "1",
    name: "TechFlow Solutions",
    slug: "techflow-solutions",
    sector: "Software Development",
    description: "AI-powered workflow automation platform for small businesses",
    status: "active" as const,
    highlights: ["₹2Cr revenue in first year", "50+ enterprise clients", "Team of 15 developers"]
  },
  {
    id: "2",
    name: "AgriSmart Analytics", 
    slug: "agrismart-analytics",
    sector: "Agriculture Technology",
    description: "IoT-based crop monitoring and yield prediction system",
    status: "graduated" as const,
    highlights: ["Deployed across 500+ farms", "25% increase in crop yield", "Recognized by govt schemes"]
  },
  {
    id: "3",
    name: "EduConnect Platform",
    slug: "educonnect-platform", 
    sector: "Education Technology",
    description: "Interactive learning platform connecting students with expert tutors",
    status: "incubated" as const,
    highlights: ["10,000+ active users", "Partnerships with 50+ schools", "Mobile app with 4.8★ rating"]
  }
]

export default function StartupsPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Startup Portfolio</h1>
            <p className="text-xl text-muted-foreground">
              Discover the innovative startups that have grown with our incubation program
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Building2 className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle>150+</CardTitle>
                <CardDescription>Total Startups Incubated</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle>85%</CardTitle>
                <CardDescription>Success Rate</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle>₹50Cr+</CardTitle>
                <CardDescription>Combined Valuation</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Startup Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStartups.map((startup) => (
              <Card key={startup.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      startup.status === 'graduated' ? 'bg-success/10 text-success' :
                      startup.status === 'active' ? 'bg-info/10 text-info' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {startup.status === 'graduated' ? 'Graduated' :
                       startup.status === 'active' ? 'Active' : 'Incubating'}
                    </span>
                  </div>
                  <CardTitle className="text-lg">
                    <Link 
                      href={`/startups/${startup.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {startup.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{startup.sector}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {startup.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Achievements:</h4>
                    <ul className="text-xs space-y-1">
                      {startup.highlights.slice(0, 2).map((highlight, index) => (
                        <li key={index} className="text-muted-foreground">
                          • {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                    <Link href={`/startups/${startup.slug}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* TODO: Add more sections */}
          <div className="bg-brand-50 rounded-lg p-6 mt-12">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Startup founder interviews and case studies</li>
              <li>• Investment opportunities portal</li>
              <li>• Startup events and demo days</li>
              <li>• Mentor network and advisory board</li>
              <li>• Partnership opportunities</li>
              <li>• Alumni startup directory</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}