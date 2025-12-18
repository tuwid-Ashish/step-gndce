# STEP Institute Website - Database Schema & Data Flow

## Overview
This document outlines the complete database structure, entity relationships, and data flow for the STEP Institute website.

---

## Core Entities

### 1. **Diplomas & Courses**

#### `diplomas`
One-year diploma programs offered by STEP
```typescript
{
  id: string
  slug: string // URL-friendly identifier
  title: string // e.g., "Diploma in Computer Application (DCA)"
  shortName: string // e.g., "DCA"
  description: string // Full course description
  blurb: string // Short 1-2 line summary
  duration: string // "1 Year"
  eligibility: string // "+2" or specific requirements
  fee: number
  seats: number
  syllabus: string // URL to PDF or rich text
  highlights: string[] // Key features/outcomes
  category: "technical" | "business" | "creative" | "engineering"
  isActive: boolean
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### `pgDiplomas`
Post-graduate diploma programs
```typescript
{
  id: string
  slug: string
  title: string // e.g., "PGDCA", "PGDBA"
  shortName: string
  description: string
  blurb: string
  duration: string // "1 Year"
  eligibility: string // "Graduate"
  fee: number
  seats: number
  syllabus: string
  highlights: string[]
  category: string
  isActive: boolean
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### `industrialTrainings`
Short-term industrial training courses
```typescript
{
  id: string
  slug: string
  title: string // e.g., "Python Programming", "Django Framework"
  description: string
  duration: string // "6 Weeks", "3 Months"
  fee: number
  technology: string[] // ["Python", "Django", "REST API"]
  level: "beginner" | "intermediate" | "advanced"
  prerequisites: string
  maxParticipants: number
  syllabus: string
  outcomes: string[] // Learning outcomes
  isActive: boolean
  upcomingBatch: {
    startDate: date
    endDate: date
    registrationDeadline: date
  }
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

### 2. **Faculty & Staff**

#### `faculty`
Teaching faculty and staff members
```typescript
{
  id: string
  slug: string // URL-friendly name
  name: string
  designation: string // "Professor", "Assistant Professor", "Instructor"
  department: string // Reference to diploma/department
  photoUrl: string
  email: string
  phone: string
  qualification: string // "Ph.D. in Computer Science"
  specialization: string[]
  experience: number // years
  bio: string // Detailed biography
  education: {
    degree: string
    institution: string
    year: number
  }[]
  experience: {
    position: string
    organization: string
    duration: string
    description: string
  }[]
  publications: {
    title: string
    year: number
    journal: string
    link: string
  }[]
  awards: {
    title: string
    year: number
    description: string
  }[]
  researchInterests: string[]
  socialLinks: {
    linkedin?: string
    researchGate?: string
    googleScholar?: string
  }
  isActive: boolean
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### `departments`
Academic departments (linked to diplomas)
```typescript
{
  id: string
  slug: string
  name: string // "Computer Application", "Business Administration"
  description: string
  headOfDepartment: string // Reference to faculty.id
  faculty: string[] // Array of faculty.id
  laboratories: {
    name: string
    description: string
    facilities: string[]
  }[]
  programs: string[] // Array of diploma/course IDs
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

### 3. **Notices & Announcements**

#### `notices`
Official notices and announcements
```typescript
{
  id: string
  slug: string
  title: string
  excerpt: string // Short summary
  content: string // Full rich text content
  category: "admission" | "exam" | "result" | "event" | "general" | "urgent"
  isPinned: boolean // Show at top
  isImportant: boolean // Highlight with badge
  publishDate: date
  expiryDate: date | null // Optional expiry
  attachments: {
    name: string
    url: string
    type: "pdf" | "doc" | "image"
    size: number
  }[]
  targetAudience: "all" | "students" | "faculty" | "specific" // Who should see this
  views: number
  createdBy: string // Admin/faculty ID
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

### 4. **Results & Examinations**

#### `examinations`
Exam schedule and metadata
```typescript
{
  id: string
  name: string // "Final Exam 2025", "Mid-Term Assessment"
  program: string // Diploma/course reference
  semester: number
  examDate: date
  resultPublishDate: date | null
  status: "scheduled" | "ongoing" | "completed" | "results_published"
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### `results`
Student examination results
```typescript
{
  id: string
  examinationId: string // Reference to examinations
  rollNumber: string // Student identifier
  studentName: string
  program: string // Diploma/course name
  semester: number
  dateOfBirth: date // For verification
  subjects: {
    subjectCode: string
    subjectName: string
    totalMarks: number
    obtainedMarks: number
    grade: string
    status: "pass" | "fail" | "absent"
  }[]
  totalMarks: number
  obtainedMarks: number
  percentage: number
  cgpa: number
  result: "pass" | "fail" | "detained"
  division: "distinction" | "first" | "second" | "third" | null
  remarks: string
  publishedAt: timestamp
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

### 5. **Entrepreneurship Programs**

#### `entrepreneurshipPrograms`
EAC, EDP, and other programs
```typescript
{
  id: string
  slug: string
  name: string // "Entrepreneurship Awareness Camp (EAC)"
  shortName: string // "EAC"
  description: string
  objectives: string[]
  duration: string // "3 Days", "6-8 Weeks"
  format: "workshop" | "bootcamp" | "mentorship" | "training"
  eligibility: string
  fee: number
  maxParticipants: number
  outcomes: string[]
  schedule: {
    session: string
    topic: string
    duration: string
  }[]
  mentors: string[] // Faculty/guest IDs
  isActive: boolean
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### `entrepreneurshipEvents`
Specific event instances of programs
```typescript
{
  id: string
  programId: string // Reference to entrepreneurshipPrograms
  title: string
  description: string
  startDate: date
  endDate: date
  venue: string
  registrationDeadline: date
  registeredCount: number
  maxParticipants: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  speakers: {
    name: string
    designation: string
    organization: string
    photoUrl: string
    topic: string
  }[]
  schedule: {
    date: date
    time: string
    session: string
    speaker: string
  }[]
  gallery: string[] // Photo URLs
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

### 6. **Startups & Incubation**

#### `startups`
Incubated startups and companies
```typescript
{
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  logoUrl: string
  coverImage: string
  founded: date
  founders: {
    name: string
    role: string
    photoUrl: string
    linkedin: string
  }[]
  industry: string[] // ["EdTech", "HealthTech", "FinTech"]
  stage: "idea" | "pre-seed" | "seed" | "early" | "growth" | "graduated"
  status: "active" | "graduated" | "discontinued"
  problem: string // Problem statement
  solution: string // Their solution
  traction: {
    metric: string
    value: string
  }[]
  fundingRaised: number
  teamSize: number
  website: string
  socialLinks: {
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
  }
  mentor: string // Faculty ID
  incubationStartDate: date
  incubationEndDate: date | null
  achievements: {
    title: string
    date: date
    description: string
  }[]
  media: {
    type: "image" | "video" | "article"
    url: string
    caption: string
  }[]
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

### 7. **Events & Activities**

#### `events`
General institute events (cultural, technical, workshops)
```typescript
{
  id: string
  slug: string
  title: string
  description: string
  category: "technical" | "cultural" | "workshop" | "seminar" | "sports" | "other"
  type: "online" | "offline" | "hybrid"
  startDate: date
  endDate: date
  startTime: string
  endTime: string
  venue: string
  venueLink: string | null // Google Maps or virtual link
  organizer: string // Department or faculty
  registrationRequired: boolean
  registrationLink: string | null
  registrationDeadline: date | null
  maxParticipants: number | null
  fee: number
  posterUrl: string
  gallery: string[] // Event photos
  speakers: {
    name: string
    designation: string
    organization: string
    photoUrl: string
  }[]
  agenda: {
    time: string
    activity: string
    speaker: string | null
  }[]
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  featured: boolean
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

### 8. **Blog & News**

#### `blogs`
Blog posts, articles, success stories
```typescript
{
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // Rich text/markdown
  coverImage: string
  author: {
    id: string
    name: string
    role: string
    photoUrl: string
  }
  category: "news" | "success-story" | "announcement" | "tips" | "industry-insights"
  tags: string[]
  featured: boolean
  readTime: number // minutes
  views: number
  status: "draft" | "published" | "archived"
  publishedAt: date | null
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

### 9. **Applications & Admissions**

#### `applications`
Student admission applications
```typescript
{
  id: string
  applicationNumber: string // Auto-generated
  program: string // Diploma/course reference
  programType: "diploma" | "pgDiploma" | "industrialTraining"
  
  // Personal Details
  personalInfo: {
    firstName: string
    middleName: string | null
    lastName: string
    dateOfBirth: date
    gender: "male" | "female" | "other"
    category: "general" | "obc" | "sc" | "st" | "other"
    nationality: string
    photoUrl: string
  }
  
  // Contact Details
  contactInfo: {
    email: string
    phone: string
    alternatePhone: string | null
    whatsapp: string
    address: {
      street: string
      city: string
      state: string
      pincode: string
      country: string
    }
  }
  
  // Educational Details
  education: {
    qualification: string // "+2", "Graduate"
    board: string
    school: string
    yearOfPassing: number
    percentage: number
    rollNumber: string
    certificates: string[] // Document URLs
  }
  
  // Parent/Guardian Details
  guardianInfo: {
    name: string
    relation: string
    phone: string
    occupation: string
    email: string
  }
  
  // Application Status
  status: "draft" | "submitted" | "under_review" | "accepted" | "rejected" | "waitlisted"
  remarks: string | null
  reviewedBy: string | null // Admin ID
  reviewedAt: timestamp | null
  
  // Payment
  payment: {
    status: "pending" | "completed" | "failed" | "refunded"
    amount: number
    transactionId: string | null
    paymentDate: date | null
  }
  
  submittedAt: timestamp | null
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

### 10. **Testimonials**

#### `testimonials`
Student/alumni/partner testimonials
```typescript
{
  id: string
  name: string
  role: string // "Alumni 2023", "Current Student", "Industry Partner"
  program: string | null // Which diploma/course
  photoUrl: string
  quote: string
  rating: number // 1-5
  category: "student" | "alumni" | "industry" | "parent"
  company: string | null // Current company if alumni
  isApproved: boolean
  isFeatured: boolean // Show on homepage
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

### 11. **Institute Information**

#### `instituteInfo`
General institute settings and content
```typescript
{
  id: "singleton" // Only one record
  
  // Director Info
  director: {
    name: string
    title: string
    photoUrl: string
    quote: string
    message: string // Full message in rich text
    messageHref: string
  }
  
  // Institute Objectives
  objectives: string[]
  
  // About Information
  about: {
    establishment: date
    vision: string
    mission: string
    history: string
    infrastructure: string
  }
  
  // Incubator Info
  incubator: {
    tagline: string
    description: string
    facilities: string[]
    achievements: {
      metric: string
      value: string
    }[]
  }
  
  // Contact Details
  contact: {
    phone: string
    alternatePhone: string | null
    email: string
    whatsapp: string
    address: {
      street: string
      city: string
      state: string
      pincode: string
      country: string
      mapLink: string
    }
    officeHours: {
      weekday: string // "Mon-Fri 09:00-17:00"
      saturday: string // "Sat 09:00-13:00"
      sunday: string // "Closed"
    }
  }
  
  // Social Media
  socialMedia: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
    youtube: string
  }
  
  // Media Assets
  media: {
    heroVideo: string // YouTube embed ID
    heroPoster: string
    logo: string
    favicon: string
  }
  
  updatedAt: timestamp
}
```

---

### 12. **Users & Authentication**

#### `users`
Admin and staff users
```typescript
{
  id: string
  email: string
  passwordHash: string
  name: string
  role: "super_admin" | "admin" | "faculty" | "staff"
  permissions: string[] // ["manage_notices", "manage_results", etc.]
  facultyId: string | null // Link to faculty if applicable
  photoUrl: string | null
  isActive: boolean
  lastLogin: timestamp
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

## Relationships & Data Flow

### Entity Relationships

```
diplomas/pgDiplomas
  ↓ has many
  applications
  ↓ has many
  results
  
departments
  ↓ has many
  faculty
  ↓ teaches in
  diplomas
  
faculty
  ↓ mentors
  startups
  ↓ conducts
  entrepreneurshipEvents
  
entrepreneurshipPrograms
  ↓ has many instances
  entrepreneurshipEvents
  
startups
  ↓ founded by
  alumni/students
  ↓ showcased in
  blogs
  
events
  ↓ generates
  notices
  ↓ creates
  gallery/blogs
```

### Data Flow Diagrams

#### **Admission Flow**
```
Student fills application form
  ↓
Application saved as "draft"
  ↓
Student submits + payment
  ↓
Status: "submitted"
  ↓
Admin reviews application
  ↓
Status: "accepted" / "rejected" / "waitlisted"
  ↓
If accepted → Student enrolled
  ↓
Roll number generated
  ↓
Student appears in results system
```

#### **Results Publication Flow**
```
Exam conducted
  ↓
Faculty enters marks
  ↓
Results compiled
  ↓
Admin approves results
  ↓
Results published
  ↓
Notice created (auto)
  ↓
Students can check via roll number + DOB
```

#### **Startup Incubation Flow**
```
Student/team applies for incubation
  ↓
Pitch presentation
  ↓
Selection committee review
  ↓
If selected → Startup record created
  ↓
Status: "idea" → "pre-seed" → "seed" → "growth"
  ↓
Mentor assigned
  ↓
Regular reviews and updates
  ↓
Featured in startups page
  ↓
Graduation or exit
```

---

## Database Technology Recommendations

### Options

1. **PostgreSQL** (Recommended)
   - Strong relational capabilities
   - JSON support for flexible fields
   - ACID compliance
   - Great for complex queries

2. **MongoDB**
   - Flexible schema
   - Good for rapid iteration
   - Easy to scale horizontally

3. **Supabase** (PostgreSQL + Real-time)
   - Built-in authentication
   - Real-time subscriptions
   - Auto-generated APIs
   - Storage for files

4. **Prisma + PostgreSQL**
   - Type-safe database client
   - Excellent TypeScript integration
   - Migration system
   - Fits perfectly with Next.js

---

## Implementation Priority

### Phase 1 (MVP)
- [ ] Institute Info
- [ ] Diplomas/PG Diplomas
- [ ] Faculty
- [ ] Notices
- [ ] Contact forms

### Phase 2
- [ ] Industrial Trainings
- [ ] Applications & Admissions
- [ ] Results system
- [ ] Testimonials

### Phase 3
- [ ] Entrepreneurship Programs
- [ ] Events
- [ ] Blogs
- [ ] Startups showcase

### Phase 4
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Analytics
- [ ] Advanced search

---

## File Upload Requirements

### Storage Needed For:
- Faculty photos
- Student photos (applications)
- Certificates and documents
- Event posters and galleries
- Blog cover images
- Startup logos and media
- Notice attachments
- Course syllabi (PDFs)
- Result marksheets (PDFs)

### Recommended Storage Solutions:
1. **Cloudinary** - Images and media
2. **AWS S3** - Documents and files
3. **Supabase Storage** - All-in-one solution
4. **Vercel Blob** - Simple, integrated with Next.js

---

## Security Considerations

1. **Authentication**: 
   - Admin/faculty login with JWT or session-based auth
   - Role-based access control (RBAC)

2. **Data Protection**:
   - Results access: Roll number + DOB verification
   - Personal data encryption
   - GDPR compliance for EU users

3. **File Security**:
   - Signed URLs for sensitive documents
   - Virus scanning for uploads
   - File type validation

4. **API Security**:
   - Rate limiting
   - CSRF protection
   - Input validation and sanitization

---

## Next Steps

1. Choose database technology (Recommend: Prisma + PostgreSQL)
2. Set up database schema
3. Create Prisma models
4. Generate migrations
5. Seed initial data
6. Build API routes
7. Create admin dashboard
8. Implement authentication

---

*Document created: December 17, 2025*
*Last updated: December 17, 2025*
