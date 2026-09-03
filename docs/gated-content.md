# Gated content system

This project protects the deeper sections of handbooks behind an inline lead-gate.
The implementation is registry-driven, cookie-authorised, and SEO-friendly.

## What is gated?

Only the `build` and `scale` route prefixes are gated. The canonical index and the
`understand` sections remain fully public.

| Resource                        | Gated prefixes                                                                        |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| `ai-agent-handbook`             | `/ai-agent-handbook/build/*` and `/ai-agent-handbook/scale/*`                         |
| `enterprise-ai-safety-handbook` | `/enterprise-ai-safety-handbook/build/*` and `/enterprise-ai-safety-handbook/scale/*` |

The full article text is still rendered in server HTML so search engines can index it,
but visitors see a CSS clamp + fade and an inline registration form. Submitting the form
creates or updates a `leads` record and sets an `ow_unlock` cookie valid for 180 days.

## The `ow_unlock` cookie

- **Name:** `ow_unlock`
- **Format:** `v1.<issuedAtSeconds>.<sha256-hmac>`
- **Duration:** 180 days
- **Flags:** `HttpOnly` in production, `SameSite=Lax`, `Secure` in production, path `/`

The cookie is signed on the server. Client-side scripts never verify the HMAC; they only
look for the cookie's existence to avoid a visible gate flash on repeat visits.

## Components

- `src/components/gated/GatedContent.tsx` — server wrapper, renders `CreativeWork` JSON-LD
  and wraps children in `GateReveal`.
- `src/components/gated/GateReveal.tsx` — client presentation. Handles the clamp, fade,
  inert/aria-hidden state, focus, unlock animation, and success panel.
- `src/components/gated/LeadGateForm.tsx` — `useActionState` form. Validates input with
  Zod, includes a honeypot, and uses `unlockGate`.
- `src/components/gated/GatedDownloadButton.tsx` — renders a PDF download link for
  unlocked users. If locked, it can either link to the `#lead-gate` anchor or show an
  inline `LeadGateForm`.
- `src/components/gated/UnlockScript.tsx` — inline `<head>` script that sets
  `html[data-ow-unlock='1']` before React hydration.

## Adding a new gated resource

1. Open `src/lib/gated-resources.ts`.
2. Add an entry to `GATED_RESOURCES` with the `id`, `type`, `name`, `canonicalPath`,
   `gatedPrefixes`, `gateHeading`, and an optional `pdf`.
3. If a PDF is supplied, drop it into `private/pdfs/<filename>.pdf` and add the filename
   to the resource's `pdf` field.
4. Add or edit the route prefix to a handbook `[[...mdxPath]]/page.tsx`; the existing
   `findGatedResourceByPath(path)` logic will wrap it automatically.

## MDX usage

The `GatedDownloadButton` is exposed through `src/mdx-components.tsx` and can be dropped
into any handbook MDX file:

```mdx
<GatedDownloadButton resourceId="ai-agent-handbook" />
```

It respects the same unlock cookie, so the link is only rendered for registered users.

## Vertical-page usage

For a landing page that promotes a handbook PDF but does not contain the gated article,
use `GatedDownloadButton` with the inline form behaviour:

```tsx
import { GatedDownloadButton } from '@/components/gated/gated-download-button'

;<GatedDownloadButton resourceId="ai-agent-handbook" lockedBehavior="inline-form" />
```

When the user is not yet unlocked, this renders a compact `LeadGateForm`. On success it
immediately becomes the real PDF download link.

## PDF download API

`GET /api/downloads/<resourceId>`

- Returns `302` to the resource canonical if the `ow_unlock` cookie is missing or invalid.
- Returns `404` if the resource or the configured PDF does not exist.
- Returns the PDF as an attachment with `Content-Disposition` and rate-limited per IP.

The `private/pdfs` directory is included in `next.config.ts` via
`outputFileTracingIncludes` for Vercel/serverless deployments.

## Analytics events

When `window.gtag` is present, the following events are fired with non-PII parameters
(`resource_id`, `resource_type`, `resource_name`, `source_path`):

- `gated_content_view` — when a gated page renders.
- `gated_content_unlock` — when the lead form succeeds.
- `gated_pdf_download` — when the PDF download CTA is clicked.
