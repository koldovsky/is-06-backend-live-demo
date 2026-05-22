# is-06-backend-live-demo

[![CI](https://github.com/koldovsky/is-06-backend-live-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/koldovsky/is-06-backend-live-demo/actions/workflows/ci.yml)

Versioned REST API for Posts (Next.js 16, Drizzle, Better Auth, Neon Postgres).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment variables

Required by [`lib/env.ts`](lib/env.ts):

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon Postgres connection string |
| `BETTER_AUTH_SECRET` | Secret for Better Auth sessions |
| `BETTER_AUTH_URL` | Public app URL (e.g. `http://localhost:3000` locally) |
| `NEXT_PUBLIC_APP_URL` | Same as `BETTER_AUTH_URL` for the auth client (browser) |

- **Local:** copy values into `.env.local` (gitignored).
- **CI:** placeholder values are set in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).
- **Production / Preview:** set the same variables in the [Vercel project settings](https://vercel.com).

## CI (GitHub Actions)

On every push and pull request to `master`, the [`ci`](.github/workflows/ci.yml) workflow runs:

**Quality gate (`ci` job):**

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run test`
5. `npm run build`

**Deploy (after `ci` passes):** `deploy-preview` on PRs, `deploy-production` on push to `master` — see [CD](#cd-vercel-via-github-actions) below.

Run the same checks locally:

```bash
export DATABASE_URL=postgresql://ci:ci@localhost:5432/ci
export BETTER_AUTH_SECRET=ci-better-auth-secret-min-32-chars-long
export BETTER_AUTH_URL=https://ci.example.com
npm ci && npm run lint && npm run typecheck && npm run test && npm run build
```

Optional: in GitHub **Settings → Branches**, require the `ci` check before merging to `master`.

## CD (Vercel)

**Primary:** [Vercel Git integration](https://vercel.com/docs/git) deploys on every push/PR to `master` (connected to [github.com/koldovsky/is-06-backend-live-demo](https://github.com/koldovsky/is-06-backend-live-demo)).

**Optional (GitHub Actions):** After `ci` passes, `deploy-preview` / `deploy-production` run when `VERCEL_TOKEN` is set (classic token from [vercel.com/account/tokens](https://vercel.com/account/tokens)):

```bash
gh secret set VERCEL_TOKEN --repo koldovsky/is-06-backend-live-demo
```

| Event | Deploy job | Target |
|-------|------------|--------|
| Pull request to `master` | `deploy-preview` | Preview URL |
| Push to `master` | `deploy-production` | Production |

Flow: `vercel pull` → `vercel build` → `vercel deploy --prebuilt` (see [`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

### Vercel environment variables

In the [Vercel project settings](https://vercel.com), set for **Production** and **Preview**:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL` (use the deployment URL for each environment)

`vercel pull` syncs project settings; `vercel build` injects env from Vercel (secrets are not written to GitHub). Encrypted values in `.vercel/.env.*.local` are placeholders only — do not copy them to `.env.local`.

**Preview:** add `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` to the Preview environment in Vercel (Production already has them). After connecting a Git repo, you can scope Preview vars per branch.

### Test deploy locally

```bash
npx vercel@latest pull --yes --environment=preview
npx vercel@latest build
npx vercel@latest deploy --prebuilt
```

Use `--prod` on `build` and `deploy` for a production deploy.

Database migrations (`npm run db:migrate`) are run manually or via your own process — not in CI yet.
