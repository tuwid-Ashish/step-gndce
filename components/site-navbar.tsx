"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, MessageCircle, ChevronDown, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Container } from "@/components/container"
import { MainLogo } from "@/components/main-logo"
import { nav, siteConfig } from "@/components/site-config"
import { cn } from "@/lib/utils"

export function SiteNavbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <MainLogo />

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {nav.main.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          pathname === item.href || item.children.some(child => pathname === child.href) 
                            ? "bg-accent text-accent-foreground" 
                            : ""
                        )}
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                    pathname === child.href && "bg-accent text-accent-foreground"
                                  )}
                                >
                                  <div className="text-sm font-medium leading-none">{child.label}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {child.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname === item.href && "bg-accent text-accent-foreground"
                        )}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            {nav.ctas.map((cta) => (
              cta.icon === "whatsapp" ? (
                <Button
                  key={cta.href}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <Link 
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button key={cta.href} variant={cta.variant} asChild>
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              )
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Globe className="h-4 w-4" />
                  EN
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {siteConfig.languages.map((lang) => (
                  <DropdownMenuItem key={lang.code}>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-2">
            {nav.ctas.map((cta) => (
              cta.icon === "whatsapp" ? (
                <Button
                  key={cta.href}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-green-600 hover:text-green-700"
                >
                  <Link 
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Link>
                </Button>
              ) : null
            ))}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>
                    <MainLogo />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-1 mt-8">
                  {nav.main.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href && "bg-brand-50 font-medium"
                        )}
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "block px-3 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                                pathname === child.href && "text-foreground bg-accent"
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="pt-4 border-t border-border mt-4">
                    {nav.ctas.map((cta) => (
                      cta.icon !== "whatsapp" ? (
                        <Button key={cta.href} asChild className="w-full mb-3">
                          <Link href={cta.href} onClick={() => setIsOpen(false)}>
                            {cta.label}
                          </Link>
                        </Button>
                      ) : null
                    ))}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Language:</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Globe className="h-4 w-4" />
                            EN
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {siteConfig.languages.map((lang) => (
                            <DropdownMenuItem key={lang.code}>
                              {lang.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}