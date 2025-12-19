'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface DirectorStripProps {
  director: {
    name: string
    title: string
    photoUrl: string
    quote: string
    messageHref: string
  }
}
// export function DirectorStrip1({ director }: DirectorStripProps) {
//   return (
//     <section className="py-12 md:py-16">
//       <div className="mx-auto max-w-[1320px] px-5">
//         <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 rounded-xl border border-border bg-card p-5 md:p-6 shadow-sm">
//           <div className="w-full md:w-1/3 shrink-0">
//             <img
//               src={director.photoUrl}
//               alt={`${director.name}, ${director.title}`}
//               className="w-full h-56 md:h-full rounded-lg object-cover"
//               loading="lazy"
//             />
//           </div>

//           <div className="w-full md:w-2/3">
//             <h3 className="text-lg font-semibold">{director.name}</h3>
//             <p className="text-sm text-muted-foreground">{director.title}</p>
//             <blockquote className="mt-3 italic text-sm md:text-base">
//               &ldquo;{director.quote}&rdquo;
//             </blockquote>
//             <a
//               href={director.messageHref}
//               className="mt-4 inline-block text-sm underline hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
//             >
//               Read Message
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
export function DirectorStrip({ director }: DirectorStripProps) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="mx-auto max-w-[1320px] px-5">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left photo column */}
          <div className="w-full md:w-1/3 shrink-0">
            <Image
              width={100}
              height={100}
              src={director.photoUrl}
              alt={`${director.name}, ${director.title}`}
              className="w-full h-96 md:h-[540px] rounded-lg object-cover shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Right content column */}
          <div className="w-full md:w-2/3">
            <div className="max-w-3xl mx-auto">
              <p className="text-sm tracking-widest text-primary-600 uppercase mb-3">
                Our Executive Director
              </p>

              <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-6">
                Executive Director
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mb-6">
                <p className="text-base">
                  Dr. Arvind Dhingra is current executive director of STEP. He does research in
                  Curriculum Theory, Educational Leadership and Educational Management.
                </p>
                <p className="text-base">
                  He has 12 Journal and 68 Conference publications with more than 25 years of
                  experience and honoured by IISA award, National Eminent Educator Award.
                </p>
              </div>

              <div className="space-y-6 mb-6">
                <SkillRow label="Leadership ability" percent={95} />
                <SkillRow label="Experience" percent={98} />
                <SkillRow label="Business Skills" percent={90} />
              </div>

              <div className="flex items-center justify-between border-t pt-6">
                <div>
                  <p className="text-lg font-medium">{director.name}, Ph.D</p>
                  <p className="text-sm text-muted-foreground">{director.title}</p>
                </div>

                <a
                  href={director.messageHref}
                  className="inline-block rounded-md bg-primary-600 text-white px-4 py-2 text-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-400"
                >
                  Read Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Helper subcomponent for the skill bars */
function SkillRow({ label, percent }: { label: string; percent: number }) {
  const [currentPercent, setCurrentPercent] = useState(0)

  useEffect(() => {
    let rafId: number | null = null
    let startTime: number | null = null
    const animationDuration = 1000 // match visual duration (ms)

    // animate both the numeric value and the width with requestAnimationFrame
    function step(timestamp: number) {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / animationDuration, 1)
      const value = Math.round(progress * percent)
      setCurrentPercent(value)

      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      }
    }

    // small delay before starting (keeps previous behavior)
    const startTimer = setTimeout(() => {
      rafId = requestAnimationFrame(step)
    }, 100)

    return () => {
      clearTimeout(startTimer)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [percent])

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-base text-gray-800">{label}</span>
        <span className="text-sm text-gray-600">{currentPercent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{ width: `${currentPercent}%` }}
        />
      </div>
    </div>
  )
}
 
