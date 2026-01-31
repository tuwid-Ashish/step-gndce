// @ts-nocheck - Schema will be updated after migration
"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Upload PDF result (for both diploma and training)
export async function uploadResultPdf(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    const title = formData.get("title") as string
    const courseId = formData.get("courseId") as string
    const courseType = formData.get("courseType") as "DIPLOMA" | "INDUSTRIAL_TRAINING"
    const semester = formData.get("semester") as string | null
    const pdfFile = formData.get("pdfFile") as File

    if (!title || !courseId || !courseType || !pdfFile) {
      return { error: "Missing required fields" }
    }

    // TODO: Upload PDF to cloud storage (Cloudinary, S3, etc.)
    // For now, we'll use a placeholder URL
    const pdfUrl = `/uploads/results/${pdfFile.name}` // Replace with actual upload logic

    const slug = generateSlug(title)

    // Create result record
    // @ts-ignore - Schema will be updated after migration
    const result = await prisma.result.create({
      data: {
        title,
        slug,
        courseId,
        courseType,
        semester: semester ? parseInt(semester) : undefined,
        resultType: "PDF",
        pdfUrl,
      },
    })

    // Automatically create a notice
    await prisma.notice.create({
      data: {
        title: `Result Published: ${title}`,
        slug: `result-${slug}`,
        content: `The results for ${title} have been published. Students can check their results on the results page.`,
        excerpt: `Results for ${title} are now available.`,
        category: "RESULT",
        isPinned: true,
      },
    })

    revalidatePath("/admin/results")
    revalidatePath("/results")
    revalidatePath("/notices")
    revalidatePath("/")

    return { success: true, result }
  } catch (error) {
    console.error("Error uploading PDF result:", error)
    return { error: "Failed to upload result" }
  }
}

// Upload CSV result (for diploma detailed results)
export async function uploadResultCsv(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    const title = formData.get("title") as string
    const courseId = formData.get("courseId") as string
    const courseType = formData.get("courseType") as "DIPLOMA" | "INDUSTRIAL_TRAINING"
    const semester = formData.get("semester") as string
    const csvFile = formData.get("csvFile") as File

    if (!title || !courseId || !courseType || !semester || !csvFile) {
      return { error: "Missing required fields" }
    }

    const slug = generateSlug(title)

    // Parse CSV file
    const csvText = await csvFile.text()
    const lines = csvText.split("\n").filter(line => line.trim())
    
    if (lines.length < 2) {
      return { error: "CSV file is empty or invalid" }
    }

    const headers = lines[0].split(",").map(h => h.trim())
    const entries = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map(v => v.trim())
      
      if (values.length < 2) continue

      const rollNumber = values[0]
      const studentName = values[1]

      // Extract subject data (everything between studentName and SGPA/CGPA)
      const subjects = []
      let idx = 2
      while (idx < values.length - 4) { // Assuming last 4 are: SGPA, CGPA, Grade, Status
        const subjectName = values[idx]
        const obtained = parseFloat(values[idx + 1]) || 0
        const max = parseFloat(values[idx + 2]) || 0
        
        subjects.push({
          name: subjectName,
          obtained,
          max
        })
        
        idx += 3
      }

      const sgpa = parseFloat(values[values.length - 4]) || null
      const cgpa = parseFloat(values[values.length - 3]) || null
      const grade = values[values.length - 2] || null
      const status = values[values.length - 1] || "PASS"

      const totalMarks = subjects.reduce((sum, s) => sum + s.obtained, 0)
      const maxMarks = subjects.reduce((sum, s) => sum + s.max, 0)
      const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0

      entries.push({
        rollNumber,
        studentName,
        grade,
        sgpa,
        cgpa,
        totalMarks,
        maxMarks,
        percentage,
        status,
        subjectData: subjects,
      })
    }

    if (entries.length === 0) {
      return { error: "No valid entries found in CSV" }
    }

    // Create result record
    // @ts-ignore - Schema will be updated after migration
    const result = await prisma.result.create({
      data: {
        title,
        slug,
        courseId,
        courseType,
        semester: parseInt(semester),
        resultType: "DETAILED",
        entries: {
          create: entries,
        },
      },
    })

    // Automatically create a notice
    await prisma.notice.create({
      data: {
        title: `Result Published: ${title}`,
        slug: `result-${slug}`,
        content: `The detailed results for ${title} have been published. Students can check their results by entering their roll number on the results page.`,
        excerpt: `Detailed results for ${title} are now available.`,
        category: "RESULT",
        isPinned: true,
      },
    })

    revalidatePath("/admin/results")
    revalidatePath("/results")
    revalidatePath("/notices")
    revalidatePath("/")

    return { success: true, result, count: entries.length }
  } catch (error) {
    console.error("Error uploading CSV result:", error)
    return { error: "Failed to process CSV file" }
  }
}

// Delete result
export async function deleteResult(resultId: string) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CONTENT_EDITOR") {
      return { error: "Unauthorized" }
    }

    await prisma.result.delete({
      where: { id: resultId },
    })

    revalidatePath("/admin/results")
    revalidatePath("/results")

    return { success: true }
  } catch (error) {
    console.error("Error deleting result:", error)
    return { error: "Failed to delete result" }
  }
}

// Get result by roll number
export async function getResultByRollNumber(rollNumber: string, resultId: string) {
  try {
    // @ts-ignore - Schema will be updated after migration
    const result = await prisma.result.findUnique({
      where: { id: resultId },
      include: {
        course: true,
        entries: {
          where: {
            rollNumber: rollNumber,
          },
        },
      },
    })

    if (!result) {
      return { error: "Result not found" }
    }

    // @ts-ignore - Schema will be updated after migration
    if (result.resultType === "PDF") {
      return { 
        success: true, 
        result: {
          type: "PDF",
          // @ts-ignore
          pdfUrl: result.pdfUrl,
          // @ts-ignore
          title: result.title,
          // @ts-ignore
          course: result.course,
        }
      }
    }

    // @ts-ignore
    if (result.entries.length === 0) {
      return { error: "No result found for this roll number" }
    }

    // @ts-ignore
    const entry = result.entries[0]

    return {
      success: true,
      result: {
        type: "DETAILED",
        // @ts-ignore
        title: result.title,
        // @ts-ignore
        course: result.course,
        // @ts-ignore
        semester: result.semester,
        ...entry,
      }
    }
  } catch (error) {
    console.error("Error fetching result:", error)
    return { error: "Failed to fetch result" }
  }
}
