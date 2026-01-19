import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Users, Mail, Phone } from "lucide-react"

export const metadata = {
  title: "Staff Directory",
  description: "Meet our dedicated administrative and support staff at STEP Institute"
}

// Mock staff data
const mockStaff = [
  {
    name: "Ms. Anita Rao",
    title: "Academic Coordinator",
    dept: "Academics",
    email: "anita.rao@step-institute.edu",
    phone: "+91 9876543220",
    responsibilities: "Student admissions, Academic scheduling, Course coordination"
  },
  {
    name: "Mr. Suresh Kumar",
    title: "Administrative Manager",
    dept: "Administration",
    email: "suresh.kumar@step-institute.edu",
    phone: "+91 9876543221",
    responsibilities: "Office management, HR coordination, General administration"
  },
  {
    name: "Ms. Deepika Singh",
    title: "Student Counselor",
    dept: "Student Services",
    email: "deepika.singh@step-institute.edu",
    phone: "+91 9876543222",
    responsibilities: "Student counseling, Career guidance, Personal development"
  },
  {
    name: "Mr. Ravi Sharma",
    title: "IT Support Specialist",
    dept: "Information Technology",
    email: "ravi.sharma@step-institute.edu",
    phone: "+91 9876543223",
    responsibilities: "Technical support, System maintenance, Network management"
  },
  {
    name: "Ms. Pooja Gupta",
    title: "Placement Coordinator",
    dept: "Placements",
    email: "pooja.gupta@step-institute.edu",
    phone: "+91 9876543224",
    responsibilities: "Industry relations, Job placements, Internship coordination"
  },
  {
    name: "Mr. Amit Verma",
    title: "Finance Officer",
    dept: "Finance",
    email: "amit.verma@step-institute.edu",
    phone: "+91 9876543225",
    responsibilities: "Fee collection, Financial planning, Budget management"
  },
  {
    name: "Ms. Priyanka Joshi",
    title: "Marketing Executive",
    dept: "Marketing",
    email: "priyanka.joshi@step-institute.edu",
    phone: "+91 9876543226",
    responsibilities: "Digital marketing, Brand promotion, Student outreach"
  },
  {
    name: "Mr. Rahul Mehta",
    title: "Library Assistant",
    dept: "Library",
    email: "rahul.mehta@step-institute.edu",
    phone: "+91 9876543227",
    responsibilities: "Library management, Resource organization, Student assistance"
  }
]

const departments = [
  "All Departments",
  "Academics", 
  "Administration",
  "Student Services",
  "Information Technology",
  "Placements",
  "Finance",
  "Marketing",
  "Library"
]

export default function StaffPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Users className="h-8 w-8" />
              Staff Directory
            </h1>
            <p className="text-xl text-muted-foreground">
              Our dedicated team of professionals committed to supporting your educational journey
            </p>
          </div>

          {/* Filters */}
          <div className="bg-muted/30 rounded-lg p-6 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">Filter Staff</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <input 
                  type="text" 
                  placeholder="Search by name or title..."
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStaff.map((staff, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="w-16 h-16 bg-linear-to-br from-primary to-brand-600 rounded-full flex items-center justify-center text-white text-lg font-bold mb-3">
                        {staff.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <CardTitle className="text-lg">{staff.name}</CardTitle>
                      <p className="text-primary font-semibold">{staff.title}</p>
                      <Badge variant="outline" className="mt-2">{staff.dept}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Key Responsibilities</h4>
                      <p className="text-sm text-muted-foreground">{staff.responsibilities}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${staff.email}`} className="hover:text-primary truncate">
                          {staff.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{staff.phone}</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Department Overview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">8</div>
                <div className="text-muted-foreground">Staff Members</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">7</div>
                <div className="text-muted-foreground">Departments</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Support Available</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Years Combined Experience</div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>General Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Office Hours</h3>
                  <p className="text-muted-foreground mb-4">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Main Reception</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+91 80-2345-6789</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>info@step-institute.edu</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TODO: Add more sections */}
          {/* <div className="bg-brand-50 rounded-lg p-6 mt-12">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Staff training and development programs</li>
              <li>• Employee recognition and achievements</li>
              <li>• Internal communication and collaboration tools</li>
              <li>• Staff wellness and support initiatives</li>
              <li>• Professional development opportunities</li>
              <li>• Team building and social events</li>
            </ul>
          </div> */}
        </div>
      </Container>
    </div>
  )
}