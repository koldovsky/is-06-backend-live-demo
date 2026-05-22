'use client'

import Link from 'next/link'
import { useSession, signOut } from '@/lib/auth-client'

export function SiteHeader() {
  const { data: session, isPending } = useSession()

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Posts
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          {isPending ? (
            <span className="text-zinc-500">…</span>
          ) : session ? (
            <>
              <span className="hidden text-zinc-600 sm:inline dark:text-zinc-400">
                {session.user.email}
                {session.user.role === 'admin' && (
                  <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                    admin
                  </span>
                )}
              </span>
              <Link
                href="/posts/new"
                className="font-medium text-zinc-900 dark:text-zinc-100"
              >
                New post
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="font-medium text-zinc-900 dark:text-zinc-100"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
