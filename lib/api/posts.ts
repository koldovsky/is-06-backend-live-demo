import type { Post, PostListResponse } from '@/lib/types/post'

type ApiError = {
  error: string
  detail?: unknown
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json()
  if (!res.ok) {
    const err = data as ApiError
    const message =
      typeof err.detail === 'object' && err.detail !== null
        ? JSON.stringify(err.detail)
        : err.error ?? res.statusText
    throw new Error(message)
  }
  return data as T
}

export async function createPost(body: {
  title: string
  body: string
  published?: boolean
}): Promise<Post> {
  const res = await fetch('/api/v1/posts', {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  return parseJson<Post>(res)
}

export async function updatePost(
  id: string,
  body: { title?: string; body?: string; published?: boolean },
): Promise<Post> {
  const res = await fetch(`/api/v1/posts/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  return parseJson<Post>(res)
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`/api/v1/posts/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
}

export async function fetchPostsList(params?: {
  limit?: number
  offset?: number
}): Promise<PostListResponse> {
  const search = new URLSearchParams()
  if (params?.limit != null) search.set('limit', String(params.limit))
  if (params?.offset != null) search.set('offset', String(params.offset))
  const qs = search.toString()
  const res = await fetch(`/api/v1/posts${qs ? `?${qs}` : ''}`, {
    credentials: 'include',
    cache: 'no-store',
  })
  return parseJson<PostListResponse>(res)
}
