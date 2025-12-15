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
        "inline-flex items-center space-x-3 text-foreground hover:opacity-80 transition-opacity",
        className
      )}
    >
      {/* logo */}
      <div className="h-12 w-12 rounded-f overflow-hidden shrink-0">
        <img
          src="https://stepgndec.com/wp-content/themes/STEPv8/img/stepback.png"
          alt="STEP logo"
          className="block w-full h-full object-cover"
        />
      </div>

      {/* text, vertically centered with the logo */}
      <div className="flex flex-col leading-none">
        <span className="font-bold text-lg">STEP</span>
        <span className="text-xs text-muted-foreground">GNDEC</span>
      </div>
    </Link>
  )
}