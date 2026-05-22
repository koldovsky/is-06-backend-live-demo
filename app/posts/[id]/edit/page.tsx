import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { PostForm } from '@/components/post-form'
import { auth } from '@/lib/auth'
import { canUpdatePost } from '@/lib/posts/access'
import { getPost } from '@/lib/server/posts'
import { headers } from 'next/headers'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) notFound()

  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/sign-in')

  const row = {
    ...post,
    createdAt: new Date(post.createdAt),
  }
  if (!canUpdatePost(row, session)) notFound()

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-8">
      <p className="mb-4 text-sm">
        <Link href={`/posts/${id}`} className="text-zinc-600 hover:underline dark:text-zinc-400">
          ← Back to post
        </Link>
      </p>
      <h1 className="mb-6 text-2xl font-semibold">Edit post</h1>
      <PostForm mode="edit" post={post} />
    </main>
  )
}
