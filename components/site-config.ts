export interface NavItem {
  label: string
  href: string
  description?: string
  children?: NavItem[]
}

export const nav = {
  main: [
    {
      label: "Home",
      href: "/",
      description: "Welcome to STEP — shaping careers in tech, trades, and startups"
    },
    {
      label: "Academics",
      href: "/academics",
      description: "Industry-aligned courses, diplomas, and student services",
      children: [
        {
          label: "Diploma Programs",
          href: "/diplomas",
          description: "Short-term professional diplomas designed for job readiness"
        },
        {
          label: "Results",
          href: "/results",
          description: "Latest exam results and academic notices"
        },
        {
          label: "Notice Board",
          href: "/notices",
          description: "Campus announcements, schedules, and circulars"
        },
        {
          label: "Industrial Training",
          href: "/industrial-training",
          description: "Internships, industry projects, and placement support"
        }
      ]
    },
    {
      label: "Entrepreneurship",
      href: "/entrepreneurship",
      description: "Startup incubation, mentoring, and funding support",
      children: [
        {
          label: "Overview",
          href: "/entrepreneurship",
          description: "Our entrepreneurship mission, services, and impact"
        },
        {
          label: "Incubation & Programs",
          href: "/incubation",
          description: "Structured incubation, mentoring, and accelerator tracks"
        },
        {
          label: "Events & Workshops",
          href: "/events",
          description: "Hackathons, masterclasses, and startup bootcamps"
        },
        {
          label: "Startups & Support",
          href: "/startups",
          description: "Portfolio startups, resources, and assistance programs"
        }
      ]
    },
    {
      label: "Faculty & Staff",
      href: "/faculty",
      description: "Meet the educators and support team driving STEP"
    },
    {
      label: "Blog",
      href: "/blog",
      description: "Insights, success stories, and industry updates"
    },
    {
      label: "Contact",
      href: "/contact",
      description: "Reach out for admissions, partnerships, or media queries"
    }
  ],
  ctas: [
    { label: "Apply Now", href: "/apply", variant: "default" as const },
    {
      label: "Chat on WhatsApp",
      href: "https://wa.me/919876543210",
      variant: "ghost" as const,
      icon: "whatsapp" as const
    }
  ]
}

export const footerLinks = {
  quickLinks: [
    { title: "About Us", href: "/about" },
    { title: "Diplomas", href: "/diplomas" },
    { title: "Faculty & Staff", href: "/faculty" },
    { title: "Results", href: "/results" },
    { title: "Notice Board", href: "/notices" },
    { title: "Downloads", href: "/downloads" }
  ],
  resources: [
    { title: "Blog", href: "/blog" },
    { title: "Startups", href: "/startups" },
    { title: "Entrepreneurship", href: "/entrepreneurship" },
    { title: "Contact", href: "/contact" },
    { title: "Apply Now", href: "/apply" }
  ]
}

export const siteConfig = {
  name: "STEP Institute",
  description: "Leading professional training and startup incubation institute",
  url: "https://step-institute.edu",
  contact: {
    phone: "+91 98765 43210",
    email: "info@step-institute.edu",
    address: "STEP Institute Campus, GNDCE, Ludhiana, Punjab 141006"
  },
  social: {
    facebook: "https://facebook.com/stepinstitute",
    twitter: "https://twitter.com/stepinstitute",
    linkedin: "https://linkedin.com/company/stepinstitute",
    instagram: "https://instagram.com/stepinstitute"
  },
  languages: [
    { code: "en", name: "English" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "hi", name: "हिंदी" }
  ]
}

export const whatsappNumber = "+919876543210"