import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, Users, Target } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Startup Incubation",
  description: "Comprehensive startup incubation program at STEP Institute"
}

export default function IncubationPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Startup Incubation</h1>
            <p className="text-xl text-muted-foreground">
              Transform your innovative ideas into successful businesses with our 
              comprehensive incubation program and mentorship support
            </p>
          </div>

          {/* Incubation Stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Pre-Incubation
                </CardTitle>
                <CardDescription>3 months • Idea validation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Validate your business idea, conduct market research, and develop 
                  a solid foundation for your startup journey.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Business model validation</li>
                  <li>• Market research support</li>
                  <li>• Mentorship sessions</li>
                  <li>• Networking opportunities</li>
                </ul>
                <Button variant="outline" className="w-full">
                  <Link href="/apply?program=pre-incubation">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Full Incubation
                </CardTitle>
                <CardDescription>12 months • Business development</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Comprehensive support to build, launch, and scale your startup 
                  with funding assistance and market connections.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Funding up to ₹10 lakhs</li>
                  <li>• Office space & infrastructure</li>
                  <li>• Legal & compliance support</li>
                  <li>• Investor connections</li>
                </ul>
                <Button className="w-full">
                  <Link href="/apply?program=incubation">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Support Services */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Comprehensive Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Mentorship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    One-on-one guidance from successful entrepreneurs and industry experts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Market Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Connect with potential customers, partners, and distribution channels
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Funding Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Access to angel investors, VCs, and government funding schemes
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Success Stories Preview */}
          <div className="bg-muted/30 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Success Stories</h2>
            <p className="text-center text-muted-foreground mb-6">
              See how our incubated startups are making an impact
            </p>
            <div className="text-center">
              <Button variant="outline" asChild>
                <Link href="/startups">View All Startups</Link>
              </Button>
            </div>
          </div>

          {/* TODO: Add more sections */}
          {/* <div className="bg-brand-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Detailed incubation process timeline</li>
              <li>• Mentor profiles and expertise areas</li>
              <li>• Success metrics and alumni achievements</li>
              <li>• Application requirements and selection criteria</li>
              <li>• Infrastructure and facility details</li>
              <li>• Partnership opportunities with corporates</li>
            </ul>
          </div> */}
        </div>
      </Container>
    </div>
  )
}