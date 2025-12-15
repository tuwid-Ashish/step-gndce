import Image from 'next/image'

interface TestimonialsProps {
  testimonials: Array<{
    name: string
    role: string
    photoUrl: string
    quote: string
  }>
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1320px] px-5">
        <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
          What Our Community Says
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <article 
              key={i} 
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
                <div className="mb-4 flex items-center gap-3">
                <Image 
                  src={testimonial.photoUrl} 
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-sm">{testimonial.name}</h3>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
                </div>
              <blockquote className="text-sm italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
