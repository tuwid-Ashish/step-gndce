import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ProgramCardProps {
  title: string
  description: string
  duration: string
  participants?: string
  href: string
  applyHref?: string
}

export function ProgramCard({ 
  title, 
  description, 
  duration, 
  participants, 
  href, 
  applyHref 
}: ProgramCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {duration}
          </Badge>
          {participants && (
            <Badge variant="outline" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              {participants}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={href}>
              Learn More
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
          {applyHref && (
            <Button size="sm" asChild>
              <Link href={applyHref}>Apply</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}