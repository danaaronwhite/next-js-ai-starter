# 03 — Blue and Teal themes

> **Adjust (Run 18):** Alternate theme is now **Grayscale** (`grayscale.css`). Teal was removed; this chunk’s intent (two named `data-theme` palettes) is unchanged.

**Goal:** Named color themes **Blue** (default) and **Teal**, each with light and dark, switch by `data-theme` (and `class="dark"` or the equivalent). Components still do not name colors.

**Depends on:** Chunk 02 exit check green.

**In scope:**

- Theme files or `[data-theme="blue"]` / `[data-theme="teal"]` blocks (FPD §8.4)
- Light and dark values for every required semantic token
- `next-themes` (or equivalent) provider in the root layout
- A crude, temporary way to force theme + mode so you can look at them (query param, temporary buttons, or HTML attributes). The real ThemeSwitcher is chunk 09.
- Types/helpers in `src/lib/theme.ts` (`"blue" | "teal"`, defaults)

**Out of scope:**

- Polished ThemeSwitcher UI
- Gallery
- Per-component docs
- Root README theme section (chunk 15, after the switcher exists)

**Implement:**

1. Map the same semantic token names for both palettes. Only values change.
2. Use one color space (OKLCH unless the scaffold uses another). Do not mix.
3. Wire the provider on `<html>` with `suppressHydrationWarning` as next-themes requires. Default: Blue, system light/dark (or light if you defer system).
4. Keep a tiny temporary control or documented manual attribute so you can preview all four combinations this chunk.
5. Grep: no palette literals in files that are not theme files.

**Verify:**

- [ ] Browser: Blue light — primary reads as product blue; text contrast holds
- [ ] Browser: Blue dark — same
- [ ] Browser: Teal light — primary reads as teal; neutrals still work
- [ ] Browser: Teal dark — same
- [ ] Focus ring (`ring`) is visible on a focusable throwaway control
- [ ] `pnpm build` succeeds

**Review:**

- Components would only need `bg-primary` — no `data-theme` branches in JSX
- Dark is a class/mode, not a third palette file with different token *names*
- Temporary preview control is obviously temporary (comment or `TODO` pointing at chunk 09)

**Exit check:**

- [ ] Four combinations visually accepted or notes written for chunk 09/11
- [ ] Default is Blue
- [ ] Ready to write the design-system contract

**Adjust:** If contrast fails, fix tokens now. If you want a different default, update FPD §18 before later chunks document “Blue.”
