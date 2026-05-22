'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPostSchema } from '@/lib/validation/posts'
import { createPost, updatePost } from '@/lib/api/posts'
import type { Post } from '@/lib/types/post'

type PostFormProps =
  | { mode: 'create' }
  | { mode: 'edit'; post: Post }

export function PostForm(props: PostFormProps) {
  const router = useRouter()
  const initial =
    props.mode === 'edit'
      ? {
          title: props.post.title,
          body: props.post.body,
          published: props.post.published,
        }
      : { title: '', body: '', published: false }

  const [title, setTitle] = useState(initial.title)
  const [body, setBody] = useState(initial.body)
  const [published, setPublished] = useState(initial.published)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const payload = { title, body, published }
    const parsed = createPostSchema.safeParse(payload)
    if (!parsed.success) {
      setError('Please fix validation errors')
      return
    }

    setLoading(true)
    try {
      if (props.mode === 'create') {
        const post = await createPost(parsed.data)
        router.push(`/posts/${post.id}`)
      } else {
        await updatePost(props.post.id, parsed.data)
        router.push(`/posts/${props.post.id}`)
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Title
        <input
          type="text"
          required
          maxLength={200}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Body
        <textarea
          required
          rows={8}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Published
      </label>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-fit rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
      >
        {loading ? 'Saving…' : props.mode === 'create' ? 'Create post' : 'Save changes'}
      </button>
    </form>
  )
}
