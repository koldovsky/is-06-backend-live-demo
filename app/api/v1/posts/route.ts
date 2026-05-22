import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { post } from '@/lib/db/schema'
import { listPostsWhere } from '@/lib/posts/access'
import { createPostSchema, listPostsQuerySchema } from '@/lib/validation/posts'
import { unauthorized, badRequest } from '@/lib/errors'
import { desc } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = listPostsQuerySchema.safeParse(Object.fromEntries(url.searchParams))
  if (!q.success) return badRequest(q.error.format())

  const session = await auth.api.getSession({ headers: req.headers })
  const visibility = listPostsWhere(session)

  const base = db.select().from(post).orderBy(desc(post.createdAt))
  const items = visibility
    ? await base.where(visibility).limit(q.data.limit).offset(q.data.offset)
    : await base.limit(q.data.limit).offset(q.data.offset)

  return Response.json({ items, ...q.data })
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) return unauthorized()

  const parsed = createPostSchema.safeParse(await req.json())
  if (!parsed.success) return badRequest(parsed.error.format())

  const [created] = await db
    .insert(post)
    .values({
      id: nanoid(),
      authorId: session.user.id,
      ...parsed.data,
    })
    .returning()

  return Response.json(created, { status: 201 })
}
