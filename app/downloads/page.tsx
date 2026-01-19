import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Download, File, FileText, Image, Calendar, User } from "lucide-react"

export const metadata = {
  title: "Downloads",
  description: "Access important documents, forms, and resources from STEP Institute"
}

// Mock downloads data
const mockDownloads = [
  {
    id: 1,
    title: "Admission Application Form 2024",
    description: "Complete application form for new student admissions",
    category: "forms",
    type: "PDF",
    size: "2.1 MB",
    uploadDate: "2024-01-15",
    downloadCount: 1250,
    tags: ["admission", "application", "2024"]
  },
  {
    id: 2,
    title: "Course Catalog 2024",
    description: "Comprehensive guide to all diploma programs and courses",
    category: "catalogs",
    type: "PDF",
    size: "5.8 MB",
    uploadDate: "2024-01-10",
    downloadCount: 2100,
    tags: ["catalog", "courses", "programs"]
  },
  {
    id: 3,
    title: "Academic Calendar 2024-25",
    description: "Important dates, holidays, and academic schedule",
    category: "calendars",
    type: "PDF",
    size: "1.2 MB",
    uploadDate: "2024-01-05",
    downloadCount: 890,
    tags: ["calendar", "schedule", "academic"]
  },
  {
    id: 4,
    title: "Fee Structure 2024",
    description: "Detailed fee structure for all programs and courses",
    category: "fee-structure",
    type: "PDF",
    size: "800 KB",
    uploadDate: "2024-01-12",
    downloadCount: 1450,
    tags: ["fees", "payment", "structure"]
  },
  {
    id: 5,
    title: "Student Handbook",
    description: "Guidelines, policies, and procedures for students",
    category: "handbooks",
    type: "PDF",
    size: "3.2 MB",
    uploadDate: "2024-01-08",
    downloadCount: 750,
    tags: ["handbook", "policies", "guidelines"]
  },
  {
    id: 6,
    title: "Placement Statistics 2023",
    description: "Annual report on student placements and career outcomes",
    category: "reports",
    type: "PDF",
    size: "4.5 MB",
    uploadDate: "2023-12-20",
    downloadCount: 680,
    tags: ["placement", "statistics", "report"]
  },
  {
    id: 7,
    title: "Transportation Form",
    description: "Application form for institute transportation services",
    category: "forms",
    type: "PDF",
    size: "650 KB",
    uploadDate: "2024-01-14",
    downloadCount: 320,
    tags: ["transport", "bus", "application"]
  },
  {
    id: 8,
    title: "Scholarship Application",
    description: "Application form for merit and need-based scholarships",
    category: "forms",
    type: "PDF",
    size: "1.8 MB",
    uploadDate: "2024-01-16",
    downloadCount: 920,
    tags: ["scholarship", "financial-aid", "merit"]
  }
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "forms", label: "Forms & Applications" },
  { value: "catalogs", label: "Course Catalogs" },
  { value: "calendars", label: "Academic Calendars" },
  { value: "fee-structure", label: "Fee Structure" },
  { value: "handbooks", label: "Handbooks & Guides" },
  { value: "reports", label: "Reports & Statistics" }
]

const fileTypes = [
  { value: "all", label: "All File Types" },
  { value: "pdf", label: "PDF Documents" },
  { value: "doc", label: "Word Documents" },
  { value: "xls", label: "Excel Spreadsheets" },
  { value: "img", label: "Images" }
]

function getFileIcon(type: string) {
  switch (type.toLowerCase()) {
    case 'pdf':
      return <FileText className="h-8 w-8 text-red-500" />
    case 'doc':
    case 'docx':
      return <File className="h-8 w-8 text-blue-500" />
    case 'xls':
    case 'xlsx':
      return <File className="h-8 w-8 text-green-500" />
    case 'jpg':
    case 'png':
    case 'jpeg':
      return <Image className="h-8 w-8 text-purple-500" />
    default:
      return <File className="h-8 w-8 text-gray-500" />
  }
}

export default function DownloadsPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Download className="h-8 w-8" />
              Downloads
            </h1>
            <p className="text-xl text-muted-foreground">
              Access important documents, forms, and resources for students and parents
            </p>
          </div>

          {/* Filters */}
          <div className="bg-muted/30 rounded-lg p-6 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">Filter Downloads</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">File Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All file types" />
                  </SelectTrigger>
                  <SelectContent>
                    {fileTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <input 
                  type="text" 
                  placeholder="Search downloads..."
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Downloads Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {mockDownloads.map((download) => (
              <Card key={download.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      {getFileIcon(download.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg mb-2">{download.title}</CardTitle>
                      <p className="text-muted-foreground text-sm mb-3">
                        {download.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {download.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <File className="h-4 w-4" />
                        {download.type} • {download.size}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(download.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {download.downloadCount.toLocaleString()} downloads
                    </div>

                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6" />
                  <span>Admission Forms</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>Academic Calendar</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <User className="h-6 w-6" />
                  <span>Student Handbook</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Download className="h-6 w-6" />
                  <span>Fee Structure</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">8</div>
                <div className="text-muted-foreground text-sm">Documents Available</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">8.3K</div>
                <div className="text-muted-foreground text-sm">Total Downloads</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">6</div>
                <div className="text-muted-foreground text-sm">Categories</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground text-sm">Access Available</div>
              </CardContent>
            </Card>
          </div>

          {/* Help Section */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Download Issues?</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    If you&apos;re having trouble downloading any documents, please contact our support team.
                  </p>
                  <Button variant="outline">
                    Contact Support
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Document Requests</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Need a document that&apos;s not listed? Submit a request and we'll help you.
                  </p>
                  <Button variant="outline">
                    Request Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TODO: Add more sections */}
          {/* <div className="bg-brand-50 rounded-lg p-6 mt-12">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Digital certificates and transcripts</li>
              <li>• Online form submission system</li>
              <li>• Document version history</li>
              <li>• Mobile app for downloads</li>
              <li>• Personalized document recommendations</li>
              <li>• Bulk download functionality</li>
            </ul>
          </div> */}
        </div>
      </Container>
    </div>
  )
}