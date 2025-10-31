export interface Subject {
  name: string
  marks: number
  maxMarks?: number
}

export interface ResultEntry {
  examCode: string
  rollNo: string
  student?: string
  subjects: Subject[]
  total: number
  maxTotal?: number
  pass: boolean
  rank?: number
  grade?: string
  percentage?: number
}