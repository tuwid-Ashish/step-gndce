import { Container } from "@/components/container"
import { DiplomaCard } from "@/components/diploma-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, GraduationCap } from "lucide-react"

export const metadata = {
  title: "Diploma Programs",
  description: "Professional diploma programs at STEP Institute"
}

// Mock diploma data
const mockDiplomas = [
  {
    slug: "full-stack-web-development",
    title: "Diploma in Full Stack Web Development",
    fee: "₹75,000",
    duration: "12 months",
    eligibility: "12th Pass or equivalent",
    blurb: "Master modern web development with React, Node.js, and cloud technologies. Build real-world projects and get placement assistance.",
    category: "Technology"
  },
  {
    slug: "data-science-analytics",
    title: "Diploma in Data Science & Analytics",
    fee: "₹85,000",
    duration: "15 months", 
    eligibility: "Graduate in any stream",
    blurb: "Learn Python, machine learning, and data visualization. Work with real datasets and industry-standard tools.",
    category: "Technology"
  },
  {
    slug: "digital-marketing",
    title: "Diploma in Digital Marketing",
    fee: "₹45,000",
    duration: "8 months",
    eligibility: "12th Pass or equivalent",
    blurb: "Master SEO, social media marketing, content strategy, and analytics. Get Google and Facebook certifications.",
    category: "Marketing"
  },
  {
    slug: "mobile-app-development",
    title: "Diploma in Mobile App Development",
    fee: "₹65,000",
    duration: "10 months",
    eligibility: "12th Pass with Mathematics",
    blurb: "Build iOS and Android apps using React Native and Flutter. Learn app store deployment and monetization.",
    category: "Technology"
  },
  {
    slug: "cybersecurity",
    title: "Diploma in Cybersecurity",
    fee: "₹70,000",
    duration: "12 months",
    eligibility: "Graduate in Computer Science",
    blurb: "Learn ethical hacking, network security, and incident response. Get industry-recognized certifications.",
    category: "Technology"
  },
  {
    slug: "business-administration",
    title: "Diploma in Business Administration",
    fee: "₹55,000",
    duration: "12 months",
    eligibility: "Graduate in any stream",
    blurb: "Develop management skills, leadership abilities, and business acumen. Includes internship with local companies.",
    category: "Management"
  }
]

export default function DiplomasPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <GraduationCap className="h-8 w-8" />
              Diploma Programs
            </h1>
            <p className="text-xl text-muted-foreground">
              Professional diploma programs designed to equip you with industry-relevant skills and knowledge
            </p>
          </div>

          {/* Filters */}
          <div className="bg-muted/30 rounded-lg p-6 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">Filter Programs</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Duration</SelectItem>
                    <SelectItem value="short">6-8 months</SelectItem>
                    <SelectItem value="medium">9-12 months</SelectItem>
                    <SelectItem value="long">12+ months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Eligibility</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any eligibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Eligibility</SelectItem>
                    <SelectItem value="12th">12th Pass</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Post Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Discipline</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Disciplines</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Diploma Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDiplomas.map((diploma) => (
              <DiplomaCard key={diploma.slug} {...diploma} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-brand-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of students who have transformed their careers with our diploma programs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/apply">Apply Now</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/contact">Get More Info</a>
                </Button>
              </div>
            </div>
          </div>

          {/* TODO: Add more sections */}
          <div className="bg-brand-50 rounded-lg p-6 mt-12">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Advanced search and filtering</li>
              <li>• Program comparison tool</li>
              <li>• Student reviews and ratings</li>
              <li>• Virtual campus tours</li>
              <li>• Live chat with admission counselors</li>
              <li>• Scholarship and financial aid information</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}