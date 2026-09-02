# 09 — Theme switcher

**Goal:** A real ThemeSwitcher replaces the temporary preview control. Users can set color theme (Blue | Teal) and mode (Light | Dark | System if implemented). Preference persists.

**Depends on:** Chunks 03 and 05–08 (it should be built from Button, Select, or Toggle-style controls we already have — not a new visual language).

**In scope:**

- `src/components/theme-switcher.tsx` (name may vary; keep it consistent)
- Persistence via `next-themes` / `localStorage`
- Mount the switcher on the current page chrome (it will move into the gallery shell in chunk 11)
- Remove or gut the crude chunk-03 forcer

**Out of scope:**

- Full gallery / Storybook layout
- README “Changing the color theme” (chunk 15) — but keep the *behavior* README-accurate
- Adding a third palette

**Implement:**

1. Compose existing primitives. Do not invent a unique switcher skin.
2. Color theme and light/dark are separate controls.
3. Accessible names: “Color theme”, “Appearance”, etc.
4. Default remains Blue + system (or whatever chunk 03 settled).
5. Client component only for this control; layout stays a Server Component.

**Verify:**

- [ ] Browser: switch Blue ↔ Teal; primary and surfaces update without full reload breakage
- [ ] Browser: Light / Dark / System; `class="dark"` (or documented equivalent) matches
- [ ] Reload: preference persists
- [ ] Keyboard only
- [ ] No unstyled flash worse than next-themes normally allows
- [ ] `pnpm build` succeeds

**Review:**

- Switcher does not hardcode blue/teal hex
- Theme ids live in `src/lib/theme.ts`
- Temporary chunk-03 UI is gone

**Exit check:**

- [ ] Switcher is good enough to sit in the gallery header
- [ ] Ready to document and register all public components

**Adjust:** If persistence keys or attribute names changed, write them down for chunks 13 and 15 (e2e + README).
