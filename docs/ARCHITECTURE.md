## Layers
1. `app/api/**/route.ts`   ← HTTP boundary, Zod parsing, auth checks, response shape
2. `lib/db/schema.ts`      ← Drizzle source of truth
3. `lib/auth.ts`           ← Better Auth + requireSession()
4. `lib/validation/*.ts`   ← Zod schemas, reusable client + server
5. `lib/errors.ts`         ← typed helpers (unauthorized, forbidden, ...)

## Data model
- user(id, email, role)  ← Better Auth + `role: 'user'|'admin'`
- session(id, userId, expiresAt) ← Better Auth managed
- post(id, authorId, title, body, published, createdAt)

## Auth
- email/password (Better Auth)
- session cookies, 7-day expiry
- RBAC: 'user' (default) / 'admin' (can publish/delete any post)
