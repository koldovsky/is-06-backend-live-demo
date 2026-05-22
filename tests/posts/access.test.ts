import { describe, expect, it } from 'vitest'
import {
  canReadPost,
  canUpdatePost,
  listPostsWhere,
} from '@/lib/posts/access'

const draft = {
  id: '1',
  authorId: 'author-1',
  title: 'Draft',
  body: 'Secret',
  published: false,
  createdAt: new Date(),
}

const published = {
  ...draft,
  id: '2',
  published: true,
}

const otherDraft = {
  ...draft,
  id: '3',
  authorId: 'author-2',
}

describe('canReadPost', () => {
  it('allows anonymous users to read published posts only', () => {
    expect(canReadPost(published, null)).toBe(true)
    expect(canReadPost(draft, null)).toBe(false)
  })

  it('allows authors to read their own drafts', () => {
    const session = { user: { id: 'author-1', role: 'user' } }
    expect(canReadPost(draft, session)).toBe(true)
    expect(canReadPost(otherDraft, session)).toBe(false)
  })

  it('allows admins to read any post', () => {
    const session = { user: { id: 'admin-1', role: 'admin' } }
    expect(canReadPost(draft, session)).toBe(true)
    expect(canReadPost(otherDraft, session)).toBe(true)
  })
})

describe('canUpdatePost', () => {
  it('allows owner and admin to update', () => {
    expect(
      canUpdatePost(draft, { user: { id: 'author-1', role: 'user' } }),
    ).toBe(true)
    expect(
      canUpdatePost(draft, { user: { id: 'other', role: 'user' } }),
    ).toBe(false)
    expect(
      canUpdatePost(draft, { user: { id: 'admin', role: 'admin' } }),
    ).toBe(true)
  })
})

describe('listPostsWhere', () => {
  it('returns filter for anonymous and regular users', () => {
    expect(listPostsWhere(null)).toBeDefined()
    expect(
      listPostsWhere({ user: { id: 'u1', role: 'user' } }),
    ).toBeDefined()
  })

  it('returns undefined for admin (no filter)', () => {
    expect(
      listPostsWhere({ user: { id: 'admin', role: 'admin' } }),
    ).toBeUndefined()
  })
})
