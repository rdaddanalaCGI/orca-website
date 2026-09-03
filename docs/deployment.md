# Deployment

## Local development

```bash
docker compose up -d
pnpm dev
```

- Postgres runs on host port `5434` (mapped from container port `5432`).
- The site runs on `http://localhost:3005`.

## Shared testing (Vercel + Supabase)

1. **Create a Supabase project** and copy the pooled connection string.
2. **Set Vercel environment variables.** The application reads `DATABASE_URL` and `PAYLOAD_SECRET` at runtime and during builds. Use `.env.vercel` as a local reference for the variable names; do not commit dotenv files to Git.
3. **Migrate the database** before the first deploy (or after schema changes): see [Migrations](#migrations) below.
4. **Deploy the repository to Vercel.**
   - The latest commit's author email must match a connected GitHub/Vercel account, or the deployment will be blocked. If needed, amend it before deploying:
     ```bash
     git config user.name "Your Name"
     git config user.email "your-github-email@example.com"
     git commit --amend --author="Your Name <your-github-email@example.com>" --no-edit
     ```
   - Run `vercel --prod --yes` from the repo root (the project is already linked to `oraworks.ai`).
5. **Verify staging is noindex.** Set `APP_ENV=staging` or `preview` for non-production deploys.

> Staging builds will warn about `sharp` not being installed and the `media` collection using local disk. These warnings are non-fatal for staging, but production requires S3-compatible media storage.

## Migrations

Migrations live in `src/migrations` and are applied with the Payload CLI.

For a fresh Supabase/Postgres database, run:

```bash
set -a && . .env.vercel
export DATABASE_URL="$POSTGRES_URL"
pnpm payload migrate
```

If the database has stale, untracked schema (for example, from a previous `pnpm dev` that pushed changes), you can reset the `public` schema and re-run. **This will delete all data in the public schema.**

```bash
set -a && . .env.vercel
export DATABASE_URL="$POSTGRES_URL"
psql "$DATABASE_URL" -c 'DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;'
pnpm payload migrate
```

Media can continue to use local uploads in preview/staging if no S3 bucket is
configured, but production must not use ephemeral local disk.

## Production (AWS/OpenNext)

1. Set `DATABASE_URL` to AWS Postgres.
2. Configure S3-compatible media storage with the variables below.
3. Deploy with OpenNext or SST.

### S3 media configuration

The target production media store is S3-compatible. Set these environment
variables:

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET`
- `S3_ENDPOINT` (required for S3-compatible services such as MinIO or Wasabi)

These variables should be picked up by the `@payloadcms/storage-s3` adapter
when it is wired into `src/payload.config.ts`. Local development should not
require S3 credentials; the current `Media` collection uses local `staticDir`
storage.

## Required environment variables

| Variable               | Dev                     | Staging          | Production      |
| ---------------------- | ----------------------- | ---------------- | --------------- |
| `APP_ENV`              | `local`                 | `staging`        | `production`    |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3005` | real staging URL | real public URL |
| `PAYLOAD_SECRET`       | any                     | required         | required        |
| `DATABASE_URL`         | optional (Docker)       | required         | required        |
| `AWS_*` / `S3_*`       | optional                | optional         | required        |

`src/lib/env.ts` throws on boot if `PAYLOAD_SECRET` or `DATABASE_URL` are
missing in `production`.

## Environment variables and indexability

`APP_ENV` controls search-engine indexability:

| `APP_ENV`    | `robots.txt`  | Page metadata       |
| ------------ | ------------- | ------------------- |
| `local`      | `Disallow: /` | `noindex, nofollow` |
| `preview`    | `Disallow: /` | `noindex, nofollow` |
| `staging`    | `Disallow: /` | `noindex, nofollow` |
| `production` | `Allow: /`    | indexable           |

Only ever set `APP_ENV=production` on the real public domain.

`NEXT_PUBLIC_SITE_URL` is **inlined at build time**. Each environment needs its own
build with the correct value, otherwise canonical URLs will point at the wrong host.

## Post-deploy verification

```bash
# Security headers present, and no X-Powered-By
curl -sI https://<host>/ | grep -iE 'content-security|x-content-type|referrer|permissions|strict-transport|x-powered'

# Correct indexability for the environment
curl -s https://<host>/robots.txt
curl -s https://<host>/ | grep -o '<meta name="robots" content="[^"]*"'

# Canonical points at the right host
curl -s https://<host>/about | grep -o '<link rel="canonical" href="[^"]*"'

# CMS routes are mounted and public reads are filtered
curl -s https://<host>/api/posts
curl -s https://<host>/api/press-releases
```

## Migration path

Moving from Supabase to AWS Postgres is a standard PostgreSQL migration; the
application only depends on `DATABASE_URL`. Media objects stored locally or in a
preview S3 bucket must be copied to the production S3 bucket and the database
upload references must remain consistent.
