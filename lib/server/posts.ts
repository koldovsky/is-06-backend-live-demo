import { headers } from 'next/headers'
import type { Post, PostListResponse } from '@/lib/types/post'

function getOrigin(): string {
  const h = process.env.BETTER_AUTH_URL
  if (h) return h.replace(/\/$/, '')
  return 'http://localhost:3000'
}

async function serverFetch<T>(path: string): Promise<T | null> {
  const hdrs = await headers()
  const cookie = hdrs.get('cookie') ?? ''
  const res = await fetch(`${getOrigin()}${path}`, {
    headers: { cookie },
    cache: 'no-store',
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`)
  return res.json() as Promise<T>
}

export async function getPostsList(params?: {
  limit?: number
  offset?: number
}): Promise<PostListResponse> {
  const search = new URLSearchParams()
  if (params?.limit != null) search.set('limit', String(params.limit))
  if (params?.offset != null) search.set('offset', String(params.offset))
  const qs = search.toString()
  const data = await serverFetch<PostListResponse>(
    `/api/v1/posts${qs ? `?${qs}` : ''}`,
  )
  return data ?? { items: [], limit: params?.limit ?? 20, offset: params?.offset ?? 0 }
}

export async function getPost(id: string): Promise<Post | null> {
  return serverFetch<Post>(`/api/v1/posts/${id}`)
}
