import { Container } from "@/components/container"
import { ResultsClient } from "./results-client"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Check Results",
  description: "View your examination results"
}

export default async function ResultsPage() {
  // Temporarily return empty arrays until migration is run
  const diplomaResults: any[] = []
  const trainingResults: any[] = []

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Check Results</h1>
            <p className="text-xl text-muted-foreground">
              Select your program type and enter details to view your examination results
            </p>
          </div>

          <ResultsClient
            diplomaResults={diplomaResults}
            trainingResults={trainingResults}
          />
        </div>
      </Container>
    </div>
  )
}
