# Backend Setup Guide - STEP Institute

## 📦 What Was Created

### Files Created:
1. **`prisma/schema.prisma`** - Database schema with all models
2. **`lib/auth.ts`** - NextAuth v5 configuration with role-based access
3. **`lib/prisma.ts`** - Prisma client singleton
4. **`app/api/auth/[...nextauth]/route.ts`** - NextAuth API route
5. **`prisma/seed.ts`** - Database seeding script
6. **`docs/SQL_SCHEMA.md`** - Raw SQL documentation
7. **`.env.example`** - Environment variables template

### Database Models:
- ✅ User (with roles: SUPER_ADMIN, ACADEMIC_STAFF, CONTENT_EDITOR)
- ✅ Course
- ✅ Faculty
- ✅ Notice (with categories)
- ✅ Result (with JSON data for subjects)
- ✅ Blog
- ✅ Event

---

## 🚀 Setup Instructions

### Step 1: Install Dependencies

```powershell
npm install
```

This installs:
- `@prisma/client` - Prisma ORM client
- `prisma` - Prisma CLI (dev dependency)
- `next-auth` (v5 beta) - Authentication
- `@auth/prisma-adapter` - NextAuth adapter for Prisma
- `bcryptjs` - Password hashing
- `tsx` - TypeScript execution for seed script

---

### Step 2: Set Up PostgreSQL Database

#### Option A: Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a database:
```sql
CREATE DATABASE step_institute;
```

#### Option B: Cloud Database (Recommended)
Use one of these free tiers:
- **Supabase** (https://supabase.com) - Free 500MB
- **Neon** (https://neon.tech) - Free serverless Postgres
- **Railway** (https://railway.app) - Free $5 credit/month

---

### Step 3: Configure Environment Variables

1. Copy the example file:
```powershell
Copy-Item .env.example .env
```

2. Edit `.env` and update:
```env
# Your PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/step_institute?schema=public"

# NextAuth configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-here"
```

**Generate NEXTAUTH_SECRET:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Step 4: Initialize Database

Run these commands in order:

```powershell
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Seed initial data (creates Super Admin)
npm run db:seed
```

**Expected Output:**
```
✅ Super Admin created: admin@stepgndec.in
✅ Sample course created: Diploma in Computer Application (DCA)
✅ Sample faculty created: Dr. Sample Faculty
✅ Sample notice created: Welcome to STEP Institute
🎉 Database seeded successfully!
```

---

### Step 5: Verify Setup

Open Prisma Studio to view your data:
```powershell
npm run db:studio
```

This opens a GUI at `http://localhost:5555` where you can:
- View all tables
- Edit data
- Run queries

---

## 🔐 Initial Super Admin Credentials

**Email:** `admin@stepgndec.in`  
**Password:** `AdminPassword123!`

⚠️ **IMPORTANT:** Change this password immediately in production!

---

## 📝 Available Scripts

```powershell
# Development
npm run dev                 # Start Next.js dev server

# Database Commands
npm run db:generate        # Generate Prisma Client
npm run db:push           # Push schema changes to DB (no migrations)
npm run db:migrate        # Create and run migrations
npm run db:studio         # Open Prisma Studio GUI
npm run db:seed           # Seed database with initial data
```

---

## 🔧 Using Authentication in Your App

### Server Component (Page/Layout)

```typescript
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const session = await auth()
  
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

export default function ProfileClient() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <div>Loading...</div>
  if (status === "unauthenticated") return <div>Not logged in</div>
  
  return (
    <div>
      <h1>{session.user.name}</h1>
      <p>Role: {session.user.role}</p>
    </div>
  )
}
```

### API Route Protection

```typescript
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  if (session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  
  // Protected logic here
  return NextResponse.json({ data: "Secret data" })
}
```

---

## 🗄️ Database Queries Examples

### Create a New Notice

```typescript
import { prisma } from "@/lib/prisma"

const notice = await prisma.notice.create({
  data: {
    title: "Exam Schedule Announced",
    content: "The final exams will begin from January 15, 2026",
    category: "EXAM",
    isPinned: true,
  },
})
```

### Get Student Results

```typescript
const results = await prisma.result.findMany({
  where: {
    rollNumber: "12345",
  },
  include: {
    course: true, // Include course details
  },
  orderBy: {
    semester: "desc",
  },
})
```

### Create Blog Post

```typescript
const blog = await prisma.blog.create({
  data: {
    title: "Success Story: Alumni Startup",
    slug: "success-story-alumni-startup",
    content: "Rich text content here...",
    coverImage: "/images/blog-cover.jpg",
    publishedAt: new Date(),
    authorId: session.user.id,
  },
})
```

### Get Active Faculty by Department

```typescript
const faculty = await prisma.faculty.findMany({
  where: {
    department: "Computer Science",
    isActive: true,
  },
  orderBy: {
    name: "asc",
  },
})
```

---

## 🛡️ Role-Based Access Control

### User Roles Hierarchy

1. **SUPER_ADMIN**
   - Full system access
   - User management
   - All CRUD operations

2. **ACADEMIC_STAFF**
   - Manage courses, faculty, results
   - Create notices related to academics
   - View applications

3. **CONTENT_EDITOR**
   - Manage blogs, events
   - Create general notices
   - Limited access

### Middleware Example (Optional)

Create `middleware.ts` in project root:

```typescript
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  
  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    
    if (req.auth.user.role === "CONTENT_EDITOR" && pathname.startsWith("/admin/users")) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*"],
}
```

---

## 📊 Database Migrations

When you modify the schema:

```powershell
# Create migration
npm run db:migrate

# Name your migration
# Example: "add_startup_table"
```

This creates a migration file in `prisma/migrations/` that tracks schema changes.

---

## 🔍 Troubleshooting

### Issue: "P1001: Can't reach database server"
**Solution:** Check your DATABASE_URL in `.env`

### Issue: "Environment variable not found: DATABASE_URL"
**Solution:** Ensure `.env` file exists and is at project root

### Issue: Prisma Client not generated
**Solution:** Run `npm run db:generate`

### Issue: TypeScript errors with session.user.role
**Solution:** Restart TypeScript server in VS Code (Ctrl+Shift+P → "TypeScript: Restart TS Server")

---

## 📚 Next Steps

1. ✅ **Complete** - Database setup
2. ✅ **Complete** - Authentication configuration
3. 🔄 **Next** - Create login page
4. 🔄 **Next** - Build admin dashboard
5. 🔄 **Next** - Implement CRUD APIs for each model
6. 🔄 **Next** - Add file upload for images/documents
7. 🔄 **Next** - Create public-facing pages

---

## 📖 References

- **Prisma Docs:** https://www.prisma.io/docs
- **NextAuth v5 Docs:** https://authjs.dev/getting-started/introduction
- **Next.js 15 Docs:** https://nextjs.org/docs

---

*Setup guide created: December 17, 2025*
