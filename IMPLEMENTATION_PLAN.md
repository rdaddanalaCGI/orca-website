# Orcaworks Website — Implementation Plan

This plan is the executable companion to `orcaworks-website-scaffold-prompt.md`. The final repository is a self-contained Next.js 16 marketing website and Payload CMS built inside `oraworks.ai/`.

## Sources of truth

- **Scaffold spec:** `../orcaworks-website-scaffold-prompt.md`
- **Oatmeal template:** `../oatmeal-olive-instrument/` (Tailwind Plus, 415 items: `components/elements/`, `components/sections/`, `pages/home-01..03`, etc.)
- **Tailwind Plus Marketing UI blocks:** `../marketing-v4/react/` (179 items: `elements/`, `feedback/`, `page-examples/`, `sections/`)
- **Tailwind Plus Application UI blocks:** `../application-ui-v4/react/` (364 items: `application-shells/`, `data-display/`, `forms/`, `navigation/`, etc.)
- **Target repo:** this directory (`/Users/ramsomaraju/Documents/workspace/charter/marketing/oraworks.ai/`)

## 1. Starting point

1. Copy the downloaded `oatmeal-olive-instrument/` source into this repo.
2. Keep Next.js 16, React 19, Tailwind CSS 4.3, and `@tailwindplus/elements@1.0.22`.
3. Preserve Oatmeal conventions:
   - CSS at `@/app/tailwind.css` (or `globals.css`) with `oklch(…)` olive palette.
   - `@/*` path alias resolving to `src/`.
   - `components/elements/`, `components/sections/`, `app/` layouts.
   - `Instrument Serif` display + `Inter` sans fonts.
4. Inspect `package.json` and `pnpm-lock.yaml`; do not re-pin versions already aligned with the prompt.

## 2. Dependency additions

Add to Oatmeal baseline (Appendix A of the prompt):

```bash
pnpm add \
  payload@3.88.0 \
  @payloadcms/next@3.88.0 \
  @payloadcms/db-postgres@3.88.0 \
  @payloadcms/richtext-lexical@3.88.0 \
  sharp@0.35.3 \
  zod@4.4.3

pnpm add -D --save-exact \
  eslint@10.9.0 \
  eslint-config-next@16.3.3 \
  prettier@3.9.6 \
  vitest@4.1.11 \
  @playwright/test@1.62.1 \
  husky@9.1.7 \
  lint-staged@17.3.0
```

Defer `@payloadcms/storage-s3` until the AWS production task.

## 3. Local reference sandbox

Create `.local/` at repo root and add to `.gitignore`:

```text
.local/
*.log
.env
.env.*
!.env.example
node_modules/
.next/
```

Suggested subfolders:

```text
.local/
├── wordpress/
├── search-console/
├── urls/
├── crawls/
├── references/
└── reports/
```

Do not commit WordPress XML, Search Console data, or screenshots.

## 4. Payload CMS configuration

Integrate Payload into `app/` as a single Next.js application.

### 4.1 Collections

- `Posts`
- `PressReleases`
- `Authors`
- `Media`
- `FormSubmissions`

### 4.2 Fields to support

**Posts / PressReleases:**

- `title` (text)
- `slug` (text, unique)
- `excerpt` (textarea)
- `heroImage` (upload → Media)
- `author` (relationship → Authors)
- `publishedDate` (date)
- `body` (rich text / lexical)
- `status` (draft / published)
- `seoTitle` (text)
- `seoDescription` (textarea)
- `ogImage` (upload → Media)

**Form Submissions:**

- `submissionType` (select: contact, demo, partner)
- `createdAt`
- `name`, `email`, `company`, `message`
- `sourcePage`
- `utmSource`, `utmMedium`, `utmCampaign`
- `status` (new, processing, completed, spam)

### 4.3 Database

Use `@payloadcms/db-postgres` with `DATABASE_URL`.

## 5. Database & environment

### 5.1 Local

Add `docker-compose.yml` for PostgreSQL:

```yaml
services:
  postgres:
    image: postgres:17-alpine
    environment:
      POSTGRES_USER: orcaworks
      POSTGRES_PASSWORD: orcaworks
      POSTGRES_DB: orcaworks
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

### 5.2 Environment variables

Create `.env.example`:

```text
APP_ENV=local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PAYLOAD_SECRET=change-me
DATABASE_URL=postgresql://orcaworks:orcaworks@localhost:5432/orcaworks
PAYLOAD_DATABASE_URI=${DATABASE_URL}
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET=
S3_ENDPOINT=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_SEARCH_CONSOLE=
```

### 5.3 Shared & production

- **Free testing:** Vercel + Supabase Free Postgres via `DATABASE_URL`.
- **Long-term production:** AWS/OpenNext + AWS Postgres + S3.
- No Supabase-specific client code in application logic.

## 6. Forms

Server-side flow:

```text
Browser → Server Action → Zod validation → Payload FormSubmissions
```

Include:

- Zod schemas for Contact, Demo, Partner forms
- Field length limits
- Honey pot field
- Simple rate-limit hook (IP + window)
- Spam integration point (`akismet` later if needed)
- No CAPTCHA by default

## 7. Pages & dynamic content

### 7.1 Marketing pages

Use Oatmeal page templates as starting points:

- `home-01.tsx` / `home-02.tsx` for homepage
- `about-01.tsx` for about
- `pricing-01.tsx` for pricing
- `404-01.tsx` for 404

Create `app/` route equivalents using Server Components.

### 7.2 Latest content helpers

Create server-only helpers (no client fetch):

- `getLatestPosts(limit = 3)`
- `getLatestPressReleases(limit = 3)`

Use on homepage with static + revalidation (`export const revalidate = 60`).

## 8. SEO & structured data

### 8.1 Global metadata

Create `lib/seo/metadata.ts` centralizing:

- site name
- base URL
- title template
- default description
- default OG image

### 8.2 Required outputs

- `app/sitemap.ts` (or `app/sitemap.xml/route.ts`)
- `app/robots.ts`
- `not-found.tsx`
- Canonical URLs on every indexable page
- `metadata` exports on route `layout.tsx` / `page.tsx`

### 8.3 JSON-LD helpers

Reusable structured data components for:

- `Organization`
- `WebSite`
- `BreadcrumbList`
- `Article`

### 8.4 Environment-driven noindex

```ts
const shouldIndex = APP_ENV === 'production'
```

Staging/preview return `robots: { index: false }`.

## 9. URL migration & redirect checks

### 9.1 Authoritative CSV

Document `.local/urls/required-urls.csv` format:

```csv
old_url,target_url
/old-insurance-page,/solutions/insurance
/solutions/insurance,/solutions/insurance
```

### 9.2 Next.js redirects

Maintain redirects in a single source: `next.config.js` `redirects` async function or `app/redirects.json` processed at build time.

### 9.3 URL completeness test

Vitest test in `tests/url-completeness.test.ts`:

- Load `required-urls.csv`
- For each `old_url`, check `target_url`:
  - If same as `old_url`: page must exist
  - Else: target must exist and redirect must resolve
- Fail on missing target, redirect loops, malformed rows

## 10. Performance & quality

Targets:

- Lighthouse Performance ≥ 90
- Accessibility ≥ 95
- SEO ≥ 95

Practices:

- Server Components by default
- `next/image` with explicit `width`/`height`
- Lazy below-the-fold images
- Font optimization
- Minimal third-party JS
- CSP headers behind configuration

## 11. Testing

### 11.1 Unit/integration

- `vitest` for helpers, validation, URL checks, redirect logic

### 11.2 E2E

- `playwright` for:
  - homepage load
  - navigation
  - forms
  - CMS article render
  - metadata in HTML
  - staging noindex

### 11.3 Package scripts

```json
{
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:e2e": "playwright test",
  "build": "next build",
  "check": "pnpm lint && pnpm typecheck && pnpm test && pnpm build"
}
```

## 12. CI

`.github/workflows/ci.yml`:

```yaml
name: CI
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build
```

## 13. Documentation

Create `docs/`:

- `docs/architecture.md`
- `docs/oatmeal-design-guide.md`
- `docs/cms.md`
- `docs/deployment.md`
- `docs/seo.md`

Create root `AGENTS.md` with enduring rules (Oatmeal first, Server Components, SEO, migration, deployment portability, security).

## 14. What NOT to build

Per the prompt, avoid:

- WordPress XML import scripts
- Search Console processing pipelines
- Automated page generators
- Complex redirect databases
- Internal CRM
- Supabase-specific application architecture
- Paid AWS infrastructure provisioning during scaffold

## 15. Phase plan

| Phase | Task                                                                       | Verification                                |
| ----- | -------------------------------------------------------------------------- | ------------------------------------------- |
| 1     | Bootstrap repo from Oatmeal; add dependencies; verify `pnpm dev` builds    | `pnpm build` passes                         |
| 2     | Docker Postgres + Payload config + CMS collections                         | Payload admin loads locally                 |
| 3     | Forms + server actions + Zod + FormSubmissions                             | Submit form, see entry in Payload admin     |
| 4     | Marketing pages from Oatmeal templates + latest-posts/latest-press helpers | Pages render, homepage shows latest content |
| 5     | SEO metadata, sitemap, robots, structured data, 404, noindex               | Lighthouse SEO check, `curl /sitemap.xml`   |
| 6     | Redirects + URL completeness test                                          | `pnpm test` passes                          |
| 7     | Vitest + Playwright + GitHub CI + `pnpm check`                             | `pnpm check` passes in CI                   |
| 8     | Docs + `AGENTS.md`                                                         | All docs present                            |
| 9     | Build verification against Docker Postgres                                 | `pnpm build` + manual smoke test            |
| 10    | (Deferred) AWS/OpenNext + S3 adapter + production Postgres                 | Documented in `docs/deployment.md`          |

## 16. Definition of Done

The scaffold is complete when `pnpm check` passes, Payload admin runs, all CMS collections exist, the site builds, and the repository is a clean, self-contained git project in `oraworks.ai/` with no real WordPress content automatically migrated.
