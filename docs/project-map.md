# Project Map

What's in this repo and where to find it. For deep dives on a specific area,
follow the links to the topic-specific doc.

## Stack

Next.js 16 (App Router) + Payload CMS (embedded) + PostgreSQL. See
[architecture.md](architecture.md) for the high-level diagram.

## Routes (`src/app/`)

| Path                            | What it is                                                  |
| -------------------------------- | ------------------------------------------------------------ |
| `(marketing)/`                   | The public marketing site (own `layout.tsx`, own font/CSS)  |
| `(marketing)/page.tsx`           | Homepage                                                     |
| `(marketing)/solutions/`         | Vertical solution pages (logistics, insurance, CRO, credit unions, architecture/engineering) — content driven by `src/lib/solutions/` |
| `(marketing)/industries/`        | Industry pages (architecture/engineering, life sciences/biotech) |
| `(marketing)/ai-applications/`   | Use-case pages (bids & proposals, HR, insurance, logistics, financial services, operations) |
| `(marketing)/agentic-automation-platform/` | Product platform page                               |
| `(marketing)/blog/`              | Blog index + post pages, backed by the Payload `posts` collection |
| `(marketing)/press/`             | Press release pages, backed by `press-releases`               |
| `(marketing)/about`, `careers`, `contact`, `faq`, `pricing`, `expert-column`, `privacy-policy`, `terms-of-service` | Standard marketing/legal pages |
| `(payload)/`                     | Payload admin + API mount — see [cms.md](cms.md)               |
| `ai-agent-handbook/`, `enterprise-ai-safety-handbook/` | Long-form gated handbook content — see [gated-content.md](gated-content.md) |
| `api/downloads/[resourceId]/`    | Gated-resource download endpoint                              |
| `_actions/`                      | Server actions (`submit-form.ts`, `unlock-gate.ts`)            |
| `sitemap.ts`, `robots.ts`        | Generated from `src/lib/routes.ts` + CMS entries                |

## Components (`src/components/`)

| Folder        | What's in it                                                          |
| -------------- | ----------------------------------------------------------------------- |
| `elements/`    | Small reusable primitives (button, heading, link, container, section) |
| `sections/`    | Larger page sections (heroes, features, FAQs, CTAs, footers) — 40+ variants used to assemble marketing pages |
| `site/`        | Site-wide chrome: `site-navbar.tsx`, `site-footer.tsx`                 |
| `navigation/`  | Navbar dropdown menus (agentic applications, resources)                |
| `solutions/`   | Building blocks for `/solutions/*` vertical pages                      |
| `forms/`       | Contact form + shared field wrapper                                    |
| `gated/`       | Lead-gate UI (reveal, gate form, download button, unlock script)       |
| `handbook/`    | Handbook-specific UI (sidebar toggle)                                  |
| `admin/`       | Custom Payload admin components (`Logo.tsx`, `Icon.tsx`) — referenced from `admin.components.graphics` in `src/payload.config.ts` |
| `theme/`       | Dark/light theme script + toggle                                       |
| `seo/`         | `json-ld.tsx` structured-data component                                |
| `icons/`       | Icon components                                                        |

## Shared logic (`src/lib/`)

| File/folder            | Purpose                                                        |
| ----------------------- | ---------------------------------------------------------------- |
| `env.ts`                | Zod-validated environment variables, fails fast in production   |
| `payload.ts`            | Public CMS query helpers (`getLatestPosts`, `getPostBySlug`, etc.) — see [cms.md](cms.md) |
| `routes.ts`             | Canonical route list, used by the sitemap                       |
| `seo.ts`                | `createMetadata()` — use on every public page                    |
| `redirects.ts`          | Legacy URL redirects                                             |
| `security-headers.ts`   | CSP and other security headers                                  |
| `rate-limit.ts`         | IP-based rate limiting for form submissions                     |
| `analytics.ts`          | GA4/GTM helpers                                                  |
| `unlock-cookie.ts`      | Cookie-based gated-content unlock                                |
| `gated-resources.ts`    | Registry of gated downloads                                      |
| `schemas.ts`            | Shared Zod schemas                                               |
| `forms/`                | Server-side form submission + lead-gate submission logic         |
| `solutions/`            | Per-vertical content data for `/solutions/*` pages, typed via `types.ts` |

## CMS (`src/collections/`, `src/payload.config.ts`)

Posts, Categories, PressReleases, Authors, Media, FormSubmissions, Leads,
Users. Full details, access rules, and the draft/publish workflow are in
[cms.md](cms.md).

## Scripts (`scripts/`)

| Script                          | Purpose                                                    |
| --------------------------------- | ------------------------------------------------------------- |
| `seed-insights.mts`               | Seeds sample posts + categories into a local database. Builds its own minimal Payload config — must be kept in sync with the collection list in `src/payload.config.ts` (see 2026-09-02 note below) |
| `prepare-integration-db.mts`      | Prepares the `orcaworks_test` database for `pnpm test:integration` |
| `check-dependency-versions.mjs`   | Dependency version guard used in `pnpm check`                |
| `check-staged-secrets.mjs`        | Pre-commit secret scanner                                    |

## Docs (`docs/`)

| Doc                        | Covers                                            |
| ---------------------------- | ---------------------------------------------------- |
| `architecture.md`            | High-level system diagram                          |
| `project-map.md`             | This file                                           |
| `cms.md`                     | Payload setup, collections, access rules, forms    |
| `deployment.md`              | Local dev, Vercel/Supabase, production, env vars   |
| `gated-content.md`           | Lead-gate system for handbook content              |
| `seo.md`                     | Metadata, sitemap, structured data conventions     |
| `quality-gates.md`           | CI/pre-commit checks                               |
| `oatmeal-design-guide.md`    | The Tailwind Plus kit this site is built on         |

## Notable completed work / references

- **2026-09-02** — Local dev environment stood up on a machine where Docker
  Desktop can't run (no hardware virtualization for WSL2): native PostgreSQL
  17 used instead of the `docker-compose.yml` path in
  [deployment.md](deployment.md), role/database `orcaworks` created on the
  default port `5432`. Fixed a real bug in `seed-insights.mts` (it built a
  separate Payload config missing the `Leads` collection, which crashed the
  schema push). Fixed the Payload admin panel having no styling at all
  (missing `import '@payloadcms/next/css'` in
  `src/app/(payload)/layout.tsx`), and added Orcaworks branding (logo, favicon,
  title suffix, orange accent scoped to `.btn--style-primary` in
  `src/app/(payload)/admin.css`). Added `sass` and `tsx` as real
  devDependencies (previously resolved only by luck via transitive deps).
- Site typeface changed to Familjen Grotesk (`src/app/globals.css`,
  `src/app/(marketing)/layout.tsx`), replacing Instrument Serif + Inter.
