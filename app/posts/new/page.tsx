import { AuthGuard } from '@/components/auth-guard'
import { PostForm } from '@/components/post-form'

export default function NewPostPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">New post</h1>
      <AuthGuard>
        <PostForm mode="create" />
      </AuthGuard>
    </main>
  )
}
