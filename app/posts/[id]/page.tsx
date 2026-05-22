import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DeletePostButton } from '@/components/delete-post-button'
import { auth } from '@/lib/auth'
import { canReadPost, canUpdatePost } from '@/lib/posts/access'
import { getPost } from '@/lib/server/posts'
import { headers } from 'next/headers'

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) notFound()

  const session = await auth.api.getSession({ headers: await headers() })
  const row = {
    ...post,
    createdAt: new Date(post.createdAt),
  }
  if (!canReadPost(row, session)) notFound()

  const canEdit = canUpdatePost(row, session)
  const isAdmin = session?.user.role === 'admin'

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-8">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {!post.published && (
          <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            Draft
          </span>
        )}
        {canEdit && (
          <Link
            href={`/posts/${id}/edit`}
            className="text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100"
          >
            Edit
          </Link>
        )}
        {isAdmin && <DeletePostButton postId={id} />}
      </div>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">{post.title}</h1>
      <p className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
        {post.body}
      </p>
      <p className="mt-6 text-xs text-zinc-500">
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </main>
  )
}
