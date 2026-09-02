# Component screenshots (Playwright)

Playwright captures **isolated screenshots** of each gallery section on `/`. Baselines live next to the spec:

```text
tests/e2e/gallery-screenshots.spec.ts
tests/e2e/gallery-screenshots.spec.ts-snapshots/
  button-chromium-win32.png
  field-chromium-win32.png
  …
```

Snapshot file names match gallery catalog ids (`button`, `field`, `input`, …).

## Why

- Human-readable reference of how each component renders in the gallery
- Visual regression when tokens, variants, or gallery stories change
- New public components get a screenshot automatically once they are in the catalog

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm test:e2e:install` | One-time Chromium install (run before first e2e) |
| `pnpm test:e2e` | Runs behavior + screenshot specs (fails on visual diff) |
| `pnpm test:e2e:update-snapshots` | Regenerate baselines after intentional visual changes |
| `pnpm test:e2e:ui` | Debug failures in Playwright UI |

Screenshot specs use **Blue theme + light appearance** and `prefers-reduced-motion: reduce` for stable output.

## When adding a new public component

1. Implement the component and gallery stories on `/` (`GALLERY_CATALOG`, `gallery-page.tsx`).
2. Register in `docs/design-system/component-registry.json`.
3. Run `pnpm test:e2e:update-snapshots` — Playwright loops `GALLERY_CATALOG` and creates `{galleryId}.png` for the new section.
4. Commit the new PNG under `gallery-screenshots.spec.ts-snapshots/` with your PR.
5. On later visual tweaks, re-run update-snapshots and review the diff in the PR.

No separate per-component screenshot file is required — the catalog-driven spec picks up new ids automatically. You only regenerate baselines.

## When visuals change on purpose

Token edits, variant additions, or gallery layout changes may fail screenshot tests. That is expected:

1. Review the Playwright diff (UI mode or CI artifact).
2. If correct, run `pnpm test:e2e:update-snapshots`.
3. Commit updated PNGs with a short note in the PR.

## What not to snapshot

- One-off page layouts outside the gallery catalog
- Transient UI (toasts, open menus) — keep stories static in the gallery section
- Dark mode / Grayscale in this spec (behavior specs cover theme switching; extend with extra describes if you need theme matrices later)

## CI note

E2e (including screenshots) is **manual or CI**, not pre-commit. Keep the suite fast; snapshot count scales with catalog size.
