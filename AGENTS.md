# AGENTS.md — Orcaworks

Enduring rules for coding agents working on the Orcaworks website.

## Quality gates (enforced, not optional)

The repository blocks poor commits at three levels. Do not bypass them.

| Stage      | Command                       | Enforces                                          |
| ---------- | ----------------------------- | ------------------------------------------------- |
| pre-commit | `lint-staged` + secret scan   | ESLint (0 warnings) + Prettier + secret scan      |
| pre-push   | `pnpm typecheck && pnpm test` | Types and unit/integration tests                  |
| CI         | `pnpm check` + e2e + audit    | Everything, plus Playwright and dependency policy |

`pnpm check` = `format:check` → `lint` → `typecheck` → `test` → `build`.

Never use `--no-verify`. If a hook fails, fix the cause.
Never weaken a rule or delete a test to make a gate pass.

## Oatmeal

- Oatmeal is the design foundation. Inspect existing Oatmeal components before creating new ones.
- Prefer Oatmeal components/sections where appropriate.
- Tailwind Plus UI Blocks from `../marketing-v4` and `../application-ui-v4` can be adapted when needed.
- Do not redesign the global theme without direction from the design team.
- Do not introduce another UI framework.
- `src/components/{elements,sections,icons}/` is **vendored template code**. It is kept
  close to upstream so it can be re-synced, and has relaxed lint rules. Do not add new
  paths to that ESLint exemption list, and put new code in your own directories.

## Rendering

- Server Components by default.
- Use client components only when actual browser interaction requires them.
- Important public content must render into HTML.
- Prefer static generation/caching over unnecessary dynamic rendering.

## SEO

- SEO metadata is part of page correctness. Always use `createMetadata()` from `src/lib/seo.ts`.
- Every page must export `metadata` (or `generateMetadata`) with an explicit `path`
  so the canonical URL is correct. `tests/seo.test.ts` fails the build otherwise.
- **Adding a page? Register it in `src/lib/routes.ts`.** That file drives the sitemap
  and the SEO tests. A page missing from it fails CI.
- One `<h1>` per page.
- Only `APP_ENV=production` is indexable. `createMetadata()` and `robots.ts` derive this
  from `src/lib/env.ts` — never hand-write `robots` metadata.
- Do not casually change existing public URLs. Add a redirect in `src/lib/redirects.ts`.
- Structured data goes through the helpers in `src/lib/seo.ts` and the `JsonLd` component.
  Never interpolate unsanitised CMS content into a script tag.

## Internal links

- No `href="#"` placeholder links in public UI.
- Public links must point to an existing route, a valid hash anchor, or a listed redirect.
- If a link target does not exist yet, either create a minimal scaffold page and register it,
  or remove the link until the page exists.

## Quality

- Preserve Oatmeal accessibility and responsive behavior.
- Avoid unnecessary dependencies.
- Keep performance in mind.
- Run `pnpm check` before considering substantial work complete.

## Payload CMS

- Collections live in `src/collections/`.
- Use `src/lib/payload.ts` for server-side CMS queries.
- Do not expose CMS admin runtime during build.
- Payload admin and API routes are mounted in `src/app/(payload)/`. Do not remove or replace them.
- Public Payload API writes must not bypass the server-action validation path for form submissions.
- Any change to collection `access` rules or public write permissions requires explicit review.

## Migration

- `.local/` contains private/reference migration inputs and is gitignored.
- Never commit `.local/`.
- Agents may read those files when specifically asked.
- Do not automatically import or rewrite WordPress content.
- The authoritative migration requirement is URL completeness.
- Old URLs must either still exist or have a valid redirect.

## Deployment

- Preserve local/Vercel/AWS portability.
- Do not unnecessarily introduce host-specific application dependencies.
- Treat Supabase Free as a temporary/shared test Postgres provider.
- Long-term production target is AWS.
- Production media must not use ephemeral local disk. Use S3-compatible storage.

## Security

- Never commit secrets. Never put server secrets in `NEXT_PUBLIC_*`.
- All environment access goes through `src/lib/env.ts`, which validates with Zod and
  fails fast in production. Do not read `process.env` directly in feature code.
- Security headers and the CSP live in `src/lib/security-headers.ts` and are covered by
  `tests/security.test.ts`. Widening the CSP requires a comment explaining why.
- All user input is validated server-side with Zod (`src/lib/schemas.ts`).
- Never return raw exception messages to the browser. Log server-side, return a generic message.
- Public write endpoints must be rate limited (`src/lib/rate-limit.ts`).
- Payload collections must declare explicit `access` rules. Writes require `req.user`.
- Uploads are restricted by an explicit mime-type allowlist and a file-size cap.
- `@/lib/payload` and `@/payload.config` are server-only and ESLint blocks importing them
  into `src/components/**`.
- The pre-commit hook runs `scripts/check-staged-secrets.mjs`. Never bypass it with
  `--no-verify`; if it has false positives, adjust the script and document why.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
