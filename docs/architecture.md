# Architecture

A single Next.js 16 App Router application with an embedded Payload CMS.

```
Next.js 16 + Oatmeal
├── Marketing website (App Router, static pages)
├── Payload CMS (src/payload.config.ts + src/collections/)
├── Forms (Server Actions + Zod)
└── SEO (sitemap, robots, metadata helpers)

Database: PostgreSQL via DATABASE_URL
Media: Payload upload with static storage (S3 in production)
```

- `src/app/` — marketing routes
- `src/collections/` — Payload CMS collections
- `src/components/` — Oatmeal components
- `src/lib/` — shared helpers
- `.local/` — private reference material (gitignored)
