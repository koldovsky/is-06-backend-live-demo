'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deletePost } from '@/lib/api/posts'

export function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    if (!confirm('Delete this post permanently?')) return
    setError(null)
    setLoading(true)
    try {
      await deletePost(postId)
      router.push('/')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="text-sm text-red-600 hover:underline disabled:opacity-50 dark:text-red-400"
      >
        {loading ? 'Deleting…' : 'Delete post'}
      </button>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}
