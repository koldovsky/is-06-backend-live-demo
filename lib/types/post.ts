export type Post = {
  id: string
  authorId: string
  title: string
  body: string
  published: boolean
  createdAt: string
}

export type PostListResponse = {
  items: Post[]
  limit: number
  offset: number
}
