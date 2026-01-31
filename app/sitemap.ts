import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://stepgndec.com'
  const currentDate = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/diplomas`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industrial-trainings`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/results`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notices`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/entrepreneurship`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/incubation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/startups`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faculty`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  try {
    // Dynamic diploma pages
    const diplomas = await prisma.course.findMany({
      where: {
        type: 'DIPLOMA',
        isActive: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const diplomaPages: MetadataRoute.Sitemap = diplomas.map((diploma) => ({
      url: `${baseUrl}/diplomas/${diploma.slug}`,
      lastModified: diploma.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    }))

    // Dynamic training pages
    const trainings = await prisma.course.findMany({
      where: {
        type: 'INDUSTRIAL_TRAINING',
        isActive: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const trainingPages: MetadataRoute.Sitemap = trainings.map((training) => ({
      url: `${baseUrl}/industrial-trainings/${training.slug}`,
      lastModified: training.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    // Dynamic event pages
    const events = await prisma.event.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
    })

    const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
      url: `${baseUrl}/events/${event.id}`,
      lastModified: event.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

    // Dynamic startup pages
    const startups = await prisma.startup.findMany({
      where: {
        isActive: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const startupPages: MetadataRoute.Sitemap = startups.map((startup) => ({
      url: `${baseUrl}/startups/${startup.slug}`,
      lastModified: startup.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

    // Dynamic faculty pages
    const faculty = await prisma.faculty.findMany({
      where: {
        isActive: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const facultyPages: MetadataRoute.Sitemap = faculty.map((member) => ({
      url: `${baseUrl}/faculty/${member.slug}`,
      lastModified: member.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.5,
    }))

    // Dynamic notice pages
    const notices = await prisma.notice.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const noticePages: MetadataRoute.Sitemap = notices.map((notice) => ({
      url: `${baseUrl}/notices/${notice.slug}`,
      lastModified: notice.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.5,
    }))

    // Combine all pages (excluding blog as it's commented out in navbar)
    return [
      ...staticPages,
      ...diplomaPages,
      ...trainingPages,
      ...eventPages,
      ...startupPages,
      ...facultyPages,
      ...noticePages,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least static pages if database query fails
    return staticPages
  }
}
