import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, GraduationCap, IndianRupee } from "lucide-react"
import Link from "next/link"

export interface DiplomaCardProps {
  slug: string
  title: string
  fee: string
  duration: string
  eligibility: string
  blurb: string
  category?: string
}

export function DiplomaCard({ 
  slug, 
  title, 
  fee, 
  duration, 
  eligibility, 
  blurb, 
  category 
}: DiplomaCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-lg leading-snug">
            <Link 
              href={`/diplomas/${slug}`}
              className="hover:text-primary transition-colors"
            >
              {title}
            </Link>
          </CardTitle>
          {category && (
            <Badge variant="outline" className="shrink-0">
              {category}
            </Badge>
          )}
        </div>
        <CardDescription className="line-clamp-2">
          {blurb}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            <span>{fee}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span className="line-clamp-1">{eligibility}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/diplomas/${slug}`}>View Details</Link>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link href={`/apply?program=${slug}`}>Apply</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}