import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!session) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }

    // Role-based access control
    if (pathname.startsWith("/admin/users") && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }

    if (
      pathname.startsWith("/admin/results") &&
      session.user.role === "CONTENT_EDITOR"
    ) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  // Redirect to admin if already logged in and trying to access login
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
