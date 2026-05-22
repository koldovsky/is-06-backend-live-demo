import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(50_000),
  published: z.boolean().default(false),
})

export const listPostsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
})

export const updatePostSchema = z
  .object({
    title: z.string().min(1).max(200).optional(),
    body: z.string().min(1).max(50_000).optional(),
    published: z.boolean().optional(),
  })
  .refine((d) => Object.keys(d).length > 0, {
    message: 'At least one field required',
  })
