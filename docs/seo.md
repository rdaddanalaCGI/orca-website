# SEO

## Page metadata

Use `createMetadata()` from `src/lib/seo.ts` on every public page.

```ts
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Page title',
  description: 'Page description',
  path: '/page',
})
```

`createMetadata` supports:

- `title` — page title, site name is appended automatically.
- `description` — falls back to the site default if omitted.
- `path` — the canonical path, used to build `rel="canonical"`.
- `ogImage` — absolute or site-relative Open Graph image path.
- `noindex` — force a page to be non-indexable.
- `type` — `'website'` (default) or `'article'` for CMS posts/press.
- `publishedTime` / `modifiedTime` — ISO timestamps for `article` Open Graph.

CMS detail pages (`/blog/[slug]`, `/press/[slug]`) use `generateMetadata` and pull from the `seoTitle`, `seoDescription`, `ogImage`, and `heroImage` fields. The canonical is always `/blog/{slug}` or `/press/{slug}`.

## Canonical URLs

`createMetadata` sets `metadataBase` from `NEXT_PUBLIC_SITE_URL` and `alternates.canonical` from the provided `path`. Every public page must pass an explicit `path` so `tests/seo.test.ts` and the sitemap stay correct.

## Sitemap

`src/app/sitemap.ts` returns:

1. All routes registered in `src/lib/routes.ts` (static routes).
2. Published CMS posts and press releases at `/blog/{slug}` and `/press/{slug}` (dynamic routes).

If `DATABASE_URL` is unavailable during build, the sitemap falls back to static routes only.

## Robots

`src/app/robots.ts` blocks everything except `APP_ENV=production`. Only set `APP_ENV=production` on the real public domain.

## Redirects

Edit `src/lib/redirects.ts` and add entries from `.local/urls/required-urls.csv`. `tests/url-completeness.test.ts` confirms every old URL either still exists or redirects to a real page.

## Structured data

Use the helpers in `src/lib/seo.ts`:

- `organizationJsonLd()` — on every page via `src/app/layout.tsx`.
- `websiteJsonLd()` — on every page via `src/app/layout.tsx`.
- `breadcrumbJsonLd(items)` — for pages with nested navigation.
- `articleJsonLd({ ... })` — for `/blog/[slug]` and `/press/[slug]` detail pages.

CMS `articleJsonLd` is generated server-side and rendered through the `JsonLd` component. Never interpolate unsanitised CMS content directly into a `<script>` tag.

## Internal links

Public links must point to existing routes or valid hash anchors. Do not leave `href="#"` placeholders. `tests/seo.test.ts` and the e2e link checks fail on missing pages and placeholder links.

## Launch readiness note

`/solutions/*` routes (including `/solutions`, `/solutions/insurance`, `/solutions/logistics-and-distribution`, `/solutions/credit-unions-specialty-lending`, `/solutions/clinical-research-organisations`, and `/solutions/architecture-construction-engineering`) are currently marked `noindex: true` while their content is being finalised. These pages will have their `noindex` flag removed and their final content published before the official website launch so they can be indexed.
