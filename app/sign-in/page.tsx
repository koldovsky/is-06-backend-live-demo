import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export default function SignInPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Sign in</h1>
      <AuthForm mode="sign-in" />
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        No account?{' '}
        <Link href="/sign-up" className="font-medium text-zinc-900 dark:text-zinc-100">
          Sign up
        </Link>
      </p>
    </main>
  )
}
