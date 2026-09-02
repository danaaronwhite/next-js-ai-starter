# 11 — Gallery home page

**Goal:** `/` is a custom Storybook: every public registry component, real interactive examples, in-page nav, ThemeSwitcher in the chrome. Temporary previews from chunks 05–09 are gone.

**Depends on:** Chunks 09–10.

**In scope:**

- `src/app/page.tsx` and gallery helpers (`src/components/gallery/`)
- Catalog that tracks public registry ids (typed catalog + sync checklist, or one imported source — FPD §10.2)
- Sections with variants/states: default, disabled, error, sizes, destructive, etc.
- Skip link or sticky toc / sidebar
- ThemeSwitcher in the header
- Server Component shell; client islands for interactive examples

**Out of scope:**

- Official Storybook
- Vitest/Playwright (chunks 12–13) — but build something those tests can target (headings, `data-theme`)
- Marketing landing page

**Implement:**

1. Replace the default Next page and all throwaway `/dev` or homepage previews.
2. Drive sections from the catalog. Missing a public component is a bug.
3. Examples import real components. Captions can pull purpose from docs/registry copy, kept short.
4. Keyboard: skip to content; nav jumps to section headings.
5. Use tokens and existing components for chrome. No new palette.

**Verify:**

- [ ] Browser: `/` — every public component has a section
- [ ] Browser: in-page nav jumps correctly
- [ ] Browser: ThemeSwitcher changes the whole page (Blue/Teal, light/dark)
- [ ] Browser: forms, Select, Button, Card stories are usable, not static images
- [ ] Keyboard through nav and a couple of stories
- [ ] `pnpm build` succeeds

**Review:**

- Diff is gallery + deleted temporaries
- Catalog cannot silently drop a registry id (comment or upcoming test in chunk 12)
- Layout is a portfolio hero: readable, not cramped, not a marketing splash

**Exit check:**

- [ ] You would show this URL to a hiring manager
- [ ] UI/UX notes (spacing, type, nav) applied or written as follow-ups *in this gallery*, not “later someday”
- [ ] Ready for automated tests

**Adjust:** If the gallery needs a new chrome component (e.g. `GalleryNav`), add a registry row and a short doc in this chunk — do not leave an unregistered public component.
