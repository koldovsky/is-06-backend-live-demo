import { describe, expect, it } from 'vitest'
import {
  createPostSchema,
  listPostsQuerySchema,
  updatePostSchema,
} from '@/lib/validation/posts'

describe('createPostSchema', () => {
  it('accepts valid input', () => {
    const result = createPostSchema.safeParse({
      title: 'Hello',
      body: 'World',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.published).toBe(false)
    }
  })

  it('rejects empty title', () => {
    const result = createPostSchema.safeParse({ title: '', body: 'x' })
    expect(result.success).toBe(false)
  })
})

describe('listPostsQuerySchema', () => {
  it('coerces query strings and applies defaults', () => {
    const result = listPostsQuerySchema.safeParse({ limit: '10', offset: '5' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({ limit: 10, offset: 5 })
    }
  })

  it('uses defaults when params omitted', () => {
    const result = listPostsQuerySchema.safeParse({})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({ limit: 20, offset: 0 })
    }
  })
})

describe('updatePostSchema', () => {
  it('accepts partial updates', () => {
    const result = updatePostSchema.safeParse({ title: 'Updated' })
    expect(result.success).toBe(true)
  })

  it('rejects empty object', () => {
    const result = updatePostSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})
