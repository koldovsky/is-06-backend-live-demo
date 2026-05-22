## Layers
1. `app/**/page.tsx`       ← UI (Server + Client Components)
2. `components/**`         ← shared UI
3. `app/api/**/route.ts`   ← HTTP boundary, Zod parsing, auth checks, response shape
4. `lib/db/schema.ts`      ← Drizzle source of truth
5. `lib/auth.ts`           ← Better Auth + requireSession()
6. `lib/posts/access.ts`   ← visibility and update authorization
7. `lib/validation/*.ts`   ← Zod schemas, reusable client + server
8. `lib/errors.ts`         ← typed helpers (unauthorized, forbidden, ...)

## Data model
- user(id, email, role)  ← Better Auth + `role: 'user'|'admin'`
- session(id, userId, expiresAt) ← Better Auth managed
- post(id, authorId, title, body, published, createdAt)

## Auth
- email/password (Better Auth)
- session cookies, 7-day expiry
- RBAC: 'user' (default) / 'admin' (can publish/delete any post)
