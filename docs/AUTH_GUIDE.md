# Authentication Setup - Complete Guide

## ✅ What's Implemented

### 1. **Core Authentication Files**
- ✅ `lib/auth.ts` - NextAuth v5 configuration with role-based access
- ✅ `lib/prisma.ts` - Prisma client singleton
- ✅ `app/api/auth/[...nextauth]/route.ts` - Auth API endpoints
- ✅ `components/auth-provider.tsx` - Session provider wrapper
- ✅ `middleware.ts` - Route protection middleware
- ✅ `lib/hooks/use-auth.ts` - Custom auth hooks for client components

### 2. **User Interface**
- ✅ `app/login/page.tsx` - Login page with credentials form
- ✅ `app/admin/page.tsx` - Protected admin dashboard (updated with auth)
- ✅ `app/admin/layout.tsx` - Admin layout with auth check
- ✅ Sign out functionality integrated

### 3. **Database**
- ✅ User model with roles (SUPER_ADMIN, ACADEMIC_STAFF, CONTENT_EDITOR)
- ✅ Password hashing with bcryptjs
- ✅ Seed script with initial Super Admin

---

## 🔐 Default Credentials

**Email:** `admin@stepgndec.in`  
**Password:** `AdminPassword123!`

⚠️ Change this immediately in production!

---

## 🚀 Quick Start

### 1. Run the development server
```powershell
npm run dev
```

### 2. Access the login page
Navigate to: http://localhost:3000/login

### 3. Sign in with default credentials

### 4. You'll be redirected to the admin dashboard
Navigate to: http://localhost:3000/admin

---

## 📝 How Authentication Works

### Session Management

NextAuth v5 uses JWT-based sessions with role injection:

```typescript
// Session structure
{
  user: {
    id: string
    email: string
    name: string
    role: "SUPER_ADMIN" | "ACADEMIC_STAFF" | "CONTENT_EDITOR"
  }
}
```

### Protected Routes

Routes are protected using:

1. **Middleware** (`middleware.ts`) - Guards `/admin/*` routes
2. **Server Components** - Use `auth()` function
3. **Client Components** - Use `useSession()` hook

---

## 🛡️ Usage Examples

### Server Component (Recommended for Pages)

```typescript
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ProtectedPage() {
  const session = await auth()
  
  // Check if authenticated
  if (!session) {
    redirect("/login")
  }
  
  // Check role
  if (session.user.role !== "SUPER_ADMIN") {
    return <div>Access Denied</div>
  }
  
  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Role: {session.user.role}</p>
    </div>
  )
}
```

### Client Component

```typescript
"use client"

import { useSession } from "next-auth/react"

export default function ClientComponent() {
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return <div>Loading...</div>
  }
  
  if (status === "unauthenticated") {
    return <div>Not logged in</div>
  }
  
  return (
    <div>
      <h1>{session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
    </div>
  )
}
```

### Custom Hook (useAuth)

```typescript
"use client"

import { useAuth } from "@/lib/hooks/use-auth"

export default function MyComponent() {
  const { session, status, isLoading } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  
  return <div>Hello, {session?.user.name}</div>
}
```

### Sign Out (Server Action)

```typescript
import { signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/login" })
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  )
}
```

### Sign Out (Client Side)

```typescript
"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/login" })}>
      Sign Out
    </Button>
  )
}
```

---

## 🔒 API Route Protection

### Example Protected API

```typescript
// app/api/protected/route.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  // Role-based access
  if (session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  
  return NextResponse.json({ data: "Secret data" })
}
```

---

## 👥 Role-Based Access Control

### Role Hierarchy

1. **SUPER_ADMIN**
   - ✅ Full system access
   - ✅ User management
   - ✅ All CRUD operations
   - ✅ Can access `/admin/users`

2. **ACADEMIC_STAFF**
   - ✅ Manage courses, faculty, results
   - ✅ Create academic notices
   - ✅ View applications
   - ❌ Cannot manage users

3. **CONTENT_EDITOR**
   - ✅ Manage blogs and events
   - ✅ Create general notices
   - ❌ Cannot access academic data
   - ❌ Cannot manage users

### Middleware Protection

The `middleware.ts` file automatically:
- Redirects unauthenticated users to `/login`
- Blocks CONTENT_EDITOR from `/admin/results`
- Blocks non-SUPER_ADMIN from `/admin/users`
- Redirects authenticated users away from `/login`

---

## 🔧 Advanced Usage

### Check Role in Component

```typescript
import { auth } from "@/lib/auth"

export default async function MyComponent() {
  const session = await auth()
  
  const isSuperAdmin = session?.user.role === "SUPER_ADMIN"
  const isAcademic = session?.user.role === "ACADEMIC_STAFF"
  const isEditor = session?.user.role === "CONTENT_EDITOR"
  
  return (
    <div>
      {isSuperAdmin && <AdminOnlyContent />}
      {(isSuperAdmin || isAcademic) && <AcademicContent />}
      <PublicContent />
    </div>
  )
}
```

### Conditional Rendering

```typescript
{session?.user.role === "SUPER_ADMIN" && (
  <Button>Delete User</Button>
)}
```

### Helper Function

```typescript
// lib/utils/auth.ts
import { auth } from "@/lib/auth"

export async function requireRole(role: string) {
  const session = await auth()
  
  if (!session) {
    throw new Error("Unauthorized")
  }
  
  if (session.user.role !== role) {
    throw new Error("Forbidden")
  }
  
  return session
}

// Usage in Server Component
export default async function AdminOnlyPage() {
  await requireRole("SUPER_ADMIN")
  
  return <div>Super Admin Content</div>
}
```

---

## 👤 User Management

### Create New User (Server Action)

```typescript
"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function createUser(formData: FormData) {
  const session = await auth()
  
  // Only SUPER_ADMIN can create users
  if (session?.user.role !== "SUPER_ADMIN") {
    throw new Error("Forbidden")
  }
  
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const role = formData.get("role") as "SUPER_ADMIN" | "ACADEMIC_STAFF" | "CONTENT_EDITOR"
  
  const passwordHash = await bcrypt.hash(password, 10)
  
  await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      role,
    },
  })
  
  redirect("/admin/users")
}
```

### Change Password

```typescript
"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { auth } from "@/lib/auth"

export async function changePassword(oldPassword: string, newPassword: string) {
  const session = await auth()
  
  if (!session) {
    throw new Error("Unauthorized")
  }
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })
  
  if (!user) {
    throw new Error("User not found")
  }
  
  const isValid = await bcrypt.compare(oldPassword, user.passwordHash)
  
  if (!isValid) {
    throw new Error("Invalid password")
  }
  
  const newHash = await bcrypt.hash(newPassword, 10)
  
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: newHash },
  })
  
  return { success: true }
}
```

---

## 🔍 Debugging

### Check Session in Server Component

```typescript
import { auth } from "@/lib/auth"

export default async function DebugPage() {
  const session = await auth()
  
  return (
    <pre>{JSON.stringify(session, null, 2)}</pre>
  )
}
```

### Check Session in Client Component

```typescript
"use client"

import { useSession } from "next-auth/react"

export default function DebugClient() {
  const { data: session, status } = useSession()
  
  return (
    <div>
      <p>Status: {status}</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
```

---

## 🐛 Troubleshooting

### Issue: "NEXTAUTH_SECRET is not defined"
**Solution:** Add `NEXTAUTH_SECRET` to your `.env` file

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Issue: "Invalid credentials" even with correct password
**Solution:** Re-run the seed script

```powershell
npm run db:seed
```

### Issue: Session not persisting
**Solution:** Check that `AuthProvider` wraps your app in `layout.tsx`

### Issue: TypeScript error on `session.user.role`
**Solution:** Restart TypeScript server
- VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

---

## 📚 Next Steps

1. ✅ **Complete** - Authentication setup
2. ✅ **Complete** - Login page
3. ✅ **Complete** - Admin dashboard with auth
4. ✅ **Complete** - Route protection
5. 🔄 **Next** - Create user management page
6. 🔄 **Next** - Add profile settings
7. 🔄 **Next** - Implement password reset
8. 🔄 **Next** - Add email verification (optional)

---

## 🔗 Resources

- **NextAuth v5 Docs:** https://authjs.dev
- **Prisma Docs:** https://www.prisma.io/docs
- **Next.js Middleware:** https://nextjs.org/docs/app/building-your-application/routing/middleware

---

*Auth setup completed: December 18, 2025*
