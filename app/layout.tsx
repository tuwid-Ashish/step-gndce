import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/components/site-config";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "diploma courses Ludhiana",
    "GNDEC programs",
    "STEP Institute GNDEC",
    "startup incubation Punjab",
    "industrial training Ludhiana",
    "PG diploma courses",
    "entrepreneurship programs India",
    "technical education Punjab",
    "GNDCE Ludhiana",
    "professional training institute"
  ],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "STEP GNDEC - Train. Incubate. Launch.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@stepinstitute",
    images: ["/image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "your-google-verification-code", // TODO: Add your Google Search Console verification code
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "STEP Institute GNDEC",
    "alternateName": "Science & Technology Entrepreneurs' Park, GNDEC",
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/image.png`,
    "description": "Leading professional training and startup incubation institute offering diploma programs, industrial training, and entrepreneurship support in Ludhiana, Punjab.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "STEP Institute Campus, GNDCE",
      "addressLocality": "Ludhiana",
      "addressRegion": "Punjab",
      "postalCode": "141006",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.contact.phone[0],
      "contactType": "Admissions",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi", "Punjabi"]
    },
    "sameAs": [
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
      siteConfig.social.instagram
    ],
    "foundingLocation": {
      "@type": "Place",
      "name": "Ludhiana, Punjab, India"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteNavbar />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
          <Sonner />
        </AuthProvider>
      </body>
    </html>
  );
}
