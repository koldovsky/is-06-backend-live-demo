# Product Requirements

## What
A full-stack Next.js app for **Posts**: a public feed, email/password auth, and post
management. Authenticated users create, list, update, and delete their own posts;
admins can publish, edit, and delete any post.

## Visibility
| Viewer | List & detail |
|--------|----------------|
| Anonymous | Published posts only |
| Signed-in user | Own posts (draft + published) and others' published posts |
| Admin | All posts |

Draft posts return **404** on detail for viewers who cannot read them.

## Frontend

| Route | Access | Purpose |
|-------|--------|---------|
| `/` | public | Paginated post feed (`limit` / `offset`, default 20) |
| `/posts/[id]` | public* | Post detail; *drafts 404 unless author or admin |
| `/posts/new` | session | Create post |
| `/posts/[id]/edit` | session + owner or admin | Edit title, body, published |
| `/sign-in`, `/sign-up` | public | Email/password (Better Auth) |

### UI
- **Header:** sign in / sign up / sign out; show email and role when signed in.
- **Feed:** title, excerpt, published badge; "New post" when signed in.
- **Detail:** full body; edit link for owner or admin; admin-only delete with confirm.
- **Forms:** validate with shared Zod schemas; show API `400` `detail` errors.

## API

| Method | Path | Auth | Body | Returns |
|--------|------|------|------|---------|
| GET | `/api/v1/posts` | optional | — | `{ items, limit, offset }` |
| POST | `/api/v1/posts` | session | `CreatePostBody` | `Post` |
| GET | `/api/v1/posts/:id` | optional | — | `Post` |
| PATCH | `/api/v1/posts/:id` | session + owner or admin | `UpdatePostBody` | `Post` |
| DELETE | `/api/v1/posts/:id` | session + admin | — | `204` |

### Bodies
- **CreatePostBody:** `title`, `body`, `published?` (default `false`)
- **UpdatePostBody:** at least one of `title?`, `body?`, `published?`

### Post shape
`id`, `authorId`, `title`, `body`, `published`, `createdAt`

## Constraints
- Zod validation on every input
- Auth inside every mutation
- Pagination on list (`limit` / `offset`, max 100)
- Browser fetches use `credentials: 'include'`
- Reuse validation schemas on client and server
