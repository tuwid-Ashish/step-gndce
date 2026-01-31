# Database Migration Required

## Changes Made to Schema

The Result model has been completely redesigned to support both PDF and detailed CSV results.

### Run Migration

```bash
npx prisma migrate dev --name redesign_results_system
npx prisma generate
```

### What Changed:

1. **Result Model**: Now acts as a container for results (one per exam/assessment)
   - Stores metadata (title, course, semester, type)
   - Can have PDF URL for simple results
   - Links to multiple ResultEntry records for detailed results

2. **ResultEntry Model** (NEW): Stores individual student results
   - Roll number, student name, grades
   - Subject-wise data in JSONB format
   - Linked to parent Result

3. **ResultType Enum** (NEW): PDF or DETAILED

### Next Steps:

1. Run the migration command above
2. File upload implementation needed:
   - Integrate Cloudinary or AWS S3 for PDF storage
   - Update `uploadResultPdf` function in `app/actions/results.ts`
   - Replace placeholder URL with actual upload logic

3. Optional enhancements:
   - Add result card design for detailed results
   - Email notifications when results are published
   - Bulk delete/edit capabilities
