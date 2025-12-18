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

  // Create sample course
  const course = await prisma.course.create({
    data: {
      title: "Diploma in Computer Application (DCA)",
      code: "DCA",
      duration: "1 Year",
      isActive: true,
    },
  })

  console.log("✅ Sample course created:", course.title)

  // Create sample faculty
  const faculty = await prisma.faculty.create({
    data: {
      name: "Dr. Sample Faculty",
      designation: "Professor",
      department: "Computer Science",
      email: "faculty@stepgndec.in",
      isActive: true,
    },
  })

  console.log("✅ Sample faculty created:", faculty.name)

  // Create sample notice
  const notice = await prisma.notice.create({
    data: {
      title: "Welcome to STEP Institute",
      content: "This is a sample notice for testing purposes.",
      category: "GENERAL",
      isPinned: true,
    },
  })

  console.log("✅ Sample notice created:", notice.title)

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
