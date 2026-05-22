import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { post } from '@/lib/db/schema'
import {
  assertCanUpdate,
  canReadPost,
} from '@/lib/posts/access'
import { requireRole, requireSession } from '@/lib/session'
import { updatePostSchema } from '@/lib/validation/posts'
import { badRequest, notFound } from '@/lib/errors'
import { eq } from 'drizzle-orm'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const [row] = await db.select().from(post).where(eq(post.id, id))
  if (!row) return notFound()

  const session = await auth.api.getSession({ headers: req.headers })
  if (!canReadPost(row, session)) return notFound()

  return Response.json(row)
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireSession(req)
    const { id } = await params
    const [row] = await db.select().from(post).where(eq(post.id, id))
    if (!row) return notFound()

    assertCanUpdate(row, session)

    const parsed = updatePostSchema.safeParse(await req.json())
    if (!parsed.success) return badRequest(parsed.error.format())

    const [updated] = await db
      .update(post)
      .set(parsed.data)
      .where(eq(post.id, id))
      .returning()

    return Response.json(updated)
  } catch (e) {
    if (e instanceof Response) return e
    throw e
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireRole(req, 'admin')
    const { id } = await params
    await db.delete(post).where(eq(post.id, id))
    return new Response(null, { status: 204 })
  } catch (e) {
    if (e instanceof Response) return e
    throw e
  }
}
