import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface UpdateTagProps {
  children: React.ReactNode
  variant: "info" | "success" | "warning" | "destructive"
  className?: string
}

export function UpdateTag({ children, variant, className }: UpdateTagProps) {
  const variantStyles = {
    info: "text-info bg-info/10 border-info/20",
    success: "text-success bg-success/10 border-success/20", 
    warning: "text-warning bg-warning/10 border-warning/20",
    destructive: "text-destructive bg-destructive/10 border-destructive/20"
  }

  return (
    <Badge 
      className={cn(
        "border",
        variantStyles[variant],
        className
      )}
      variant="outline"
    >
      {children}
    </Badge>
  )
}