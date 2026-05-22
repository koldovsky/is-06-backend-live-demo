import { db } from '@/lib/db'
import { post } from '@/lib/db/schema'
import { requireRole } from '@/lib/session'
import { eq } from 'drizzle-orm'

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
