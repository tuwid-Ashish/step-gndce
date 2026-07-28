import { PrismaClient, ApplicationType, ApplicationStatus } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function createTestUsers() {
  console.log("🚀 Generating test users and applications...")

  const hashedPassword = await bcrypt.hash("Password123!", 10)

  // 1. Create Test Admin / Staff Users
  const user1 = await prisma.user.upsert({
    where: { email: "academic.staff@stepgndec.in" },
    update: {},
    create: {
      email: "academic.staff@stepgndec.in",
      passwordHash: hashedPassword,
      name: "Amanpreet Kaur (Academic Staff)",
      role: "ACADEMIC_STAFF",
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: "editor.user@stepgndec.in" },
    update: {},
    create: {
      email: "editor.user@stepgndec.in",
      passwordHash: hashedPassword,
      name: "Rohan Verma (Content Editor)",
      role: "CONTENT_EDITOR",
    },
  })

  console.log("✅ Created 2 User Accounts:")
  console.log(`   1. Email: ${user1.email} | Password: Password123! | Role: ${user1.role}`)
  console.log(`   2. Email: ${user2.email} | Password: Password123! | Role: ${user2.role}`)

  // 2. Create 2 Test Application Submissions
  const app1 = await prisma.application.create({
    data: {
      firstName: "Amanpreet",
      lastName: "Singh",
      email: "amanpreet.singh.test@example.com",
      phone: "+91 98123 45678",
      qualification: "bachelor",
      institution: "Guru Nanak Dev Engineering College",
      programType: ApplicationType.TRAINING,
      specificProgram: "fullstack",
      experience: "Built a basic React portfolio project and completed 100 days of web dev code challenge.",
      motivation: "I want to gain professional full-stack development experience and secure a campus placement in a top software company.",
      status: ApplicationStatus.PENDING,
    },
  })

  const app2 = await prisma.application.create({
    data: {
      firstName: "Neha",
      lastName: "Sharma",
      email: "neha.sharma.test@example.com",
      phone: "+91 98765 12345",
      qualification: "master",
      institution: "Punjab Technical University",
      programType: ApplicationType.INCUBATION,
      specificProgram: "pre_incubation",
      experience: "Developed an IoT-based smart agricultural monitoring prototype using ESP32 and Firebase.",
      motivation: "Looking for STEP Institute incubator guidance, seed funding support, and hardware lab infrastructure to commercialize our agritech startup.",
      status: ApplicationStatus.REVIEWED,
      adminNotes: "Promising IoT prototype. Scheduled for pitch deck review next Monday.",
    },
  })

  console.log("✅ Created 2 Test Application Submissions:")
  console.log(`   1. ${app1.firstName} ${app1.lastName} (${app1.email}) - Program: ${app1.programType}`)
  console.log(`   2. ${app2.firstName} ${app2.lastName} (${app2.email}) - Program: ${app2.programType}`)
}

createTestUsers()
  .catch((e) => {
    console.error("❌ Failed to generate test users:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
