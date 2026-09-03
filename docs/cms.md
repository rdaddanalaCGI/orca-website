# CMS

Payload CMS is mounted inside the Next.js App Router and uses a PostgreSQL
adapter.

## Local development

Start Postgres and the dev server:

```bash
docker compose up -d
pnpm dev
```

- Postgres runs on host port `5434` (container port `5432`).
- The site runs on `http://localhost:3005`.
- The Payload admin UI is at `http://localhost:3005/admin`.

The first user can be created by visiting `/admin` and following the
"create-first-user" flow. Do not commit seed credentials.

## Mounted routes

The admin/API route group lives in `src/app/(payload)/`:

- `/admin` — Payload admin UI
- `/api/*` — REST API
- `/api/graphql` — GraphQL endpoint
- `/api/graphql-playground` — GraphQL playground

The Payload import map is at `src/app/(payload)/admin/importMap.js` and is
committed to source control. Run `pnpm payload generate:importmap` if it is ever
deleted or out of sync.

## Collections

| Collection       | Slug               | Purpose                                          |
| ---------------- | ------------------ | ------------------------------------------------ |
| Posts            | `posts`            | Blog posts with SEO fields                       |
| Press Releases   | `press-releases`   | Press releases with source and source URL fields |
| Authors          | `authors`          | Public byline model (name, role, bio, avatar)    |
| Media            | `media`            | Uploads with MIME allowlist and size limits      |
| Form Submissions | `form-submissions` | Persisted server-action form data                |
| Users            | `users`            | Payload admin users                              |

## Access rules

All collections declare explicit `access` rules in `src/collections/access.ts`:

- Public reads are allowed where it makes sense (published posts/press,
  authors, media).
- Public writes require an authenticated `req.user`.
- `form-submissions` are not publicly readable or writable through the API.
- The server action in `src/lib/forms/submit-form.ts` creates submissions with
  `overrideAccess: true` only after Zod validation, honeypot checks, IP
  extraction, and rate limiting.

## Draft / publish workflow

Posts and Press Releases have a `status` select: `draft` or `published`. Only
`published` items are returned by the public helpers in `src/lib/payload.ts`.
Public CMS pages and the sitemap are filtered by `status: { equals: 'published' }`.

## Public CMS queries

Use `src/lib/payload.ts` for server-side CMS queries. Public helpers include:

- `getLatestPosts(limit)`
- `getLatestPressReleases(limit)`
- `getPublishedPosts({ limit, page })`
- `getPublishedPressReleases({ limit, page })`
- `getPostBySlug(slug)`
- `getPressReleaseBySlug(slug)`
- `getSitemapCmsEntries()`

These helpers return an empty array or `null` when `DATABASE_URL` is not set,
so `next build` can still run without a database.

## Form submissions

Forms are validated with Zod in `src/lib/forms/submit-form.ts`. The thin server
action wrapper is in `src/app/_actions/submit-form.ts`.

Validation steps:

1. Submission type must be `contact`, `demo`, or `partner`.
2. Honeypot field must be empty.
3. Client IP is extracted for rate limiting.
4. Rate limiting: 5 attempts per IP per 60 seconds by default.
5. Zod schema validates names, emails, UTM values, and messages.
6. A valid submission is persisted via the Payload local API with
   `overrideAccess: true`.
7. Errors are logged server-side; the browser receives a generic message.

## Media

`src/collections/Media.ts` stores uploads locally in a `media/` directory during
development. Allowed MIME types are `image/jpeg`, `image/png`, `image/webp`,
`image/avif`, and `image/gif`. The file-size cap is 10 MB. Production media
storage should be moved to S3-compatible storage; see `docs/deployment.md`.

## Testing

DB-backed integration tests live in `tests/integration/` and run with:

```bash
pnpm test:integration
```

The `test:integration` script prepares the `orcaworks_test` database on the
local Postgres port (`5434`), pushes the Payload schema, and runs the integration
suite. The helper refuses to run when `APP_ENV=production` or when the database
host is not local.
