import { PostList } from '@/components/post-list'
import { getPostsList } from '@/lib/server/posts'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ limit?: string; offset?: string }>
}) {
  const params = await searchParams
  const limit = params.limit ? Number(params.limit) : 20
  const offset = params.offset ? Number(params.offset) : 0
  const data = await getPostsList({ limit, offset })

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Posts</h1>
      <PostList data={data} />
    </main>
  )
}
