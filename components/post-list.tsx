import Link from 'next/link'
import { PostCard } from '@/components/post-card'
import type { PostListResponse } from '@/lib/types/post'

export function PostList({
  data,
  basePath = '/',
}: {
  data: PostListResponse
  basePath?: string
}) {
  const { items, limit, offset } = data
  const prevOffset = Math.max(0, offset - limit)
  const nextOffset = offset + limit
  const hasPrev = offset > 0
  const hasNext = items.length === limit

  if (items.length === 0) {
    return (
      <p className="text-zinc-600 dark:text-zinc-400">No posts yet.</p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {items.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex gap-4 text-sm">
        {hasPrev && (
          <Link
            href={`${basePath}?limit=${limit}&offset=${prevOffset}`}
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
          >
            ← Previous
          </Link>
        )}
        {hasNext && (
          <Link
            href={`${basePath}?limit=${limit}&offset=${nextOffset}`}
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  )
}
