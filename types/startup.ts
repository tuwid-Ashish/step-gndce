export interface Startup {
  id: string
  name: string
  slug: string
  sector: string
  logoUrl?: string
  highlights: string[]
  description?: string
  foundedYear?: number
  website?: string
  status: 'incubated' | 'graduated' | 'active'
}