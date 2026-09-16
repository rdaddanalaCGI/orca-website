# Colour System

This documents the site's color tokens and the usage rules established for the template-level theming pass (global background, header, footer, cards, menu hover states, buttons, the logo, and dark-mode text/button color). All tokens live in `src/app/globals.css` under the `@theme` block and are consumed as Tailwind utilities (`bg-*`, `text-*`, etc.) — never hard-code a hex value in a component.

## At a glance

| Building...                                                                       | Use                                                                               | Section                                                                    |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| A page, or the page background                                                    | Nothing — inherit `--color-page`. No `bg-*` on sections.                          | [#1](#1-page-background-f9feff---color-page)                               |
| A card, tile, or boxed content area                                               | `bg-orca-mist`                                                                    | [#2](#2-box--card-backgrounds-edf8f9---color-orca-mist)                    |
| Anything meant to look like the footer or the decorative hero/screenshot backdrop | `bg-orca-teal-dark`                                                               | [#3](#3-footer--decorative-wallpaper-326367---color-orca-teal-dark)        |
| Text, body copy, borders, muted UI                                                | `olive-*` scale (see below — it's the neutral/grayscale ramp)                     | [Olive neutral scale](#olive-neutral-scale-swatches--hex-for-design-tools) |
| An accent (active state, eyebrow, focus ring)                                     | `orca-orange` — sparingly, check contrast first                                   | [#4](#4-brand-accent-ff4800---color-orca-orange)                           |
| A button                                                                          | The shared `Button`/`SoftButton`/`PlainButton` components — never one-off classes | [#5](#5-buttons-srccomponentselementsbuttontsx)                            |
| The site logo                                                                     | The two pre-made PNGs, swapped by theme                                           | [#6](#6-logo)                                                              |
| Dark-mode text, or a dark-mode button fill                                        | `frost` — this is now the standard dark-mode ink/fill color                       | [#7](#7-dark-mode-text--button-color-frost---color-frost)                  |

`--color-olive-*` is the site's **neutral / grayscale scale** — `olive-50` is near-white, `olive-950` is near-black, with 9 steps between. It's what most body text, borders, and neutral backgrounds are built from; it is not itself a "brand color."

## Tokens

```css
@theme {
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

  --color-orca-orange: #ff4800;
  --color-orca-orange-hover: #ff4800;
  --color-orca-mist: #edf8f9;
  --color-orca-teal-dark: #326367;
  --color-page: #f9feff;
  --color-frost: #d1ecef;
}
```

| Swatch                                                                                                                       | Token                       | Value               | Utility classes                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------- | --------------------------------------------------------------------------------------------- |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#f9feff;border:1px solid #ccc"></span> | `--color-page`              | `#f9feff`           | `bg-page`, `text-page`                                                                        |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#edf8f9;border:1px solid #ccc"></span> | `--color-orca-mist`         | `#edf8f9`           | `bg-orca-mist`, `text-orca-mist`                                                              |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#326367;border:1px solid #ccc"></span> | `--color-orca-teal-dark`    | `#326367`           | `bg-orca-teal-dark`                                                                           |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#ff4800;border:1px solid #ccc"></span> | `--color-orca-orange`       | `#ff4800`           | `bg-orca-orange`, `text-orca-orange`                                                          |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#ff4800;border:1px solid #ccc"></span> | `--color-orca-orange-hover` | `#ff4800`           | `hover:bg-orca-orange-hover` (currently identical to `orca-orange` — no distinct hover shade) |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#d1ecef;border:1px solid #ccc"></span> | `--color-frost`             | `#d1ecef`           | `dark:bg-frost`, `dark:text-frost` — dark-mode-only accent, see #7 below                      |
| —                                                                                                                            | `--color-olive-*`           | oklch neutral scale | `bg-olive-*`, `text-olive-*`, etc. — see swatch table below                                   |

### Olive neutral scale (swatches + hex for design tools)

The olive scale is defined in OKLCH in code (for perceptually-even steps), but design tools like Figma/Photoshop/Illustrator want hex or RGB. These are the equivalent sRGB hex values, computed from the OKLCH definitions above — for design files, use the hex column directly:

| Swatch                                                                                                                       | Token       | OKLCH                      | Hex       |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------- | --------- |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#fbfbf9;border:1px solid #ccc"></span> | `olive-50`  | `oklch(98.8% 0.003 106.5)` | `#fbfbf9` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#f4f4f0;border:1px solid #ccc"></span> | `olive-100` | `oklch(96.6% 0.005 106.5)` | `#f4f4f0` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#e8e8e3;border:1px solid #ccc"></span> | `olive-200` | `oklch(93% 0.007 106.5)`   | `#e8e8e3` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#d8d8d0;border:1px solid #ccc"></span> | `olive-300` | `oklch(88% 0.011 106.6)`   | `#d8d8d0` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#abab9c;border:1px solid #ccc"></span> | `olive-400` | `oklch(73.7% 0.021 106.9)` | `#abab9c` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#7c7c67;border:1px solid #ccc"></span> | `olive-500` | `oklch(58% 0.031 107.3)`   | `#7c7c67` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#5b5b4b;border:1px solid #ccc"></span> | `olive-600` | `oklch(46.6% 0.025 107.3)` | `#5b5b4b` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#474739;border:1px solid #ccc"></span> | `olive-700` | `oklch(39.4% 0.023 107.4)` | `#474739` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#2b2b22;border:1px solid #ccc"></span> | `olive-800` | `oklch(28.6% 0.016 107.4)` | `#2b2b22` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#1d1d16;border:1px solid #ccc"></span> | `olive-900` | `oklch(22.8% 0.013 107.4)` | `#1d1d16` |
| <span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:#0c0c09;border:1px solid #ccc"></span> | `olive-950` | `oklch(15.3% 0.006 107.1)` | `#0c0c09` |

> **Note for design handoff:** these hex values are a faithful conversion of the OKLCH source, but the codebase's source of truth is the OKLCH definition in `globals.css`. If a designer needs an exact swatch library (e.g. a Figma color style), use the hex column above rather than re-eyeballing screenshots.

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
- **Known exception:** `feature-tabs.tsx` (the "Govern every workflow. Orchestrate every agent." section on `/agentic-automation-platform`) deliberately uses `bg-orca-mist` on its own `<section>`, by explicit design request — see #2 below. If you're tightening up section backgrounds again, don't "fix" this one without checking first.

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
- The `feature-tabs.tsx` tab-switcher bar, description panel, and image frame — **and, as a one-off exception to rule #1, the whole section's background too** (mist behind mist, separated only by a thin border), matching a specific design reference for that section

**Not** included (left as plain text-color hover, no box): buttons, form inputs, badges/pills, tab switchers, small flow-step chips, and the top-level header nav items (`Orca Agent Platform`, `AI Solutions`, `Resources` triggers) — those get an orange text-color hover only, no background box.

### 3. Footer & decorative wallpaper — `#326367` (`--color-orca-teal-dark`)

Used for:

- The `Wallpaper` component (`src/components/elements/wallpaper.tsx`), which backs the homepage screenshot cards and the `/agentic-automation-platform` hero. `Wallpaper` no longer takes a `color` prop — it always renders this teal, in both light and dark mode.
- The site footer (`footer-with-newsletter-form-categories-and-social-icons.tsx`) in **light mode only**. In dark mode the footer uses a distinct, darker `#141b1a` instead: `bg-orca-teal-dark dark:bg-[#141b1a]`.

Because these surfaces are always a dark color regardless of theme, their text/icons are hard-set to white/`white/70`/`white/60` rather than switching with `dark:`.

### 4. Brand accent — `#ff4800` (`--color-orca-orange`)

Active/selected nav state, eyebrow labels, and the universal button focus ring (see **Buttons** below). Should remain a minority accent color, not a dominant surface. `--color-orca-orange-hover` currently has the same value — there is no separate, darker hover shade defined.

This same value is duplicated in two places that can't read `globals.css` directly, so update them alongside it if it ever changes again:

- `src/app/(payload)/admin.css` — hardcoded `--color-orca-orange` / `--color-orca-orange-hover` for the Payload admin UI.
- `src/app/ai-agent-handbook/handbook.css` and `src/app/enterprise-ai-safety-handbook/handbook.css` — `--nextra-primary-hue/-saturation/-lightness`, the HSL equivalent Nextra needs for handbook links/highlights. For `#ff4800` that's `17deg 100% 50%` (light) / `17deg 100% 54%` (dark).

**Accessibility note:** `#ff4800` text/fill measures **3.34:1** against the light page background (`#f9feff`) and **3.40:1** for white text on an `#ff4800` fill — both fail WCAG AA's 4.5:1 for normal text. Near-black text on `#ff4800` measures **5.76:1** and passes. Before reusing orange as text or as a button fill, check which side of that line you're on:

- `Button`/`ButtonLink`'s solid orange fill was retired for this reason (see #5).
- `PlainButton`/`PlainButtonLink`'s orange text variant uses a darkened `#cc3a00` in light mode specifically to clear 4.5:1 (dark mode keeps full orange since the dark background makes it pass).
- `feature-tabs.tsx`'s active-tab treatment is a deliberate, explicit exception — white text on `#ff4800` (3.40:1, fails AA) was requested by name for that one spot. Don't copy that pattern elsewhere without the same explicit sign-off.

### 5. Buttons (`src/components/elements/button.tsx`)

All six button components (`Button`, `ButtonLink`, `SoftButton`, `SoftButtonLink`, `PlainButton`, `PlainButtonLink`) share one `base` class string — hover/active/focus/transition behavior is defined once, not per variant, so they can't drift out of sync.

**Solid CTAs — `Button`/`ButtonLink`, both `color="dark/light"` and `color="light"`:**

- Light mode: `bg-olive-950 text-white` (`dark/light`) or `bg-white text-olive-950` (`light`)
- Dark mode: both colors now render identically — `bg-frost text-olive-950` (`#d1ecef`), hovers to `#c0d9dc`, presses to `#b2c9cb`. See #7 below for why `dark/light` and `light` converge to the same dark-mode look.
- This is the **only** solid-fill button style used site-wide (header "Get started", every hero/CTA "Get a demo", pricing, contact form submit, gated-content forms, etc.). A `color="brand"` (solid orange fill) option used to exist on `Button`/`ButtonLink` but was removed — white text on `#ff4800` measured 3.40:1, failing WCAG AA.

**Soft buttons — `SoftButton`/`SoftButtonLink`:** `bg-olive-950/10 text-olive-950` (light) / `bg-frost text-olive-950` (dark, same as the solid CTAs above — see #7) — a lower-emphasis filled button in light mode, but now visually identical to the primary CTA in dark mode by explicit request ("primary, secondary, CTA... all buttons" should share one dark-mode color).

**Text-only buttons — `PlainButton`/`PlainButtonLink`:** no fill at rest; a soft tint appears on hover/active. The `color="brand"` variant (orange text, e.g. footer/inline arrow links) uses `text-[#cc3a00] dark:text-orca-orange` — the darker light-mode shade exists specifically to clear the 4.5:1 contrast threshold against the page background; dark mode keeps the full brand orange since it already passes there.

**Focus ring:** every button uses `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orca-orange`, fixed brand-orange regardless of theme or button color — not `outline-current`, which goes invisible for white-on-dark buttons sitting on a light page (white ring on a near-white page = no visible ring). Orange gives ≥3:1 non-text contrast (WCAG 1.4.11) against both light and dark surroundings.

**Tailwind v4 gotcha, if you touch focus styles here again:** `outline-hidden` and `focus-visible:outline*` both read/write the same `--tw-outline-style` custom property. `outline-hidden` sets it to `none` unconditionally, and a plain `focus-visible:outline-2` does _not_ reset it back — so the ring silently computes to `outline-style: none` even though width/color/offset all look correct in devtools. The fix baked into `base` is `focus-visible:[--tw-outline-style:solid]` alongside the other `focus-visible:outline-*` utilities. Keep that arbitrary-property utility if you ever rewrite `base`.

**Active feedback:** `motion-safe:active:scale-[0.97]` on every button (respects `prefers-reduced-motion`).

### 6. Logo

`SiteNavbar` (`src/components/site/site-navbar.tsx`) swaps two pre-rendered PNGs by theme, the same `dark:hidden`/`not-dark:hidden` pattern used elsewhere for theme-dependent images:

- `public/img/logos/orcaworks-dark.png` — the official logo (orange icon + near-black "orcaworks" text), shown in light mode.
- `public/img/logos/orcaworks-white.png` — the same icon with the text recolored to white, shown in dark mode. Generated from the file above with `sharp` (recolor near-black pixels to white, leave the `#ff4800`-ish orange icon pixels untouched, preserve alpha) — regenerate the same way if the source logo ever changes, rather than hand-editing.

An earlier attempt rendered the wordmark as inline SVG text so it could pick up `currentColor` automatically. Don't reintroduce that: the SVG's `font-family: Outfit` isn't loaded anywhere on this site (only `Familjen Grotesk` is), so the text fell back to an unstyled font and rendered with visible aliasing artifacts at header size. The two-PNG swap has no font dependency and is what's actually in use.

The Payload admin panel (`src/components/admin/Logo.tsx`) also points at `orcaworks-dark.png`, so it picks up the same source logo automatically.

### 7. Dark mode text & button color — `#d1ecef` (`--color-frost`)

`frost` is the standard **dark-mode-only** ink color, by explicit request to unify dark mode's text and button fills into one consistent color instead of the previous mix of `olive-400` (text) and `olive-300` (buttons). It has no light-mode role — don't use `bg-frost`/`text-frost` outside a `dark:` variant.

**Text.** Every muted/body-copy text color site-wide switches to this in dark mode:

```
text-olive-700 dark:text-frost
```

This is baked into the shared `Text` component (`src/components/elements/text.tsx`) and duplicated directly (same `dark:text-frost` utility) across ~37 other files — paragraphs, excerpts, card descriptions, dropdown-menu descriptions, footer fineprint-adjacent copy, etc. If you're adding new body copy, reach for `<Text>` rather than hand-writing `text-olive-700 dark:text-frost` again.

**Buttons.** Every solid/soft button fill converges on this same color in dark mode (see #5 above): `Button`/`ButtonLink` (`dark/light` **and** `light` colors) and `SoftButton`/`SoftButtonLink` all render `bg-frost text-olive-950` in dark mode, with two derived shades for interaction states:

| State            | Hex       |
| ---------------- | --------- |
| Base (`frost`)   | `#d1ecef` |
| Hover            | `#c0d9dc` |
| Active / pressed | `#b2c9cb` |

These two derived shades are **not** tokens — they're arbitrary values (`dark:hover:bg-[#c0d9dc]`, `dark:active:bg-[#b2c9cb]`) inline in `button.tsx`'s shared `darkFill` constant. If `frost` ever changes, regenerate them as roughly 8% and 15% darker mixes of the new base rather than guessing new hex values.

**Contrast:** near-black text (`olive-950`) on `#d1ecef` measures **15.81:1** — comfortably passes WCAG AAA. Checked and safe against every dark-mode surface `frost` text sits on: `olive-950` page background (15.81:1), the dark footer `#141b1a` (14.11:1), and the teal wallpaper/footer `#326367` (5.44:1).

**Known duplication:** `feature-tabs.tsx`'s inactive tab-bar labels used a one-off `dark:text-olive-300` that predated this token; it's been updated to `dark:text-frost` to match, but if you find another stray `dark:text-olive-300`/`dark:text-olive-400` elsewhere, it's almost certainly a pre-`frost` leftover and should be updated the same way.

## Dark mode pattern

Most tokens don't need a dark-mode override (olive scale already flips via `dark:` variants). The exceptions with a fixed light-mode value use:

- `--color-page` → `dark:bg-olive-950` (header, page background)
- `--color-orca-mist` → `dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]` (cards)
- Body text and button fills → `dark:text-frost` / `dark:bg-frost` (`#d1ecef`) — the one exception that has **no** light-mode equivalent at all; it's dark-mode-only by design (see #7 above)

Copy the `color-mix` expression verbatim rather than approximating a new dark shade, so every mist surface site-wide stays visually consistent.
