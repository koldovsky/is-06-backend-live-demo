'use client'

import Link from 'next/link'
import { useSession } from '@/lib/auth-client'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return <p className="text-zinc-600 dark:text-zinc-400">Loading…</p>
  }

  if (!session) {
    return (
      <p className="text-zinc-600 dark:text-zinc-400">
        You must{' '}
        <Link href="/sign-in" className="font-medium text-zinc-900 dark:text-zinc-100">
          sign in
        </Link>{' '}
        to continue.
      </p>
    )
  }

  return <>{children}</>
}
