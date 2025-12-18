import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Hash the admin password
  const hashedPassword = await bcrypt.hash("AdminPassword123!", 10)

  // Create Super Admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@stepgndec.in" },
    update: {},
    create: {
      email: "admin@stepgndec.in",
      passwordHash: hashedPassword,
      name: "Super Admin",
      role: "SUPER_ADMIN",
    },
  })

  console.log("✅ Super Admin created:", admin.email)

  // Create sample courses
  const dcaCourse = await prisma.course.create({
    data: {
      slug: "diploma-computer-application",
      title: "Diploma in Computer Application (DCA)",
      code: "DCA",
      description: "Comprehensive computer application course covering software basics, office automation & practical computing.",
      type: "DIPLOMA",
      duration: "1 Year",
      eligibility: "+2",
      highlights: ["Software Development", "Database Management", "Web Technologies", "Office Automation"],
      isActive: true,
    },
  })

  const pythonTraining = await prisma.course.create({
    data: {
      slug: "python-programming-training",
      title: "Python Programming",
      code: "PYTHON-6W",
      description: "Intensive Python programming course for beginners to advanced learners.",
      type: "INDUSTRIAL_TRAINING",
      duration: "6 Weeks",
      eligibility: "+2 or Graduate",
      highlights: ["Core Python", "Data Structures", "Web Development with Django", "Project Work"],
      isActive: true,
    },
  })

  console.log("✅ Sample courses created:", dcaCourse.title, pythonTraining.title)

  // Create sample faculty
  const faculty1 = await prisma.faculty.create({
    data: {
      slug: "dr-rajesh-kumar",
      name: "Dr. Rajesh Kumar",
      designation: "Program Director & Associate Professor",
      department: "Computer Science",
      email: "rajesh.kumar@stepgndec.in",
      phone: "+91 9876543210",
      specialization: "Web Development, Software Engineering, Database Systems",
      qualifications: [
        "Ph.D. in Computer Science from IIT Delhi",
        "M.Tech in Software Engineering from NIT Warangal",
        "B.Tech in Computer Science from RVCE Bangalore"
      ],
      experience: "15 years",
      bio: "Dr. Rajesh Kumar is an experienced educator and researcher with over 15 years in computer science education. He specializes in web technologies, software engineering practices, and database management systems.",
      teachesDiploma: true,
      teachesTraining: true,
      isActive: true,
    },
  })

  const faculty2 = await prisma.faculty.create({
    data: {
      slug: "prof-priya-sharma",
      name: "Prof. Priya Sharma",
      designation: "Assistant Professor",
      department: "Data Science",
      email: "priya.sharma@stepgndec.in",
      phone: "+91 9876543211",
      specialization: "Machine Learning, Data Analytics, Python Programming",
      qualifications: [
        "M.Tech in Data Science from IIIT Hyderabad",
        "B.Tech in Information Technology from VIT Vellore"
      ],
      experience: "8 years",
      bio: "Prof. Priya Sharma is a passionate educator and researcher in data science. She specializes in machine learning, data analytics, and Python programming.",
      teachesDiploma: true,
      teachesTraining: false,
      isActive: true,
    },
  })

  const faculty3 = await prisma.faculty.create({
    data: {
      slug: "mr-arjun-singh",
      name: "Mr. Arjun Singh",
      designation: "Senior Instructor",
      department: "Digital Marketing",
      email: "arjun.singh@stepgndec.in",
      phone: "+91 9876543212",
      specialization: "SEO, Social Media Marketing, Content Strategy",
      qualifications: [
        "MBA in Marketing from Symbiosis Pune",
        "Google Analytics Certified",
        "HubSpot Content Marketing Certified"
      ],
      experience: "10 years",
      bio: "Arjun Singh is an industry expert in digital marketing with extensive experience in SEO, social media, and content strategy.",
      teachesDiploma: false,
      teachesTraining: true,
      linkedIn: "https://linkedin.com/in/arjun-singh-demo",
      isActive: true,
    },
  })

  console.log("✅ Sample faculty created:", faculty1.name, faculty2.name, faculty3.name)

  // Create sample notices
  const notice1 = await prisma.notice.create({
    data: {
      slug: "welcome-to-step",
      title: "Welcome to STEP Institute",
      excerpt: "This is a sample notice for testing purposes.",
      content: "This is a sample notice for testing purposes. Welcome to Science & Technology Entrepreneurs' Park at GNDEC, Ludhiana.",
      category: "GENERAL",
      isPinned: true,
    },
  })

  const notice2 = await prisma.notice.create({
    data: {
      slug: "admissions-open-2026",
      title: "Admissions Open for 2026",
      excerpt: "Apply now for diploma and industrial training programs.",
      content: "Admissions are now open for all diploma programs and industrial trainings. Limited seats available. Apply online today.",
      category: "ADMISSION",
      isPinned: true,
    },
  })

  console.log("✅ Sample notices created:", notice1.title, notice2.title)

  // Create sample blog posts
  const blog1 = await prisma.blog.create({
    data: {
      slug: "importance-of-skill-development",
      title: "The Importance of Skill Development in Today's Job Market",
      excerpt: "Learn why continuous skill development is crucial for career success in the rapidly evolving technology landscape.",
      content: `# The Importance of Skill Development in Today's Job Market

In today's rapidly changing world, **skill development** has become more crucial than ever. The job market is constantly evolving, and staying relevant requires continuous learning and adaptation.

## Why Skill Development Matters

1. **Stay Competitive**: With automation and AI transforming industries, having up-to-date skills ensures you remain valuable in the job market.
2. **Career Advancement**: Developing new skills opens doors to promotions and better opportunities.
3. **Adaptability**: Learning new technologies helps you adapt to industry changes quickly.

## Key Areas to Focus On

### Technical Skills
- Programming languages (Python, JavaScript, Java)
- Data analysis and visualization
- Cloud computing platforms
- Cybersecurity fundamentals

### Soft Skills
- Communication and presentation
- Problem-solving and critical thinking
- Team collaboration
- Leadership and management

## How STEP Institute Can Help

At STEP Institute, we offer:

- **Industry-relevant curriculum** designed by experts
- **Hands-on training** with real-world projects
- **Flexible learning** options including weekend batches
- **Placement assistance** for career advancement

## Conclusion

Investing in skill development is investing in your future. Whether you're a fresh graduate or an experienced professional, continuous learning is the key to success.

> "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice." - Brian Herbert

**Ready to start your learning journey?** Explore our [diploma programs](/courses/diplomas) and [industrial trainings](/courses/trainings) today!`,
      coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
      authorId: admin.id,
      isPublished: true,
      publishedAt: new Date("2024-12-15"),
    },
  })

  const blog2 = await prisma.blog.create({
    data: {
      slug: "web-development-trends-2025",
      title: "Top Web Development Trends to Watch in 2025",
      excerpt: "Discover the latest web development trends that are shaping the future of the internet and how you can prepare for them.",
      content: `# Top Web Development Trends to Watch in 2025

The web development landscape is evolving at an unprecedented pace. Here are the key trends that will dominate 2025.

## 1. AI-Powered Development

Artificial Intelligence is revolutionizing how we build websites and applications:

- **AI code assistants** like GitHub Copilot are becoming standard tools
- **Automated testing** using AI to find bugs and vulnerabilities
- **Personalization engines** that adapt content to user behavior

## 2. Progressive Web Apps (PWAs)

PWAs continue to bridge the gap between web and native applications:

\`\`\`javascript
// Simple service worker example
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/script.js'
      ]);
    })
  );
});
\`\`\`

## 3. Serverless Architecture

Benefits of going serverless:
- **Lower costs** - pay only for what you use
- **Better scalability** - automatic scaling
- **Less maintenance** - no server management

## 4. WebAssembly (WASM)

WebAssembly is enabling:
- Near-native performance in browsers
- Running languages like C++, Rust in web apps
- Complex applications (video editing, gaming) in browsers

## 5. Enhanced Cybersecurity

Security is more important than ever:
- Zero-trust architecture
- Improved authentication (biometrics, passkeys)
- Regular security audits and updates

## Learn These Skills at STEP

Our **Web Development** courses cover:
- Modern frameworks (React, Next.js, Vue)
- Backend technologies (Node.js, Express, MongoDB)
- Cloud deployment (AWS, Vercel, Netlify)
- Security best practices

**Enroll now** and stay ahead of the curve! Visit our [training programs](/courses/trainings) page for more details.`,
      coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
      authorId: admin.id,
      isPublished: true,
      publishedAt: new Date("2024-12-20"),
    },
  })

  const blog3 = await prisma.blog.create({
    data: {
      slug: "python-programming-beginners-guide",
      title: "Python Programming: A Beginner's Complete Guide",
      excerpt: "Starting your programming journey? Learn why Python is the perfect first language and how to get started with practical examples.",
      content: `# Python Programming: A Beginner's Complete Guide

Python has become one of the most popular programming languages in the world. But is it the right choice for beginners? **Absolutely!**

## Why Python for Beginners?

### 1. Simple and Readable Syntax

Python code is almost like reading English:

\`\`\`python
# Calculate the sum of numbers from 1 to 10
total = sum(range(1, 11))
print(f"The sum is: {total}")
\`\`\`

### 2. Versatile Applications

Python is used in:
- **Web Development** (Django, Flask)
- **Data Science** (Pandas, NumPy)
- **Machine Learning** (TensorFlow, Scikit-learn)
- **Automation** (Scripting, Testing)
- **Game Development** (Pygame)

### 3. Huge Community Support

With millions of developers worldwide, you'll always find help when you're stuck.

## Getting Started with Python

### Installation

1. Download Python from [python.org](https://python.org)
2. Install with default settings
3. Verify installation: \`python --version\`

### Your First Program

\`\`\`python
# Hello World in Python
print("Hello, World!")

# Variables and data types
name = "Student"
age = 20
is_enrolled = True

print(f"{name} is {age} years old")
\`\`\`

### Basic Concepts

**Lists** - Ordered collections:
\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])  # Output: apple
\`\`\`

**Loops** - Repeat actions:
\`\`\`python
for fruit in fruits:
    print(f"I like {fruit}")
\`\`\`

**Functions** - Reusable code blocks:
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

message = greet("Python Learner")
print(message)
\`\`\`

## Learning Path

1. **Week 1-2**: Basics (variables, data types, operators)
2. **Week 3-4**: Control flow (if/else, loops)
3. **Week 5-6**: Functions and modules
4. **Week 7-8**: Object-Oriented Programming
5. **Week 9-10**: File handling and projects

## Practice Projects

Start with simple projects:
- Calculator application
- To-do list manager
- Weather app using API
- Web scraper
- Simple game

## Join Our Python Course

At STEP Institute, our **Python Programming** course includes:

- ✅ Live interactive sessions
- ✅ Hands-on coding exercises
- ✅ Real-world projects
- ✅ Industry expert instructors
- ✅ Certificate upon completion

**Duration**: 6 weeks  
**Mode**: Weekday/Weekend batches available

Ready to start coding? [Enroll in our Python course](/courses/trainings) today!

---

*Have questions? Contact us at info@stepgndec.in or call +91 161 5064000*`,
      coverImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200",
      authorId: admin.id,
      isPublished: true,
      publishedAt: new Date("2025-01-05"),
    },
  })

  console.log("✅ Sample blog posts created:", blog1.title, blog2.title, blog3.title)

  console.log("🎉 Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
