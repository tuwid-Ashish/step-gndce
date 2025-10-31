export interface Notice {
  id: string
  title: string
  slug: string
  excerpt: string
  pinned: boolean
  date: string
  content?: string
  publishedAt?: string
  updatedAt?: string
}