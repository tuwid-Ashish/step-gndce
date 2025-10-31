import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export interface FacultyCardProps {
  slug: string
  name: string
  title: string
  dept: string
  photo?: string
  email?: string
  specialization?: string
}

export function FacultyCard({ 
  slug, 
  name, 
  title, 
  dept, 
  photo, 
  email,
  specialization 
}: FacultyCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="text-center">
        <div className="w-20 h-20 mx-auto mb-3 bg-muted rounded-full flex items-center justify-center overflow-hidden">
          {photo ? (
            <Image 
              src={photo} 
              alt={name}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          ) : (
            <User className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <CardTitle className="text-lg">
          <Link 
            href={`/faculty/${slug}`}
            className="hover:text-primary transition-colors"
          >
            {name}
          </Link>
        </CardTitle>
        <CardDescription>
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-3">
        <Badge variant="outline" className="text-xs">
          {dept}
        </Badge>
        
        {specialization && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {specialization}
          </p>
        )}
        
        <div className="flex justify-center gap-2">
          <Link 
            href={`/faculty/${slug}`}
            className="text-sm text-primary hover:underline"
          >
            View Profile
          </Link>
          {email && (
            <>
              <span className="text-muted-foreground">•</span>
              <a 
                href={`mailto:${email}`}
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                <Mail className="h-3 w-3" />
                Email
              </a>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}