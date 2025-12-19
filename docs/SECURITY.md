# Security Guidelines for STEP GNDEC Application

## Current Security Status

### ✅ Implemented Security Measures
1. **Authentication**: NextAuth.js with JWT sessions and bcrypt password hashing
2. **Authorization**: Role-based access control (SUPER_ADMIN, ADMIN, CONTENT_EDITOR)
3. **Middleware**: Cookie-based session validation for /admin routes
4. **SQL Injection Protection**: Prisma ORM with parameterized queries
5. **Server Actions**: Protected with auth checks and "use server" directive
6. **Security Headers**: Added via next.config.ts

### ⚠️ Security Improvements Needed

#### HIGH PRIORITY
1. **Input Sanitization for XSS**
   - Install: `npm install dompurify isomorphic-dompurify`
   - Sanitize all user-generated HTML content (blog posts, descriptions)
   - Use in components: 
   ```tsx
   import DOMPurify from 'isomorphic-dompurify';
   const clean = DOMPurify.sanitize(dirtyHTML);
   ```

2. **Rate Limiting**
   - Install: `npm install @upstash/ratelimit @upstash/redis`
   - Add to login route and public API endpoints
   - Prevent brute force attacks

3. **Password Policy**
   - Add Zod validation in auth.ts:
   ```typescript
   password: z.string()
     .min(8, "Password must be at least 8 characters")
     .regex(/[A-Z]/, "Password must contain uppercase")
     .regex(/[a-z]/, "Password must contain lowercase")
     .regex(/[0-9]/, "Password must contain number")
   ```

4. **CSRF Protection**
   - Already partially covered by NextAuth
   - Verify all POST endpoints use proper auth

5. **Environment Variables**
   - Ensure NEXTAUTH_SECRET is strong (32+ characters)
   - Never commit .env file
   - Use different secrets for dev/staging/prod

#### MEDIUM PRIORITY
6. **Content Security Policy (CSP)**
   - Add to next.config.ts headers for iframe restrictions

7. **Audit Logging**
   - Log all admin actions (create, update, delete)
   - Store IP addresses and timestamps
   - Add to Prisma schema:
   ```prisma
   model AuditLog {
     id        String   @id @default(cuid())
     userId    String
     action    String
     resource  String
     ipAddress String?
     createdAt DateTime @default(now())
     user      User     @relation(fields: [userId], references: [id])
   }
   ```

8. **Session Management**
   - Add session timeout (current: indefinite)
   - Implement "remember me" feature securely
   - Add session revocation capability

9. **File Upload Security** (if implementing)
   - Validate file types and sizes
   - Scan for malware
   - Store outside web root
   - Use signed URLs for access

10. **API Endpoint Protection**
    - Create reusable auth middleware for all API routes
    - Example:
    ```typescript
    // lib/api-auth.ts
    export async function requireAuth(request: Request) {
      const session = await auth();
      if (!session) {
        throw new Error('Unauthorized');
      }
      return session;
    }
    ```

#### LOW PRIORITY
11. **Error Handling**
    - Never expose stack traces in production
    - Use generic error messages for users
    - Log detailed errors server-side

12. **Dependency Scanning**
    - Run: `npm audit`
    - Setup: Dependabot or Snyk
    - Update dependencies regularly

13. **HTTPS Enforcement**
    - Configure in production environment
    - Redirect HTTP to HTTPS

## Security Checklist Before Production

- [ ] Change all default credentials
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Enable HTTPS in production
- [ ] Configure production database with SSL
- [ ] Set up backup strategy
- [ ] Configure CORS properly
- [ ] Test all authentication flows
- [ ] Test all authorization rules
- [ ] Enable security headers
- [ ] Set up monitoring and alerting
- [ ] Document security procedures
- [ ] Train admins on security best practices
- [ ] Plan incident response procedures
- [ ] Regular security audits

## Database Security

Current Prisma setup is secure, but ensure:
- Database uses SSL/TLS connection
- Database credentials are rotated regularly
- Database backups are encrypted
- Use connection pooling (already configured with Neon)
- Principle of least privilege for database user

## Monitoring Recommendations

1. Set up logging service (e.g., Sentry, LogRocket)
2. Monitor failed login attempts
3. Track API response times
4. Alert on unusual activity patterns
5. Regular security audits (monthly)

## References
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Next.js Security: https://nextjs.org/docs/app/building-your-application/security
- NextAuth.js Security: https://next-auth.js.org/security
