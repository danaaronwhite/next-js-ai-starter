# 08 — Surfaces (Card, Badge, Alert)

**Goal:** Composed surfaces exist: Card (header/title/description/content/footer), Badge, and Alert (info, success, warning, destructive).

**Depends on:** Chunks 05–07 so Card can host a Button and a Field in the preview.

**In scope:**

- shadcn `card`, `badge`, `alert`
- Alert variants that match the FPD (map shadcn’s default set; add a success/warning variant if missing and still token-driven)
- Temporary preview: Card with a short form + Button; Badge row; one Alert per tone

**Out of scope:**

- ThemeSwitcher
- Gallery layout
- Toast / dialog

**Implement:**

1. Add the three components. Card is compound parts, not one blob.
2. Badge variants stay semantic (`default`, `secondary`, `outline`, `destructive`) — not color names.
3. Alert must not be color-only: icon or title + text.
4. Compose Button/Field inside the Card preview to prove the system stacks.

**Verify:**

- [ ] Browser: Card hierarchy is readable (title vs body vs footer)
- [ ] Browser: Alerts are distinguishable in both modes (not red-on-red)
- [ ] Browser: Badges do not collide with Button (size and radius)
- [ ] Browser: Blue/Teal × light/dark
- [ ] `pnpm build` succeeds

**Review:**

- Card parts are exported and named
- No new color tokens invented for “success” that bypass the theme files — if you add a success token, add it to both themes in this chunk

**Exit check:**

- [ ] Surfaces look like one family with the primitives
- [ ] Ready for the real theme switcher

**Adjust:** If Alert tones need extra semantic tokens, add them to Blue and Teal now and mention them in `docs/design-system/README.md`.
