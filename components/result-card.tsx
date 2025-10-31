import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UpdateTag } from "@/components/update-tag"
import { ResultEntry } from "@/types/result"

interface ResultCardProps {
  result: ResultEntry
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">
              Roll No: {result.rollNo}
            </CardTitle>
            <CardDescription>
              Exam: {result.examCode}
              {result.student && ` • ${result.student}`}
            </CardDescription>
          </div>
          <UpdateTag variant={result.pass ? "success" : "destructive"}>
            {result.pass ? "PASS" : "FAIL"}
          </UpdateTag>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Subject-wise marks table */}
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Subject</th>
                <th className="px-4 py-2 text-right font-medium">Marks</th>
                {result.subjects[0]?.maxMarks && (
                  <th className="px-4 py-2 text-right font-medium">Max</th>
                )}
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((subject, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{subject.name}</td>
                  <td className="px-4 py-2 text-right font-mono">
                    {subject.marks}
                  </td>
                  {subject.maxMarks && (
                    <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                      {subject.maxMarks}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 bg-muted/50">
              <tr>
                <td className="px-4 py-2 font-medium">Total</td>
                <td className="px-4 py-2 text-right font-mono font-bold">
                  {result.total}
                </td>
                {result.maxTotal && (
                  <td className="px-4 py-2 text-right font-mono font-medium">
                    {result.maxTotal}
                  </td>
                )}
              </tr>
            </tfoot>
          </table>
        </div>
        
        {/* Additional info */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {result.percentage && (
            <span>Percentage: {result.percentage.toFixed(1)}%</span>
          )}
          {result.grade && (
            <span>Grade: {result.grade}</span>
          )}
          {result.rank && (
            <span>Rank: {result.rank}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}