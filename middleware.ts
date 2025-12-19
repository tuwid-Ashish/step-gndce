import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check for session token (NextAuth uses either __Secure-authjs.session-token or authjs.session-token)
  const token = request.cookies.get("authjs.session-token") || 
                request.cookies.get("__Secure-authjs.session-token")

  // Protect admin routes - redirect to login if no token
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }
    // Note: Role-based access control is now handled in individual admin pages via auth()
  }

  // Redirect to admin if already has token and trying to access login
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
