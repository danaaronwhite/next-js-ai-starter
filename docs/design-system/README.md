# Design system

Human and agent contract for UI in this repository.

## Principles

1. **Everything is a component.** Pages compose primitives. Named UI (Button, Field, Card) is a component with props — not ad hoc markup.
2. **Components are props-driven.** Variants and states are props or `cva` variants, not forked files.
3. **Quality bar.** Typed, accessible (keyboard, focus, labels, contrast), composable. Extend variants before creating parallel components.
4. **Tokens own the look.** Spacing, typography, radius, shadow, and color come from theme tokens. No arbitrary values in component files unless documented here as an exception.
5. **Colors come from theme files.** Components use semantic utilities (`bg-primary`, `text-muted-foreground`). They never hardcode palette names or hex/oklch values.

## Theme architecture

| Layer | Location | Examples |
| --- | --- | --- |
| Semantic tokens | `src/styles/themes/blue.css`, `src/styles/themes/grayscale.css` | `--primary`, `--background`, `--ring` |
| Tailwind mapping | `src/app/globals.css` `@theme inline` | `--color-primary` → `bg-primary` |
| Components | `src/components/**` | `bg-primary`, `rounded-md` (controls), `p-4` |

**Color themes:** `blue` (default), `grayscale` — set via `data-theme` on `<html>`.  
**Appearance:** light / dark / system — `class="dark"` via `next-themes`.  
**Typography:** [Archivo](https://fonts.google.com/specimen/Archivo) (headings) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (body) via `next/font/google`. Visual direction from [`design-system/next-js-ai-starter/MASTER.md`](../../design-system/next-js-ai-starter/MASTER.md) (ui-ux-pro-max).

Change palettes in the theme CSS files only. Do not add `color="grayscale"` props to components.

## Agent rules

| Situation | Action |
| --- | --- |
| Need existing UI | Import from registry. Do not fork. |
| One-off layout tweak | `className` for layout only. No inline colors. |
| Repeated visual difference | Add a variant/prop. Update doc, registry, gallery, tests. |
| Different interaction model | New component + doc + registry + gallery + tests. |
| Change component API/styles | Run registry `testing.onChange` rules. |
| Change tokens only | Visually verify Blue/Grayscale × light/dark on `/`. |

## Public API

Index: [`component-registry.json`](./component-registry.json)  
Component docs: [`components/`](./components/)  
Gallery catalog must include every public registry id: `src/components/gallery/catalog.ts`

## Adding a component

1. Implement under `src/components/ui/` or `src/components/`
2. Add `docs/design-system/components/<name>.md`
3. Add registry row + validate against schema
4. Add gallery section in `catalog.ts` and `gallery-page.tsx`
5. Run `pnpm test:e2e:update-snapshots` — Playwright adds `{galleryId}.png` automatically (see [`docs/testing/component-screenshots.md`](../testing/component-screenshots.md))
6. Add colocated `*.test.tsx`
7. Update this README if conventions change
