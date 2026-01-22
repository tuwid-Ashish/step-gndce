import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  GraduationCap, 
  Users, 
  // Award, 
  Target, 
  Lightbulb, 
//   TrendingUp,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Rocket,
  Globe,
  Heart
} from "lucide-react"

export const metadata = {
  title: "About STEP - Science & Technology Entrepreneurs' Park",
  description:
    "Learn about STEP GNDEC - A unique incubation center promoting entrepreneurship and providing quality education through diploma programs, industrial training, and startup support in Ludhiana, Punjab."
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary/10 via-background to-accent/5 border-b">
        <Container>
          <div className="py-16 lg:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-4">
                <Heart className="mr-2 h-3 w-3" />
                About Us
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Science & Technology Entrepreneurs' Park
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                A dynamic initiative by <span className="font-semibold text-foreground">Guru Nanak Dev Engineering College</span> and the <span className="font-semibold text-foreground">Department of Science & Technology, Govt. of India</span> to foster innovation and entrepreneurship.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/apply">
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-black" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatsCard 
              value="25+" 
              label="Years of Excellence"
              icon={<Calendar className="h-8 w-8 text-primary" />}
            />
            <StatsCard 
              value="20+" 
              label="Established Incubators"
              icon={<Building2 className="h-8 w-8 text-primary" />}
            />
            <StatsCard 
              value="5000+" 
              label="Students Trained"
              icon={<Users className="h-8 w-8 text-primary" />}
            />
            <StatsCard 
              value="100+" 
              label="Successful Startups"
              icon={<Rocket className="h-8 w-8 text-primary" />}
            />
          </div>
        </Container>
      </section>

      {/* Who We Are */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Who We Are</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                First STEP in Punjab
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  Science & Technology Entrepreneurs' Park (STEP-GNDEC), Ludhiana is a <span className="font-semibold text-foreground">unique and dynamic entity</span> promoted jointly by Guru Nanak Dev Engineering College and the Department of Science & Technology, Govt. of India.
                </p>
                <p className="text-lg">
                  We encourage <span className="font-semibold text-foreground">entrepreneurship amongst Science & Technology students</span> by providing space, environment, and infrastructure for creative thinking, innovation, product development, and venture creation.
                </p>
                <p className="text-lg">
                  As the <span className="font-semibold text-foreground">first STEP in Punjab</span>, we have pioneered the incubation ecosystem in the region, supporting countless entrepreneurs on their journey from ideation to successful ventures.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/entrepreneurship">
                    <Rocket className="mr-2 h-4 w-4" />
                    Entrepreneurship Programs
                  </Link>
                </Button>
                <Button variant="outline" className="text-black" asChild>
                  <Link href="/startups">View Startups</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-4/3 relative rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src="https://stepgndec.com/wp-content/themes/STEPv8/img/college-students-posing-outdoors-e1617782277300.jpg"
                  alt="STEP GNDEC Students"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl max-w-xs">
                <p className="text-sm font-semibold">🏆 IISA Award Winner</p>
                <p className="text-xs mt-1 opacity-90">National Eminent Educator Award</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-linear-to-br from-primary/5 to-accent/5 border-y">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">Our Purpose</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Mission & Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <ul className="space-y-4">
                  <MissionItem text="Foster innovation and entrepreneurship among science & technology students" />
                  <MissionItem text="Provide world-class infrastructure and mentorship for startup development" />
                  <MissionItem text="Bridge the gap between academic knowledge and industry requirements" />
                  <MissionItem text="Create self-employment opportunities through skill development programs" />
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Lightbulb className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <ul className="space-y-4">
                  <MissionItem text="Be the leading incubation center in Northern India" />
                  <MissionItem text="Create 500+ successful technology-driven startups by 2030" />
                  <MissionItem text="Establish STEP as a hub for innovation and creative problem-solving" />
                  <MissionItem text="Develop industry-ready professionals through quality education and training" />
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Core Objectives */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">What We Do</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Core Objectives</h2>
            <p className="text-lg text-muted-foreground">
              The focus of STEP-GNDEC is Training & Mentoring, Business Incubation, and Entrepreneurship Education
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ObjectiveCard
              icon={<Building2 className="h-6 w-6" />}
              title="Physical Infrastructure"
              description="Provide co-working spaces, nursery sheds, and offices to technology-oriented industries and startups."
            />
            <ObjectiveCard
              icon={<GraduationCap className="h-6 w-6" />}
              title="Training & Education"
              description="Impart quality training to students through diploma programs and motivate them for self-employment."
            />
            <ObjectiveCard
              icon={<Rocket className="h-6 w-6" />}
              title="Business Incubation"
              description="Promote and operate Technology Business Incubators to boost high-tech entrepreneurship among youth."
            />
            <ObjectiveCard
              icon={<Briefcase className="h-6 w-6" />}
              title="Entrepreneurship Development"
              description="Conduct EAC and EDP programs to nurture entrepreneurial mindset and skills among students."
            />
            <ObjectiveCard
              icon={<Users className="h-6 w-6" />}
              title="Mentorship Network"
              description="Connect aspiring entrepreneurs with industry experts and successful business leaders for guidance."
            />
            <ObjectiveCard
              icon={<Globe className="h-6 w-6" />}
              title="Industry Collaboration"
              description="Partner with industries for internships, placements, and real-world project opportunities."
            />
          </div>
        </Container>
      </section>

      {/* Programs Overview */}
      <section className="py-16 lg:py-24 bg-card border-y">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">What We Offer</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Programs</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive learning pathways designed to transform students into industry-ready professionals and entrepreneurs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ProgramCard
              icon={<BookOpen className="h-8 w-8" />}
              title="Diploma Programs"
              description="One-year professional diploma programs in Computer Application, Business Administration, Fashion Technology, and CAD-CNC."
              link="/diplomas"
            />
            <ProgramCard
              icon={<Briefcase className="h-8 w-8" />}
              title="Industrial Training"
              description="Short-term skill development courses in Python, Django, Web Development, and other in-demand technologies."
              link="/industrial-trainings"
            />
            <ProgramCard
              icon={<Rocket className="h-8 w-8" />}
              title="Entrepreneurship"
              description="Comprehensive startup support including incubation, mentorship, funding assistance, and workspace."
              link="/entrepreneurship"
            />
          </div>
        </Container>
      </section>

      {/* Why Choose STEP */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-4/3 relative rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src="https://stepgndec.com/wp-content/themes/STEPv8/img/asian-college-student-on-campus-e1617782285168.jpg"
                  alt="STEP Campus Life"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Badge className="mb-4">Why Choose Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why STEP?
              </h2>
              <div className="space-y-6">
                <FeatureItem 
                  title="Experienced Faculty"
                  description="Learn from industry experts with 25+ years of combined experience in education and entrepreneurship."
                />
                <FeatureItem 
                  title="State-of-the-Art Infrastructure"
                  description="Fully equipped labs, co-working spaces, and modern facilities for hands-on learning."
                />
                <FeatureItem 
                  title="Industry Partnerships"
                  description="Strong ties with leading companies ensuring internships, placements, and real-world exposure."
                />
                <FeatureItem 
                  title="Startup Ecosystem"
                  description="Access to 20+ established incubators, funding opportunities, and mentorship networks."
                />
                <FeatureItem 
                  title="Affordable Education"
                  description="Quality education at competitive fees with scholarship opportunities for deserving students."
                />
                <FeatureItem 
                  title="100% Placement Assistance"
                  description="Dedicated placement cell with connections to top companies across various industries."
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-16 lg:py-24 bg-linear-0-to-br from-primary/5 to-background border-y">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">Leadership</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Executive Director</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-2">
              <div className="grid md:grid-cols-5 gap-8 p-8">
                <div className="md:col-span-2">
                  <div className="aspect-3/4 relative rounded-xl overflow-hidden">
                    <Image
                      src="https://stepgndec.com/wp-content/themes/STEPv8/img/caucasian-man-standing-mockup-DVM4P39.png"
                      alt="Dr. Arvind Dhingra"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold">Dr. Arvind Dhingra, Ph.D</h3>
                    <p className="text-muted-foreground">Executive Director, STEP-GNDEC</p>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Dr. Arvind Dhingra is the current executive director of STEP. He specializes in Curriculum Theory, Educational Leadership, and Educational Management.
                    </p>
                    <p>
                      With <span className="font-semibold text-foreground">more than 25 years of experience</span>, Dr. Dhingra has 12 journal publications and 68 conference publications. He has been honored with the IISA Award and National Eminent Educator Award.
                    </p>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-primary">95%</p>
                      <p className="text-xs text-muted-foreground">Leadership</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">98%</p>
                      <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">90%</p>
                      <p className="text-xs text-muted-foreground">Business Skills</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Campus Facilities */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">Facilities</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Campus Life</h2>
            <p className="text-lg text-muted-foreground">
              Modern facilities and vibrant campus environment for holistic development
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FacilityCard
              title="Computer Labs"
              description="Fully equipped with latest hardware and software for practical learning."
              percentage={96}
            />
            <FacilityCard
              title="Library"
              description="Extensive collection of books, journals, and digital resources."
              percentage={92}
            />
            <FacilityCard
              title="Co-working Spaces"
              description="Modern workspaces for startups and student projects."
              percentage={87}
            />
            <FacilityCard
              title="Seminar Halls"
              description="Well-equipped halls for workshops, seminars, and events."
              percentage={94}
            />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-linear-to-br from-primary to-primary/80 text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Interested in Joining Us?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Take the first step towards a successful career in technology and entrepreneurship. Apply now for our diploma programs or get in touch for startup incubation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/apply">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Apply for Admissions
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

// Helper Components
function StatsCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <Card className="text-center p-6 border-2 hover:border-primary transition-colors">
      <CardContent className="p-0">
        <div className="flex justify-center mb-3">{icon}</div>
        <p className="text-3xl md:text-4xl font-bold mb-2">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  )
}

function MissionItem({ text }: { text: string }) {
  return (
    <li className="flex gap-3">
      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
      <span className="text-muted-foreground">{text}</span>
    </li>
  )
}

function ObjectiveCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function ProgramCard({ icon, title, description, link }: { icon: React.ReactNode; title: string; description: string; link: string }) {
  return (
    <Card className="border-2 hover:border-primary transition-all hover:shadow-xl group">
      <CardContent className="p-8">
        <div className="p-4 bg-primary/10 rounded-xl w-fit mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        <Button variant="outline" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
          <Link href={link}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0">
        <CheckCircle2 className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function FacilityCard({ title, description, percentage }: { title: string; description: string; percentage: number }) {
  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="font-bold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Quality</span>
            <span className="text-sm font-bold text-primary">{percentage}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
