import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, TrendingUp, Users, Target, Calendar, Award, ArrowRight, Rocket } from "lucide-react"

export const metadata = {
  title: "Entrepreneurship & Innovation",
  description: "Fostering entrepreneurial mindset and innovation at STEP Institute"
}

// Mock entrepreneurship data
const mockPrograms = [
  {
    title: "Startup Incubation Program",
    duration: "6 months",
    description: "Comprehensive support for early-stage startups with mentorship, funding, and resources.",
    features: ["Mentorship", "Seed Funding", "Office Space", "Legal Support"],
    eligibility: "Students, Alumni, External Applicants"
  },
  {
    title: "Innovation Bootcamp",
    duration: "2 weeks",
    description: "Intensive program focusing on design thinking, ideation, and rapid prototyping.",
    features: ["Design Thinking", "Prototyping", "Market Research", "Pitch Training"],
    eligibility: "Current Students"
  },
  {
    title: "Business Plan Competition",
    duration: "3 months",
    description: "Annual competition for innovative business ideas with cash prizes and mentorship.",
    features: ["Cash Prizes", "Mentorship", "Networking", "Media Exposure"],
    eligibility: "Students, Alumni"
  }
]

const mockStartups = [
  {
    name: "TechSolve",
    founder: "Rahul Sharma (Web Dev 2022)",
    industry: "EdTech",
    description: "AI-powered learning platform for personalized education",
    status: "Series A",
    employees: "25+"
  },
  {
    name: "GreenLife",
    founder: "Priya Patel (Business Admin 2021)",
    industry: "Sustainability",
    description: "Eco-friendly products and sustainable living solutions",
    status: "Seed Funded",
    employees: "12"
  },
  {
    name: "DataInsight",
    founder: "Amit Kumar (Data Science 2023)",
    industry: "Analytics",
    description: "Business intelligence platform for SMEs",
    status: "Pre-Seed",
    employees: "8"
  }
]

const mockEvents = [
  {
    title: "Entrepreneur's Meet 2024",
    date: "March 15, 2024",
    type: "Networking",
    description: "Connect with successful entrepreneurs and industry leaders"
  },
  {
    title: "Pitch Perfect Workshop",
    date: "March 22, 2024",
    type: "Workshop",
    description: "Master the art of presenting your startup idea effectively"
  },
  {
    title: "Innovation Challenge",
    date: "April 5, 2024",
    type: "Competition",
    description: "48-hour hackathon for innovative technology solutions"
  }
]

export default function EntrepreneurshipPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Rocket className="h-8 w-8" />
              Entrepreneurship & Innovation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Empowering the next generation of entrepreneurs and innovators
            </p>
            <div className="bg-linear-to-r from-primary/10 to-brand-600/10 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Transform Your Ideas Into Reality</h2>
              <p className="text-muted-foreground mb-6">
                Join our comprehensive ecosystem designed to nurture entrepreneurial thinking, 
                provide practical experience, and connect you with industry experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <Target className="h-5 w-5 mr-2" />
                  Apply for Incubation
                </Button>
                <Button variant="outline" size="lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Events
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="programs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="startups">Success Stories</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="programs" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Entrepreneurship Programs</h2>
                <p className="text-muted-foreground">
                  Structured programs to guide you from idea to execution
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPrograms.map((program, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                          <Badge variant="outline" className="mb-3">{program.duration}</Badge>
                          <p className="text-muted-foreground text-sm">{program.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Program Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {program.features.map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Eligibility</h4>
                          <p className="text-sm text-muted-foreground">{program.eligibility}</p>
                        </div>

                        <Button className="w-full">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="startups" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Alumni Success Stories</h2>
                <p className="text-muted-foreground">
                  Meet our successful entrepreneurs who turned their ideas into thriving businesses
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockStartups.map((startup, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-linear-to-br from-primary to-brand-600 rounded-lg flex items-center justify-center text-white font-bold">
                          {startup.name[0]}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{startup.name}</CardTitle>
                          <p className="text-primary font-semibold text-sm">{startup.founder}</p>
                          <Badge variant="outline" className="mt-1">{startup.industry}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground text-sm">{startup.description}</p>
                        
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Status: {startup.status}</span>
                          <span className="text-muted-foreground">{startup.employees} employees</span>
                        </div>

                        <Button variant="outline" className="w-full">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          View Success Story
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-brand-50 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Join Our Success Stories</h3>
                <p className="text-muted-foreground mb-6">
                  Ready to turn your innovative idea into the next success story?
                </p>
                <Button size="lg">
                  <Rocket className="h-5 w-5 mr-2" />
                  Start Your Journey
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
                <p className="text-muted-foreground">
                  Stay connected with our entrepreneurship community through events and workshops
                </p>
              </div>

              <div className="space-y-4">
                {mockEvents.map((event, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">{event.date}</span>
                            <Badge variant="secondary">{event.type}</Badge>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-muted-foreground">{event.description}</p>
                        </div>
                        <Button>
                          Register Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Resources & Support</h2>
                <p className="text-muted-foreground">
                  Access tools, guides, and support to fuel your entrepreneurial journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Ideation Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Business Model Canvas Templates</li>
                      <li>• Market Research Frameworks</li>
                      <li>• Competitor Analysis Tools</li>
                      <li>• Idea Validation Checklists</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">
                      Access Tools
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Mentorship Network
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Industry Expert Mentors</li>
                      <li>• Successful Alumni Network</li>
                      <li>• Investor Connections</li>
                      <li>• Peer-to-Peer Support Groups</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">
                      Find Mentor
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Funding Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Seed Funding Programs</li>
                      <li>• Grant Writing Assistance</li>
                      <li>• Investor Pitch Preparation</li>
                      <li>• Financial Planning Support</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">
                      Explore Funding
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Growth Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Marketing Strategy Guides</li>
                      <li>• Legal & Compliance Support</li>
                      <li>• Technology Infrastructure</li>
                      <li>• Scaling Best Practices</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">
                      Get Resources
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Stats Section */}
          <div className="bg-brand-50 rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-center mb-8">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Startups Incubated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">₹2.5Cr</div>
                <div className="text-muted-foreground">Funding Raised</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">200+</div>
                <div className="text-muted-foreground">Jobs Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-muted-foreground">Industry Mentors</div>
              </div>
            </div>
          </div>

          {/* TODO: Add more sections */}
          <div className="bg-brand-50 rounded-lg p-6 mt-12">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Online pitch competition platform</li>
              <li>• Virtual reality prototyping lab</li>
              <li>• International startup exchange program</li>
              <li>• Alumni investor network</li>
              <li>• Entrepreneurship certification courses</li>
              <li>• Industry-specific incubation tracks</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}