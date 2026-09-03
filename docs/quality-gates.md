# Quality Gates

How the repository prevents poor code from reaching `main`.

## Layers

```text
Editor            ESLint + Prettier
   ↓
pre-commit        lint-staged + staged secret scan (staged files only, fast)
   ↓
pre-push          typecheck + unit tests
   ↓
CI (pull request) format, lint, typecheck, tests, build, e2e, audit
```

Each layer is progressively slower and more thorough, so feedback is fast locally
while CI remains authoritative.

## Commands

| Command                 | Purpose                                                                      |
| ----------------------- | ---------------------------------------------------------------------------- |
| `pnpm format`           | Rewrite files with Prettier                                                  |
| `pnpm format:check`     | Fail if anything is unformatted                                              |
| `pnpm lint`             | ESLint, zero warnings tolerated                                              |
| `pnpm lint:fix`         | ESLint with autofix                                                          |
| `pnpm typecheck`        | `tsc --noEmit` in strict mode                                                |
| `pnpm test`             | Vitest unit/integration suite                                                |
| `pnpm test:integration` | DB-backed integration tests against a real Postgres                          |
| `pnpm test:e2e`         | Playwright browser suite                                                     |
| `pnpm check`            | The full pre-merge gate (`format` → `lint` → `typecheck` → `test` → `build`) |

## Git hooks

Managed by Husky and installed automatically by `pnpm install` (via `prepare`).

- `.husky/pre-commit` → `pnpm lint-staged && node scripts/check-staged-secrets.mjs`
- `.husky/pre-push` → `pnpm typecheck && pnpm test`

`lint-staged` runs ESLint with `--max-warnings=0 --fix` and Prettier on staged
files, then restores the original state if anything fails, so a failed commit
never leaves a half-formatted tree.

The staged secret scanner (`scripts/check-staged-secrets.mjs`) fails on private
keys, AWS/GitHub/Slack tokens, and high-entropy `SECRET`/`TOKEN`/`API_KEY`
assignments. It never logs the secret value; only the file, line, and pattern
type are reported.

**Do not use `git commit --no-verify`.** If a hook fails, fix the cause.

## CI jobs

`.github/workflows/ci.yml` runs:

1. **quality** — `pnpm install --frozen-lockfile`, format check, lint, typecheck,
   unit tests, production build.
2. **e2e** — Playwright against a real production build, asserting metadata,
   security headers, `noindex` behaviour, redirects, the 404 page, CMS routes,
   and the sitemap.
3. **security** — `pnpm audit --audit-level high`,
   `scripts/check-dependency-versions.mjs`, and the staged secret scanner.
4. **integration** — Postgres-backed Payload tests for form persistence and
   collection access.

`--frozen-lockfile` means a `package.json` change without a matching
`pnpm-lock.yaml` fails the build.

## What the automated checks assert

### `tests/seo.test.ts`

- Every registered route exports `metadata` built with `createMetadata()`.
- Every route declares an explicit canonical `path`.
- Every `page.tsx` anywhere in `src/app` has `metadata` or `generateMetadata`.
- The sitemap static route list matches the non-dynamic pages on disk.
- No page contains more than one `<h1>`.

### `tests/security.test.ts`

- All required security headers are present.
- `createSecurityHeaders({ isDev: false })` blocks framing, plugins, and
  arbitrary form/base targets.
- `createSecurityHeaders({ isDev: false })` includes `upgrade-insecure-requests`.
- `createSecurityHeaders({ isDev: false })` omits `'unsafe-eval'`.
- `createSecurityHeaders({ isDev: true })` allows `unsafe-eval` for local dev.

### `tests/forms.test.ts`

- Validation accepts good input and rejects bad emails, empty messages,
  over-length fields, and absolute URLs in `sourcePage`.
- Rate limiting allows traffic up to the limit, blocks beyond it, and isolates keys.

### `tests/url-completeness.test.ts`

- Redirects have no self-references, duplicates, or loops.
- Every redirect lands on a page that exists.
- Every URL in the authoritative CSV either still exists or redirects to a real page.

### `tests/secrets.test.ts`

- `scripts/check-staged-secrets.mjs` detects private keys, AWS keys, GitHub/Slack
  tokens, and high-entropy secret assignments.
- Placeholder values (`example`, `your_api_key`, `placeholder`, `test`) are ignored.
- No secret value is included in findings.

### `scripts/check-dependency-versions.mjs`

- No canary / beta / rc / alpha / insiders / experimental versions.
- No `latest`, `*`, or empty ranges.
- All official Payload packages share one version.
- `react`/`react-dom` and `tailwindcss`/`@tailwindcss/postcss` versions match.
- `eslint-config-next` matches `next`.
- Packages on the do-not-add list stay out.

The script does **not** reject all caret/tilde ranges, but it does reject the
risky forms listed above. If the project later wants exact-only pinning, this
script and this document must be updated together.

## Adding a page

1. Create `src/app/<route>/page.tsx`.
2. Export metadata:

   ```ts
   export const metadata = createMetadata({
     title: 'Page title',
     description: 'A meaningful description over 20 characters.',
     path: '/route',
   })
   ```

3. Register the route in `src/lib/routes.ts`.
4. Run `pnpm check`.

Skipping step 2 or 3 fails the test suite by design.

## Notes for designers

Safe to edit freely:

- `src/app/globals.css` — colours, fonts, theme variables
- `src/app/**/page.tsx` — section composition and copy
- `src/components/sections/**` — section markup

If Prettier reformats your file on commit, that is expected. Run `pnpm format`
at any time. If ESLint blocks a commit, `pnpm lint:fix` resolves most issues.
