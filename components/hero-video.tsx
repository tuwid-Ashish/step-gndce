"use client"

import { useEffect, useRef } from "react"

interface HeroVideoProps {
  videoId: string
  poster?: string
}

export function HeroVideo({ videoId, poster }: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Prevent any manual pause or control trigger on window focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const iframe = containerRef.current?.querySelector("iframe")
        if (iframe) {
          iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden rounded-none pointer-events-none select-none">
      {/* Poster image fallback while loading */}
      {poster && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" 
          style={{ backgroundImage: `url(${poster})` }} 
        />
      )}

      {/* YouTube Background Video Iframe with extra scaling to crop out any YouTube controls */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
        <iframe 
          className="w-[120vw] h-[120vh] min-h-[120vh] min-w-[120vw] object-cover pointer-events-none scale-125"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1&enablejsapi=1&autohide=1`}
          title="STEP GNDEC Background Video" 
          allow="autoplay; encrypted-media; picture-in-picture" 
          aria-hidden="true"
        />
      </div>

      {/* Ambient Gradient Overlay for readability */}
      {/* <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35 pointer-events-none" /> */}
    </div>
  )
}
