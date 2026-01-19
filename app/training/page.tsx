import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Users, Award } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Training Programs",
  description: "Professional skill development programs at STEP Institute"
}

export default function TrainingPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Training Programs</h1>
            <p className="text-xl text-muted-foreground">
              Industry-relevant skill development programs designed to prepare 
              students for successful careers in technology
            </p>
          </div>

          {/* Program Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Full Stack Development
                </CardTitle>
                <CardDescription>6 months • 120 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Comprehensive web development training covering modern frameworks, 
                  databases, and deployment strategies.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    React.js & Next.js
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Node.js & Express
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Database Management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Cloud Deployment
                  </li>
                </ul>
                <Button className="w-full">
                  <Link href="/apply?program=fullstack">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Data Science & AI
                </CardTitle>
                <CardDescription>8 months • 160 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Advanced analytics and machine learning training with hands-on 
                  projects using real-world datasets.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Python & R Programming
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Machine Learning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Deep Learning & AI
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Data Visualization
                  </li>
                </ul>
                <Button className="w-full">
                  <Link href="/apply?program=datascience">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="bg-muted/30 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Our Training?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Flexible Schedule</h3>
                <p className="text-sm text-muted-foreground">
                  Weekend and evening batches available to accommodate working professionals
                </p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Industry Mentors</h3>
                <p className="text-sm text-muted-foreground">
                  Learn from experienced professionals working in top tech companies
                </p>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Placement Support</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated placement assistance with our industry partner network
                </p>
              </div>
            </div>
          </div>

          {/* TODO: Add more sections */}
          {/* <div className="bg-brand-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Detailed course curriculum and syllabus</li>
              <li>• Faculty profiles and expertise</li>
              <li>• Student testimonials and success stories</li>
              <li>• Fee structure and scholarship information</li>
              <li>• Batch schedules and enrollment dates</li>
              <li>• Online learning portal integration</li>
            </ul>
          </div> */}
        </div>
      </Container>
    </div>
  )
}