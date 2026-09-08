# Colour System

This documents the site's color tokens and the usage rules established for the template-level theming pass (global background, header, footer, cards, and menu hover states). All tokens live in `src/app/globals.css` under the `@theme` block and are consumed as Tailwind utilities (`bg-*`, `text-*`, etc.) — never hard-code a hex value in a component.

## Tokens

```css
@theme {
  --color-olive-50: #edf8f9;
  --color-olive-100: #e9eeef;
  --color-olive-200: #d4dedf;
  --color-olive-300: #bfcecf;
  --color-olive-400: #abbebf;
  --color-olive-500: #96aeb0;
  --color-olive-600: #829fa1;
  --color-olive-700: #6e8f92;
  --color-olive-800: #5a8083;
  --color-olive-900: #467275;
  --color-olive-950: #326367;

  --color-orca-orange: #ff4800;
  --color-orca-orange-hover: #ff4800;
  --color-orca-mist: #edf8f9;
  --color-orca-teal-dark: #326367;
  --color-page: #f9feff;
}
```

| Swatch                                                                                                                       | Token                       | Value               | Utility classes                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------- | --------------------------------------------------------------------------------------------- |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#f9feff;border:1px solid #ccc"></span> | `--color-page`              | `#f9feff`           | `bg-page`, `text-page`                                                                        |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#edf8f9;border:1px solid #ccc"></span> | `--color-orca-mist`         | `#edf8f9`           | `bg-orca-mist`, `text-orca-mist`                                                              |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#326367;border:1px solid #ccc"></span> | `--color-orca-teal-dark`    | `#326367`           | `bg-orca-teal-dark`                                                                           |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#ff4800;border:1px solid #ccc"></span> | `--color-orca-orange`       | `#ff4800`           | `bg-orca-orange`, `text-orca-orange`                                                          |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#ff4800;border:1px solid #ccc"></span> | `--color-orca-orange-hover` | `#ff4800`           | `hover:bg-orca-orange-hover` (currently identical to `orca-orange` — no distinct hover shade) |
| —                                                                                                                            | `--color-olive-*`           | oklch neutral scale | `bg-olive-*`, `text-olive-*`, etc. — see swatch table below                                   |

### Olive neutral scale (swatches + hex for design tools)

The olive scale is defined directly in hex (previously it was generated from OKLCH — that's no longer the case, so don't recompute it from a lightness formula; these literal values are the source of truth):

| Swatch                                                                                                                       | Token       | Hex       |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------- | --------- |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#edf8f9;border:1px solid #ccc"></span> | `olive-50`  | `#edf8f9` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#e9eeef;border:1px solid #ccc"></span> | `olive-100` | `#e9eeef` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#d4dedf;border:1px solid #ccc"></span> | `olive-200` | `#d4dedf` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#bfcecf;border:1px solid #ccc"></span> | `olive-300` | `#bfcecf` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#abbebf;border:1px solid #ccc"></span> | `olive-400` | `#abbebf` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#96aeb0;border:1px solid #ccc"></span> | `olive-500` | `#96aeb0` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#829fa1;border:1px solid #ccc"></span> | `olive-600` | `#829fa1` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#6e8f92;border:1px solid #ccc"></span> | `olive-700` | `#6e8f92` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#5a8083;border:1px solid #ccc"></span> | `olive-800` | `#5a8083` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#467275;border:1px solid #ccc"></span> | `olive-900` | `#467275` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#326367;border:1px solid #ccc"></span> | `olive-950` | `#326367` |

> **Note:** `olive-50` (`#edf8f9`) and `olive-950` (`#326367`) are now the _exact same values_ as `--color-orca-mist` and `--color-orca-teal-dark` respectively — the neutral scale's two ends were deliberately aligned with the brand teal. One consequence: **dark mode is no longer near-black.** `html`'s dark-mode background is `var(--color-olive-950)`, which is now a mid-tone teal (`#326367`), not the near-black it used to be. Any component relying on `dark:bg-olive-950`/`text-olive-950` for a "near-black" surface or text color will now render as this teal instead — check dark mode visually after any further palette change here.

> **Note for design handoff:** the hex column above is the literal source of truth (copied straight from `globals.css`), so it's safe to build a Figma/Sketch color style library directly from it.

## Usage rules

### 1. Page background — `#f9feff` (`--color-page`)

Set once, at the template level, on `html` in `globals.css`:

```css
@layer base {
  html {
    background-color: var(--color-page);
    @variant dark {
      background-color: var(--color-olive-950);
    }
  }
}
```

- **Do not** add a background color to individual `<section>` elements — they should stay transparent and let this show through. The shared `Section` component (`src/components/elements/section.tsx`) has no background of its own for this reason.
- The **header** (`navbar-with-logo-actions-and-centered-links.tsx`) explicitly uses `bg-page` (light) so it's seamless with the body — it does not merely inherit, since it's a `sticky` element that needs an opaque background of its own.
- The header's dropdown panels (`AgenticApplicationsMenu`, `ResourcesMenu`) also use `bg-page` for the same reason.

### 2. Box / card backgrounds — `#edf8f9` (`--color-orca-mist`)

Any self-contained box or card — a feature card, pricing tier, testimonial card, sidebar box, dropdown-menu row/tile — uses `bg-orca-mist`, paired with this dark-mode equivalent:

```
dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]
```

This includes:

- Homepage feature/bento/vertical/application cards
- Pricing tier and testimonial cards
- Blog sidebar boxes, contact form success/panel boxes
- The header's inner dropdown-menu hover/active states (the row behind a hovered industry name, and the featured-application tiles) — these should **stay** mist on hover, not switch to a gray overlay
- The `feature-tabs.tsx` tab-switcher bar, description panel, and image frame

**Not** included (left as plain text-color hover, no box): buttons, form inputs, badges/pills, tab switchers, small flow-step chips, and the top-level header nav items (`Orca Agent Platform`, `AI Solutions`, `Resources` triggers) — those get an orange text-color hover only, no background box.

### 3. Footer & decorative wallpaper — `#326367` (`--color-orca-teal-dark`)

Fixed, theme-independent (same value in light and dark mode) — used for:

- The site footer (`footer-with-newsletter-form-categories-and-social-icons.tsx`)
- The `Wallpaper` component (`src/components/elements/wallpaper.tsx`), which backs the homepage screenshot cards and the `/agentic-automation-platform` hero. `Wallpaper` no longer takes a `color` prop — it always renders this teal.

Because these surfaces are always this one dark color regardless of theme, their text/icons are hard-set to white/`white/70`/`white/60` rather than switching with `dark:`.

### 4. Brand accent — `#ff4800` (`--color-orca-orange`)

Primary CTAs, active/selected nav state, eyebrow labels. Should remain a minority accent color, not a dominant surface. `--color-orca-orange-hover` currently has the same value — there is no separate, darker hover shade defined.

This same value is duplicated in two places that can't read `globals.css` directly, so update them alongside it if it ever changes again:

- `src/app/(payload)/admin.css` — hardcoded `--color-orca-orange` / `--color-orca-orange-hover` for the Payload admin UI.
- `src/app/ai-agent-handbook/handbook.css` and `src/app/enterprise-ai-safety-handbook/handbook.css` — `--nextra-primary-hue/-saturation/-lightness`, the HSL equivalent Nextra needs for handbook links/highlights. For `#ff4800` that's `17deg 100% 50%` (light) / `17deg 100% 54%` (dark).

## Dark mode pattern

Most tokens don't need a dark-mode override (olive scale already flips via `dark:` variants). The two exceptions with a fixed light value (`--color-page`, `--color-orca-mist`) use:

- `--color-page` → `dark:bg-olive-950` (header, page background)
- `--color-orca-mist` → `dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]` (cards)

Copy this `color-mix` expression verbatim rather than approximating a new dark shade, so every mist surface site-wide stays visually consistent.

> **Known side effect of the current olive palette:** now that `--color-olive-950` and `--color-orca-teal-dark` are the identical value (`#326367`), the `color-mix` above blends a color with itself and collapses to flat `#326367`. In practice this means every card that uses the mist/dark-card treatment now renders as the _exact same_ solid teal as the footer and the `Wallpaper` component in dark mode — there's currently no visual distinction between "a card surface" and "a footer/decorative surface" in dark mode. If that distinction matters, either give `olive-950` a value darker than `orca-teal-dark` again, or replace the `color-mix` card formula with a different dark surface color.
