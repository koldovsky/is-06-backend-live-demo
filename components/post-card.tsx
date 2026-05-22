import Link from 'next/link'
import type { Post } from '@/lib/types/post'

function excerpt(body: string, max = 120) {
  return body.length <= max ? body : `${body.slice(0, max).trim()}…`
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="mb-2 flex items-center gap-2">
        <Link
          href={`/posts/${post.id}`}
          className="text-lg font-medium hover:underline"
        >
          {post.title}
        </Link>
        {!post.published && (
          <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            Draft
          </span>
        )}
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {excerpt(post.body)}
      </p>
    </article>
  )
}
