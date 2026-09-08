# Colour System

This documents the site's color tokens and the usage rules established for the template-level theming pass (global background, header, footer, cards, and menu hover states). All tokens live in `src/app/globals.css` under the `@theme` block and are consumed as Tailwind utilities (`bg-*`, `text-*`, etc.) — never hard-code a hex value in a component.

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

Used for:

- The `Wallpaper` component (`src/components/elements/wallpaper.tsx`), which backs the homepage screenshot cards and the `/agentic-automation-platform` hero. `Wallpaper` no longer takes a `color` prop — it always renders this teal, in both light and dark mode.
- The site footer (`footer-with-newsletter-form-categories-and-social-icons.tsx`) in **light mode only**. In dark mode the footer uses a distinct, darker `#141b1a` instead: `bg-orca-teal-dark dark:bg-[#141b1a]`.

Because these surfaces are always a dark color regardless of theme, their text/icons are hard-set to white/`white/70`/`white/60` rather than switching with `dark:`.

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
