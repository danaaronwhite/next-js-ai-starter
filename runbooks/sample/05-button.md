# 05 — Button

**Goal:** The first public primitive exists: a props-driven Button with shadcn variants and sizes, built only from tokens.

**Depends on:** Chunks 02–04.

**In scope:**

- `pnpm dlx shadcn@latest add button` (or equivalent)
- Typed exports, `cva` variants: default, secondary, outline, ghost, destructive, link
- Sizes: sm, default, lg, icon
- Temporary render of all variants on the current home page **or** a throwaway `/dev/button` route so you can look at them (remove in chunk 11)
- No full component doc or registry yet (chunk 10) — keep the API stable enough to document later

**Out of scope:**

- Other primitives
- Gallery
- Tests (chunk 12) — unless you want a single smoke test; not required
- `docs/design-system/components/button.md`

**Implement:**

1. Add the shadcn Button. Do not fork a second `ButtonPrimary`.
2. Extend native button props. Support `asChild` if shadcn ships it.
3. Style only with semantic utilities. No hex, no `blue`, no `teal` in the file.
4. Put a small preview of variants/sizes/disabled on a temporary surface so chunk 05 has a UI gate.
5. Follow `docs/design-system/README.md`. If the generated Button fights the contract, wrap or edit it — we own the file.

**Verify:**

- [ ] Browser: every variant and size, plus disabled
- [ ] Browser: Blue and Teal, light and dark — contrast and focus ring
- [ ] Keyboard: Tab to a button, activate with Enter/Space
- [ ] Icon size has an accessible name in the preview (or is not used nameless)
- [ ] `pnpm build` succeeds

**Review:**

- One component, variants as props
- `className` is for merge/layout, not a hidden third palette
- Temporary preview is clearly temporary

**Exit check:**

- [ ] Button API looks like something we will document in chunk 10
- [ ] UI accepted or follow-ups listed for chunk 11 (gallery)

**Adjust:** If you needed a variant the FPD did not list, add it to the FPD v1 table before other components copy a weaker API.
