# 07 — Choice controls

**Goal:** Select, Checkbox, and Switch exist, labelled, and keyboard-usable. Switch is for immediate on/off; Checkbox is for boolean form choices.

**Depends on:** Chunk 06 (Label/Field patterns).

**In scope:**

- shadcn `select`, `checkbox`, `switch` (and private deps such as popover if generated)
- Labelled examples; Select with a few options
- Temporary preview on the throwaway surface
- Registry note later: extra primitives used only as Select internals may be `public: false`

**Out of scope:**

- Card / Badge / Alert
- Playwright coverage (chunk 13) — if Select is painful in jsdom we accept that later
- Multi-select, combobox

**Implement:**

1. Add the three components. Keep their interaction models distinct in the preview captions.
2. Every control has an accessible name.
3. Select: keyboard open/choose/close in the browser (this is the real test).
4. Tokens only; popover surfaces use `popover` / `border` tokens.

**Verify:**

- [ ] Browser: Checkbox + label click/space
- [ ] Browser: Switch + label, immediate toggle
- [ ] Browser: Select mouse and keyboard (arrows, Enter, Escape)
- [ ] Browser: disabled states
- [ ] Browser: Blue/Teal × light/dark — menu contrast
- [ ] `pnpm build` succeeds

**Review:**

- Private Select parts are not treated as public API
- Switch is not styled as a checkbox
- Focus order in the preview is sane

**Exit check:**

- [ ] Choice controls accepted or UX notes written for the gallery
- [ ] Ready for surfaces

**Adjust:** If Select a11y is weak, fix or wrap before documenting it as `stable` in chunk 10.
