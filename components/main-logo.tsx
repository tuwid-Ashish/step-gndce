import Link from "next/link"
import { cn } from "@/lib/utils"

interface MainLogoProps {
  className?: string
}

export function MainLogo({ className }: MainLogoProps) {
  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center space-x-2 text-foreground hover:opacity-80 transition-opacity",
        className
      )}
    >
      {/* TODO: Replace with actual logo image when available */}
      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">S</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-none">STEP</span>
        <span className="text-xs text-muted-foreground leading-none">Institute</span>
      </div>
    </Link>
  )
}