import { post } from '@/lib/db/schema'
import { eq, or, type SQL } from 'drizzle-orm'

type PostRow = typeof post.$inferSelect

export type PostSession = {
  user: {
    id: string
    role?: string | null
  }
} | null

export function canReadPost(row: PostRow, session: PostSession): boolean {
  if (!session) return row.published
  if (session.user.role === 'admin') return true
  if (row.authorId === session.user.id) return true
  return row.published
}

export function listPostsWhere(session: PostSession): SQL | undefined {
  if (!session) return eq(post.published, true)
  if (session.user.role === 'admin') return undefined
  return or(eq(post.published, true), eq(post.authorId, session.user.id))
}

export function assertCanUpdate(row: PostRow, session: PostSession): void {
  if (!session) throw new Response('Unauthorized', { status: 401 })
  if (session.user.role === 'admin') return
  if (row.authorId === session.user.id) return
  throw new Response('Forbidden', { status: 403 })
}

export function canUpdatePost(row: PostRow, session: PostSession): boolean {
  if (!session) return false
  if (session.user.role === 'admin') return true
  return row.authorId === session.user.id
}
