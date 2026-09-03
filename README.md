# Orcaworks

A Next.js 16 marketing website with an embedded Payload CMS, built on the Tailwind Plus Oatmeal template.

## Quick start

```bash
# 1. Start local PostgreSQL
docker compose up -d

# 2. Copy env
cp .env.example .env

# 3. Install dependencies
pnpm install

# 4. Run Next.js
pnpm dev
```

Open `http://localhost:3000`. The Payload CMS is mounted alongside the marketing site:

- Admin UI: `/admin`
- REST API: `/api/*`
- GraphQL API: `/api/graphql`
- GraphQL Playground: `/api/graphql-playground`

The admin route depends on `src/app/(payload)/admin/importMap.js`, which is committed to source control.

## Environment

See `.env.example` for required variables.

## Commands

- `pnpm dev` — local development
- `pnpm build` — production build
- `pnpm format` — apply Prettier
- `pnpm lint` — ESLint (zero warnings tolerated)
- `pnpm typecheck` — TypeScript strict check
- `pnpm test` — Vitest unit/integration suite
- `pnpm test:e2e` — Playwright browser suite
- `pnpm check` — full pre-merge gate

## Quality gates

Git hooks are installed automatically by `pnpm install`:

- **pre-commit** — ESLint + Prettier on staged files
- **pre-push** — typecheck + unit tests

CI additionally runs the production build, Playwright, a dependency audit, and a
dependency-version policy check.

See `docs/quality-gates.md`. Do not commit with `--no-verify`.

## Structure

- `src/app/` — marketing pages
- `src/collections/` — Payload CMS collections
- `src/components/` — Oatmeal components
- `src/lib/` — helpers, schemas, SEO, payload client
- `tests/` — Vitest suites (SEO, security, forms, URL completeness)
- `e2e/` — Playwright browser tests
- `docs/` — project documentation
- `.local/` — private migration/reference (gitignored)

## Adding a page

1. Create `src/app/<route>/page.tsx`.
2. Export `metadata` via `createMetadata({ title, description, path })`.
3. Register the route in `src/lib/routes.ts`.
4. Run `pnpm check`.

The test suite fails if metadata or route registration is missing.

## Deployment

The site is currently deployed on **Vercel** with **Supabase** Postgres.

### 1. Create accounts

- **Vercel:** Sign up at [vercel.com](https://vercel.com) and install the Vercel CLI:

  ```bash
  npm install -g vercel
  vercel login
  ```

- **Supabase:** Create a free project at [supabase.com](https://supabase.com). Keep the database password.

### 2. Set up the Supabase database

1. In Supabase, open **Project Settings > Database**.
2. Copy the **Connection string** from the **Transaction pooler** section. It looks like:

   ```text
   postgresql://postgres.<project-ref>:[YOUR-PASSWORD]@aws-0-<region>.pooler.supabase.com:6543/postgres
   ```

3. Append `?sslmode=no-verify` to the connection string. The Supabase transaction pooler uses a self-signed certificate, so `require`/`verify-full` will fail when the app connects from Vercel:

   ```text
   postgresql://postgres.<project-ref>:[YOUR-PASSWORD]@aws-0-<region>.pooler.supabase.com:6543/postgres?sslmode=no-verify
   ```

This connection string is used for `DATABASE_URL`.

### 3. Configure Vercel environment variables

Inside the project directory, set the required environment variables:

```bash
vercel link          # link to your Vercel project (or vercel to create a new one)
vercel env add DATABASE_URL
vercel env add PAYLOAD_SECRET
vercel env add APP_ENV
vercel env add NEXT_PUBLIC_SITE_URL
```

| Variable               | Example                                                                                                     | Notes                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `DATABASE_URL`         | `postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?sslmode=no-verify` | Supabase transaction-pooler connection.                                          |
| `PAYLOAD_SECRET`       | `<long-random-string>`                                                                                      | Any non-empty string for staging/preview; should be a real secret in production. |
| `APP_ENV`              | `production`                                                                                                | `local`, `preview`, `staging`, or `production`. Only `production` is indexable.  |
| `NEXT_PUBLIC_SITE_URL` | `https://oraworks.ai`                                                                                       | The real public domain, or the Vercel preview URL for preview branches.          |

For local development, put the same variables in a `.env` file (it is gitignored).

### 4. Run Payload migrations

`package.json` sets `"type": "module"` so the Payload CLI can load the ESM config on modern Node versions. With `DATABASE_URL` pointing at the empty Supabase database, create and apply the initial schema:

```bash
npx payload migrate:create --force-accept-warning
npx payload migrate
```

This creates `src/migrations/` files and the database tables (`posts`, `press_releases`, `media`, etc.).

### 5. Deploy

Deploy the current source to production:

```bash
vercel --prod
```

Alternatively, connect the GitHub repository in the Vercel dashboard so every push to `main` is deployed automatically:

```bash
vercel git connect
```

### 6. Current limitations

- The `media` collection has no Vercel storage adapter yet, so file uploads will not persist on Vercel until S3 or Vercel Blob is wired into `src/payload.config.ts`.
- The app has been verified against the Supabase transaction pooler with `sslmode=no-verify`. If you switch to a direct Supabase connection or a different Postgres provider, the `sslmode` value will need to match that provider's TLS setup.
