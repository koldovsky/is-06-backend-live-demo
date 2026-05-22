import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export default function SignUpPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Sign up</h1>
      <AuthForm mode="sign-up" />
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        Already have an account?{' '}
        <Link href="/sign-in" className="font-medium text-zinc-900 dark:text-zinc-100">
          Sign in
        </Link>
      </p>
    </main>
  )
}
