interface ObjectivesBlockProps {
  objectives: string[]
}

export function ObjectivesBlock({ objectives }: ObjectivesBlockProps) {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="mx-auto max-w-[1320px] px-5">
        <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
          Our Objectives
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {objectives.map((objective, i) => (
            <div 
              key={i} 
              className="flex gap-3 rounded-lg border border-border bg-card p-4 shadow-sm"
            >
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                {i + 1}
              </div>
              <p className="text-sm md:text-base">{objective}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
