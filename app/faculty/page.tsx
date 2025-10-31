import { Container } from "@/components/container"
import { FacultyCard } from "@/components/faculty-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Users } from "lucide-react"

export const metadata = {
  title: "Faculty & Staff",
  description: "Meet our experienced faculty and staff at STEP Institute"
}

// Mock faculty data
const mockFaculty = [
  {
    slug: "dr-rajesh-kumar",
    name: "Dr. Rajesh Kumar",
    title: "Program Director & Associate Professor",
    dept: "Computer Science",
    email: "rajesh.kumar@step-institute.edu",
    specialization: "Web Development, Software Engineering, Database Systems"
  },
  {
    slug: "prof-priya-sharma",
    name: "Prof. Priya Sharma",
    title: "Assistant Professor",
    dept: "Data Science",
    email: "priya.sharma@step-institute.edu",
    specialization: "Machine Learning, Data Analytics, Python Programming"
  },
  {
    slug: "mr-arjun-singh",
    name: "Mr. Arjun Singh",
    title: "Senior Instructor",
    dept: "Digital Marketing",
    email: "arjun.singh@step-institute.edu",
    specialization: "SEO, Social Media Marketing, Content Strategy"
  },
  {
    slug: "dr-meera-patel",
    name: "Dr. Meera Patel",
    title: "Professor",
    dept: "Business Administration",
    email: "meera.patel@step-institute.edu",
    specialization: "Strategic Management, Entrepreneurship, Leadership"
  },
  {
    slug: "mr-vikram-gupta",
    name: "Mr. Vikram Gupta",
    title: "Industry Expert",
    dept: "Cybersecurity",
    email: "vikram.gupta@step-institute.edu",
    specialization: "Network Security, Ethical Hacking, Risk Assessment"
  },
  {
    slug: "ms-kavita-reddy",
    name: "Ms. Kavita Reddy",
    title: "Assistant Professor",
    dept: "Mobile Development",
    email: "kavita.reddy@step-institute.edu",
    specialization: "iOS Development, Android Development, React Native"
  }
]

export default function FacultyPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Users className="h-8 w-8" />
              Faculty & Staff
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn from experienced professionals and industry experts dedicated to your success
            </p>
          </div>

          {/* Filters */}
          <div className="bg-muted/30 rounded-lg p-6 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">Filter Faculty</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                    <SelectItem value="business-administration">Business Administration</SelectItem>
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Designation</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All designations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Designations</SelectItem>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="associate-professor">Associate Professor</SelectItem>
                    <SelectItem value="assistant-professor">Assistant Professor</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="industry-expert">Industry Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFaculty.map((faculty) => (
              <FacultyCard key={faculty.slug} {...faculty} />
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-brand-50 rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-center mb-8">Our Faculty Excellence</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-muted-foreground">Expert Faculty Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">200+</div>
                <div className="text-muted-foreground">Years Combined Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Industry Partnerships</div>
              </div>
            </div>
          </div>

          {/* TODO: Add more sections */}
          <div className="bg-brand-50 rounded-lg p-6 mt-12">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Faculty research publications and achievements</li>
              <li>• Industry consulting and project work</li>
              <li>• Student mentorship success stories</li>
              <li>• Professional development programs</li>
              <li>• Guest lecture series and workshops</li>
              <li>• Faculty-industry collaboration projects</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}