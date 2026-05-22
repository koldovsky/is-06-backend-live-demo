import { describe, it, expect } from 'vitest'
import { POST } from '@/app/api/v1/posts/route'

describe('POST /api/v1/posts', () => {
  it('returns 401 without a session', async () => {
    const res = await POST(
      new Request('http://x/api/v1/posts', {
        method: 'POST',
        body: JSON.stringify({ title: 't', body: 'b' }),
        headers: { 'content-type': 'application/json' },
      }),
    )
    expect(res.status).toBe(401)
  })
})
