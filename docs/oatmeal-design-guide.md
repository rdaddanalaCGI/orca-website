# Oatmeal Design Guide

Oatmeal is the Tailwind Plus SaaS marketing kit used as the design foundation for the Orcaworks marketing site. This guide describes the actual files and conventions in this repository, not a generic Tailwind tutorial.

## 1. Theme setup

The design token layer lives in `src/app/globals.css`:

```css
@import 'tailwindcss';

@theme {
  --font-display: 'Instrument Serif', serif;
  --font-sans: 'Inter', system-ui, sans-serif;

  --color-olive-50: oklch(98.8% 0.003 106.5);
  --color-olive-100: oklch(96.6% 0.005 106.5);
  --color-olive-200: oklch(93% 0.007 106.5);
  --color-olive-300: oklch(88% 0.011 106.6);
  --color-olive-400: oklch(73.7% 0.021 106.9);
  --color-olive-500: oklch(58% 0.031 107.3);
  --color-olive-600: oklch(46.6% 0.025 107.3);
  --color-olive-700: oklch(39.4% 0.023 107.4);
  --color-olive-800: oklch(28.6% 0.016 107.4);
  --color-olive-900: oklch(22.8% 0.013 107.4);
  --color-olive-950: oklch(15.3% 0.006 107.1);

  --color-orca-orange: #ff4b1f;
  --color-orca-orange-hover: #e6421b;
  --color-orca-mist: #edf8f9;
  --color-orca-teal-dark: #326367;
}
```

- **Olive palette**: the primary neutral scale, used for the majority of backgrounds, body text, borders, and chrome.
- **Orcaworks accent palette**: brand colors added for handbook and controlled marketing accents. Always reference them via `var(--color-*)` rather than hard-coding the hex value.
- **Light background**: `olive-100`; **dark background**: `olive-950`.
- **Font display**: `Instrument Serif` for headings; **font sans**: `Inter` for body text.
- **Dark mode**: enabled through `dark:` variants. The `html` element flips background automatically.
- **Font preconnects**: `Instrument Serif` and `Inter` are loaded in `src/app/layout.tsx` from Google Fonts. If you change fonts, update both the `<head>` links and `--font-*` CSS variables.

## 1.1 Brand color usage

The Orcaworks accent palette is intentionally limited. Olive must remain the dominant color on marketing pages.

| Token                                             | Value     | When to use                                                                                                        |
| ------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `text-orca-orange` / `bg-orca-orange`             | `#ff4b1f` | Primary CTAs, selected/active nav items, eyebrow labels, and high-value links. Never the dominant color on a page. |
| `text-orca-orange-hover` / `bg-orca-orange-hover` | `#e6421b` | Hover/focus states for orange controls.                                                                            |
| `bg-orca-mist`                                    | `#edf8f9` | One highlighted section surface per page, used sparingly for callouts or explanatory content.                      |
| `text-orca-teal-dark`                             | `#326367` | Optional supporting accent. Currently used only to derive dark-mode Mist surfaces via `color-mix`.                 |

### Visual balance

Target balance for a marketing page:

```text
85–90% Olive / neutral
 7–10% Orcaworks Orange
 2–5%  Mist
 0–2%  Deep Teal, only when useful
```

### Reusable component variants

Apply brand color through the existing primitives, not one-off classes. Scattering `text-orca-orange` across arbitrary elements should be avoided.

| Component                         | Prop                     | Effect                                                                                     |
| --------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| `Eyebrow`                         | `variant="brand"`        | Orange section label.                                                                      |
| `Section`                         | `eyebrowVariant="brand"` | Orange label for a `Section` eyebrow.                                                      |
| `Section`                         | `surface="mist"`         | Mist background in light mode; a dark `color-mix` of Deep Teal and Olive 950 in dark mode. |
| `Button` / `ButtonLink`           | `color="brand"`          | Solid Orange primary button.                                                               |
| `PlainButton` / `PlainButtonLink` | `color="brand"`          | Text Orange with a subtle Orange hover surface.                                            |
| `Link`                            | `color="brand"`          | Orange inline arrow/text link.                                                             |
| `CallToActionSimple`              | `eyebrowVariant="brand"` | Orange eyebrow for the CTA block.                                                          |

Example:

```tsx
import { ButtonLink } from '@/components/elements/button'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Section } from '@/components/elements/section'

<Hero eyebrow={<Eyebrow variant="brand">Orcaworks</Eyebrow>}>
  ...
  <ButtonLink href="/contact" color="brand">Get started</ButtonLink>
</Hero>

<Section
  eyebrow="Build"
  eyebrowVariant="brand"
  surface="mist"
  headline="..."
>
  ...
</Section>
```

### Rules of thumb

- Use Orange for at most one primary action per major section.
- Do not make headings, body copy, cards, tables, pricing tiers, or the global footer Orange.
- Keep Mist to one meaningful surface per page; do not use the literal `bg-orca-mist` on dark surfaces.
- `orca-orange` must not be the sole state indicator. Pair it with `aria-current`, labels, or other affordances.
- For dark mode, derive muted brand surfaces with `color-mix` from the existing tokens (for example, `color-mix(in oklab, var(--color-orca-teal-dark) 20%, var(--color-olive-950))`).

### Handbook (Nextra)

The mock handbook at `src/app/handbook-preview/` is the design sandbox. Handbook-specific Nextra overrides live in `src/app/handbook-preview/handbook.css`. It:

- maps Nextra neutrals to the Olive scale;
- sets `--nextra-primary-hue/saturation/lightness` from the Orcaworks Orange HSL;
- uses `var(--color-orca-mist)` for callout surfaces and `var(--color-orca-orange)` for accents;
- keeps `--color-orca-teal-dark` unused unless the design review later wants it.

## 2. Typography

Typography components are in `src/components/elements/`.

| Component    | File             | Tag    | Use for                                        |
| ------------ | ---------------- | ------ | ---------------------------------------------- |
| `Heading`    | `heading.tsx`    | `h1`   | Page hero / one per page                       |
| `Subheading` | `subheading.tsx` | `h2`   | Section headlines                              |
| `Eyebrow`    | `eyebrow.tsx`    | `span` | Small all-caps section labels                  |
| `Text`       | `text.tsx`       | `div`  | Body copy, supports `size="md" \| "lg"`        |
| `Document`   | `document.tsx`   | `div`  | Long-form prose with styled lists, links, `h2` |

- **One `h1` per page** is enforced by `tests/seo.test.ts`.
- `font-display` is used for `Heading` and `Subheading`.
- `text-olive-700` / `text-olive-400` are the default muted body colors.

## 3. Layout

| Component             | File                                 | Purpose                                                                                                 |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `Container`           | `container.tsx`                      | Max-width wrapper: `max-w-2xl` mobile, `max-w-3xl` tablet, `max-w-7xl` desktop, with horizontal padding |
| `Section`             | `section.tsx`                        | Vertical rhythm (`py-16`) and an optional `headline`/`subheadline`/`cta` area over children             |
| `Main`                | `main.tsx`                           | Wraps the page between navbar and footer                                                                |
| `DocumentLeftAligned` | `sections/document-left-aligned.tsx` | Full page layout with a left-aligned `Heading` and `Document` body                                      |

Common spacing:

- Section vertical padding: `py-16`.
- Container horizontal padding: `px-6` / `lg:px-10`.
- Grid gaps: `gap-10` and `sm:gap-16` are common.

Breakpoints follow Tailwind defaults (sm, md, lg, xl, 2xl).

## 4. Components inventory

### `src/components/elements/`

Primitives and small UI pieces:

- `announcement-badge.tsx` — small pill link for top-of-page alerts.
- `button.tsx` — `ButtonLink`, `PlainButtonLink`, `SoftButtonLink`.
- `container.tsx` — max-width page container.
- `document.tsx` — prose wrapper.
- `email-signup-form.tsx` — newsletter input.
- `eyebrow.tsx` — section label.
- `heading.tsx` — single `h1`.
- `install-command.tsx` — code-style copy block.
- `link.tsx` — inline arrow link.
- `logo-grid.tsx` — customer logo strip.
- `main.tsx` — `<main>` wrapper.
- `screenshot.tsx` — screenshot card with wallpaper.
- `section.tsx` — generic section wrapper.
- `subheading.tsx` — `h2`.
- `text.tsx` — body text.
- `wallpaper.tsx` — decorative background cards.

### `src/components/sections/`

Ready-made page sections. The file name describes the layout:

- **Heroes**: `hero-centered-with-demo.tsx`, `hero-centered-with-photo.tsx`, `hero-left-aligned-with-demo.tsx`, `hero-left-aligned-with-photo.tsx`, `hero-simple-centered.tsx`, `hero-simple-left-aligned.tsx`, `hero-two-column-with-photo.tsx`, `hero-with-demo-on-background.tsx`.
- **Features**: `features-stacked-alternating-with-demos.tsx`, `features-three-column-with-demos.tsx`, `features-three-column.tsx`, `features-two-column-with-demos.tsx`, `features-with-large-demo.tsx`.
- **Stats**: `stats-four-columns.tsx`, `stats-three-column-with-description.tsx`, `stats-with-graph.tsx`.
- **Testimonials**: `testimonial-two-column-with-large-photo.tsx`, `testimonial-with-large-quote.tsx`, `testimonials-three-column-grid.tsx`.
- **Pricing**: `pricing-hero-multi-tier.tsx`, `pricing-multi-tier.tsx`, `pricing-single-tier-two-column.tsx`, `plan-comparison-table.tsx`.
- **FAQs**: `faqs-accordion.tsx`, `faqs-two-column-accordion.tsx`.
- **CTAs**: `call-to-action-simple.tsx`, `call-to-action-simple-centered.tsx`.
- **Footers**: `footer-with-link-categories.tsx`, `footer-with-links-and-social-icons.tsx`, `footer-with-newsletter-form-categories-and-social-icons.tsx`.
- **Navbars**: `navbar-with-links-actions-and-centered-logo.tsx`, `navbar-with-logo-actions-and-centered-links.tsx`, `navbar-with-logo-actions-and-left-aligned-links.tsx`.
- **Document / content**: `document-centered.tsx`, `document-left-aligned.tsx`.
- **Team**: `team-four-column-grid.tsx`, `team-three-column-grid.tsx`.
- **Brand / logo**: `brands-cards-multi-column.tsx`.

### `src/components/icons/`

SVG icon set, mostly outline style. Examples: `arrow-narrow-right-icon.tsx`, `chevron-icon.tsx`, `inbox-icon.tsx`, plus social icons under `icons/social/`.

Import and use like any React component:

```tsx
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
```

## 5. Page assembly

To add a new marketing page:

1. Create `src/app/<route>/page.tsx`.
2. Export metadata with `createMetadata({ title, description, path })`.
3. Keep one `<Heading>` / `h1`.
4. Compose sections from `src/components/sections/`.
5. Register the route in `src/lib/routes.ts` so it appears in the sitemap and tests.

Example from `src/app/about/page.tsx`:

```tsx
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'About',
  description: '...',
  path: '/about',
})

export default function Page() {
  return <>{/* sections go here */}</>
}
```

## 6. Tailwind Plus UI Blocks

Adjacent reference folders (`../marketing-v4` and `../application-ui-v4`) contain Tailwind Plus blocks. Use them like this:

1. Prefer an Oatmeal section first.
2. If you adapt a Tailwind Plus block, update colors to the `olive-*` palette and fonts to `font-display` / `font-sans`. Use `orca-*` brand tokens only where the block needs an accent, following the same 85–90% Olive restraint.
3. Do not introduce another UI framework (no MUI, Bootstrap, etc.).

## 7. Design experimentation

Safe files for experimentation:

- **Color palette**: `src/app/globals.css` `--color-olive-*` and `--color-orca-*`.
- **Handbook theme**: `src/app/handbook-preview/handbook.css` for Nextra-specific overrides.
- **Fonts**: `src/app/layout.tsx` `<head>` links + `src/app/globals.css` `--font-*`.
- **Section layout**: create a scratch page under `src/app/` or compose in an existing page.

Do not change without engineering review:

- `next.config.ts`
- `src/lib/security-headers.ts`
- `src/lib/env.ts`
- `.github/workflows/ci.yml`
- `src/payload.config.ts`

## 8. Accessibility and performance

- Use `next/image` for photos and `alt` text.
- Keep components as Server Components unless browser interaction is required.
- Maintain one `h1` per page and logical heading order.
- `focus-visible` styles are handled by Tailwind.
- Form labels are required on all inputs.
- Test dark mode in the browser; the `dark:` variants flip `olive-950` / `olive-100` backgrounds and text colors.
- When using `orca-orange` for text, verify contrast on both `olive-50`/`olive-100` and `olive-950` backgrounds. Do not use it as the only indicator of state.
