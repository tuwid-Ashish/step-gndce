export interface NavItem {
  label: string
  href: string
  description?: string
  children?: NavItem[]
}

export const nav = {
  main: [
    { label: "Home", href: "/", description: "STEP Institute homepage" },
    { label: "About", href: "/about", description: "Learn about STEP GNDEC" },

    {
      label: "Academics",
      href: "/academics",
      description: "Academics details",
      children: [
        { label: "Diplomas", href: "/diplomas", description: "Professional diploma programs" },
        { label: "Industrial Training", href: "/industrial-trainings", description: "Short-term training programs" },
        { label: "Results", href: "/results", description: "Check exam results and scores" },
        { label: "Notice Board", href: "/notices", description: "Latest announcements and updates" },
      ]
    },
    {
      label: "Entrepreneurship",
      href: "/entrepreneurship",
      description: "Startup incubation programs",
      children: [
        // { label: "Overview", href: "/entrepreneurship", description: "Entrepreneurship programs overview" },
        { label: "Startup Incubation", href: "/incubation", description: "Startup incubation and support programs" },
        { label: "Events", href: "/events", description: "Entrepreneurship events and workshops" },
        { label: "Startups & Support", href: "/startups", description: "Our incubated startup portfolio" },
      ]
    },
    { label: "Faculty & Staff", href: "/faculty", description: "Meet our faculty and staff" },
    // { label: "Blog", href: "/blog", description: "Industry insights and updates" },
    { label: "Contact", href: "/contact", description: "Get in touch with us" },
  ],
  ctas: [
    { label: "Apply", href: "/apply", variant: "default" as const },
    { label: "WhatsApp", href: "https://wa.me/919876543210", variant: "ghost" as const, icon: "whatsapp" as const },
  ],
}

export const footerLinks = {
  quickLinks: [
    { title: "About Us", href: "/about" },
    { title: "Diplomas", href: "/diplomas" },
    // { title: "Results", href: "/results" },
    { title: "Faculty & Staff", href: "/faculty" },
    { title: "Notice Board", href: "/notices" },
    // { title: "Downloads", href: "/downloads" }
  ],
  resources: [
    // { title: "Blog", href: "/blog" },
    { title: "Startups", href: "/startups" },
    { title: "Contact", href: "/contact" },
    { title: "Apply Now", href: "/apply" },
    { title: "Entrepreneurship", href: "/entrepreneurship" },
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
    facebook: "https://www.facebook.com/p/Step-Gndec-100081516967348/",
    // twitter: "https://twitter.com/stepinstitute",
    linkedin: "https://www.linkedin.com/in/step-gndec-835624367/?originalSubdomain=in",
    instagram: "https://www.instagram.com/step.gndec/"
  },
  languages: [
    { code: "en", name: "English" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "hi", name: "हिंदी" }
  ]
}

export const whatsappNumber = "+919876543210"