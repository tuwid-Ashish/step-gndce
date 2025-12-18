import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

// Example protected API route
export async function GET() {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Example: Only SUPER_ADMIN can access
  if (session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // Your protected logic here
  return NextResponse.json({
    message: "Protected data",
    user: session.user,
  })
}

export async function POST(request: Request) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  // Your protected logic here
  return NextResponse.json({
    message: "Data created successfully",
    data: body,
  })
}
