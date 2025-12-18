# Raw SQL Schema for STEP Institute Database

This document contains the raw SQL statements that correspond to the Prisma schema. These queries show the exact table structure that will be created in PostgreSQL.

---

## Create Tables

### 1. Users Table

```sql
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ACADEMIC_STAFF', 'CONTENT_EDITOR');

CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CONTENT_EDITOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
```

---

### 2. Courses Table

```sql
CREATE TABLE "courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL UNIQUE,
    "duration" TEXT NOT NULL,
    "syllabusUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE UNIQUE INDEX "courses_code_key" ON "courses"("code");
```

---

### 3. Faculty Table

```sql
CREATE TABLE "faculty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "photoUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE UNIQUE INDEX "faculty_email_key" ON "faculty"("email");
```

---

### 4. Notices Table

```sql
CREATE TYPE "NoticeCategory" AS ENUM ('GENERAL', 'URGENT', 'ADMISSION', 'EXAM', 'RESULT', 'EVENT');

CREATE TABLE "notices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "NoticeCategory" NOT NULL DEFAULT 'GENERAL',
    "attachmentUrl" TEXT,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "notices_isPinned_createdAt_idx" ON "notices"("isPinned", "createdAt");
```

---

### 5. Results Table

```sql
CREATE TABLE "results" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rollNumber" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "sgpa" DOUBLE PRECISION,
    "cgpa" DOUBLE PRECISION,
    "resultData" JSONB NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    
    CONSTRAINT "results_courseId_fkey" 
        FOREIGN KEY ("courseId") 
        REFERENCES "courses"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "results_rollNumber_courseId_semester_key" 
    ON "results"("rollNumber", "courseId", "semester");

CREATE INDEX "results_rollNumber_idx" ON "results"("rollNumber");
```

---

### 6. Blogs Table

```sql
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "publishedAt" TIMESTAMP(3),
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    
    CONSTRAINT "blogs_authorId_fkey" 
        FOREIGN KEY ("authorId") 
        REFERENCES "users"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "blogs_slug_key" ON "blogs"("slug");
CREATE INDEX "blogs_slug_idx" ON "blogs"("slug");
CREATE INDEX "blogs_publishedAt_idx" ON "blogs"("publishedAt");
```

---

### 7. Events Table

```sql
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "registrationLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "events_date_idx" ON "events"("date");
```

---

## Sample Queries

### Insert Super Admin User

```sql
-- Note: The password hash is for "AdminPassword123!" using bcrypt
INSERT INTO "users" ("id", "email", "passwordHash", "name", "role")
VALUES (
    'clxyz123456789',
    'admin@stepgndec.in',
    '$2a$10$[BCRYPT_HASH_HERE]',
    'Super Admin',
    'SUPER_ADMIN'
);
```

---

### Query Results with Course Details

```sql
SELECT 
    r."rollNumber",
    r."studentName",
    r."semester",
    r."sgpa",
    r."cgpa",
    c."title" as "courseTitle",
    c."code" as "courseCode"
FROM "results" r
INNER JOIN "courses" c ON r."courseId" = c."id"
WHERE r."rollNumber" = '12345'
ORDER BY r."semester" DESC;
```

---

### Get Latest Pinned Notices

```sql
SELECT 
    "id",
    "title",
    "content",
    "category",
    "isPinned",
    "createdAt"
FROM "notices"
WHERE "isPinned" = true
ORDER BY "createdAt" DESC
LIMIT 5;
```

---

### Get Published Blogs with Author

```sql
SELECT 
    b."id",
    b."title",
    b."slug",
    b."coverImage",
    b."publishedAt",
    u."name" as "authorName",
    u."email" as "authorEmail"
FROM "blogs" b
INNER JOIN "users" u ON b."authorId" = u."id"
WHERE b."publishedAt" IS NOT NULL
ORDER BY b."publishedAt" DESC;
```

---

### Get Upcoming Events

```sql
SELECT 
    "id",
    "title",
    "description",
    "date",
    "venue",
    "registrationLink"
FROM "events"
WHERE "date" >= CURRENT_TIMESTAMP
ORDER BY "date" ASC
LIMIT 10;
```

---

## JSON Structure Example

### Result Data JSON Format

```json
{
  "subjects": [
    {
      "code": "CS101",
      "name": "Programming Fundamentals",
      "totalMarks": 100,
      "obtainedMarks": 85,
      "grade": "A"
    },
    {
      "code": "CS102",
      "name": "Database Systems",
      "totalMarks": 100,
      "obtainedMarks": 78,
      "grade": "B+"
    }
  ],
  "totalMarks": 200,
  "obtainedMarks": 163,
  "percentage": 81.5
}
```

---

## Indexes Explanation

### Performance Optimizations

1. **users.email** - Unique index for fast login lookup
2. **courses.code** - Unique index for course identification
3. **faculty.email** - Unique index for faculty lookup
4. **notices (isPinned, createdAt)** - Composite index for homepage queries
5. **results.rollNumber** - Fast student result lookup
6. **results (rollNumber, courseId, semester)** - Unique constraint preventing duplicates
7. **blogs.slug** - Fast blog post lookup by URL
8. **blogs.publishedAt** - Efficient published posts queries
9. **events.date** - Fast upcoming events queries

---

*Generated from Prisma schema on December 17, 2025*
