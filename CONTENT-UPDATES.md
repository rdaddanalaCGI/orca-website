# Content Updates — September 16, 2026

Summary of content, copy, and image changes made on this branch
(`website-content-and-image-changes`), reviewed and confirmed on the
Vercel preview at `orca-website-zeta.vercel.app` before merging to
production.

## Logo

- Replaced the dark-mode logo asset (`orcaworks-white.png`). It was
  previously identical to the light-mode logo (black wordmark), so it
  was invisible on dark backgrounds. It now uses a white version of
  the wordmark. The light-mode logo (`orcaworks-dark.png`) is
  unchanged.

## Homepage — Hero section

- Eyebrow: "Explore applications" → "Explore applications." (added
  period).
- Headline: "Enterprise AI that you can read." → **"Enterprise AI You
  Can Read."** This is the only heading kept in Title Case — every
  other heading below uses normal sentence case.
- Subheadline replaced with:
  > Orcaworks turns AI deployments into a human-readable blueprint.
  > This AI Manifest becomes the single source of truth for how AI
  > operates across your organization, enabling leaders to
  > understand, govern, and audit AI without tracing dozens of
  > disconnected systems.

## Homepage — Governance section

- Heading →
  > Governance starts with visibility & control: introducing the
  > Agentic Blueprint as Code (ABC).
- Body: renamed "the Orcaworks Blueprint" to "the Agentic Blueprint as
  Code (ABC)," added a new opening sentence.

## Homepage — Declare Agent cards

- Headings: "Declare the context/workflow/interaction" → "Declare
  agent context/workflow/interaction."
- Rewrote the interaction card's description copy.
- Heading typography matched to the application card heading style.

## Homepage — "Understand Orcaworks" section

Replaced all 5 card images (previously generic stock placeholders)
with real product screenshots:

| Card                | Image file                |
| ------------------- | ------------------------- |
| Operating Blueprint | `operating-blueprint.png` |
| Faster Delivery     | `faster-delivery.png`     |
| Connected Context   | `connected-context.png`   |
| Governed Execution  | `governed-execution.png`  |
| Where Work Happens  | `where-work-happens.png`  |

Copy changes:

- "AI has the same view..." → "Your digital coworker has the same
  view..."
- "AI knows what to do..." → "Your digital coworker knows what to
  do..."
- Fixed 5 instances of em dash punctuation to commas.
- "30 min / day" → "30 mins/day"; "hours / year" → "hours/year."

## Homepage — Applications section

- "CRO" → "CLINICAL RESEARCH ORGANIZATIONS."
- "ACE" → "ARCHITECTURE, CONSTRUCTION & ENGINEERING."

## Homepage — Closing CTA ("Start with one workflow")

- Removed the second button ("Explore the platform"). The section now
  shows only "Get a demo."

## Homepage — Button styling

- Unified 5 secondary buttons across the page to match the hero's
  "See how it works" pill style (borderless, ink-colored, soft fill
  on hover).
- Fixed a layout bug where 2 of those buttons stretched full-width
  inside a vertical flex container instead of sizing to their
  content.

## Agentic Automation Platform page — hero banner

- Replaced the hero demo image with the new "Context + RAG Playground"
  screenshot (`context-hub-mock.png`), positioned on the right side of
  the hero.
- Changed the hero background from the green gradient wallpaper to a
  solid color: **#326369**.

## Agentic Automation Platform page — flow diagram images

Replaced all 6 flow-diagram tab images with refreshed versions:

| Tab                  | Image file                                  |
| -------------------- | ------------------------------------------- |
| Orcaworks Platform   | `Enterprise-Grade-AI-Stack.jpg`             |
| Trusted Context      | `Trusted-Context-That-Drives-Decisions.jpg` |
| Predictable Outcomes | `Deterministic-Manifests-Achieve.jpg`       |
| Built-in Governance  | `Governance-Built-Into-Execution.jpg`       |
| Observability        | `Full-Visibility-Into-Every-Run.jpg`        |
| Works Alongside You  | `Execution-Embedded-Where-Work-Happens.jpg` |

## New pages

Merged from the team's `features/verticals` branch:

- Rebuilt `/solutions` landing page.
- New `/solutions/legal` page.
- Expanded `/solutions/architecture-construction-engineering`.
- New `/solutions/specialty-commercial-lending-finance` (old
  `/solutions/credit-unions-specialty-lending` now redirects here).

## Assets

All new image assets are in the repo under `public/img/bento/`,
`public/img/platform/`, and `public/img/orca-frontend/` — pull from
there rather than re-exporting.
