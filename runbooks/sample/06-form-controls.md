# 06 — Form controls

**Goal:** Label, Input, Textarea, and a presentational Field (label + control + description + error) exist and compose without a form library.

**Depends on:** Chunk 05 (same quality bar as Button).

**In scope:**

- shadcn `label`, `input`, `textarea`
- A small `Field` (or equivalent) that wires `htmlFor`, description, and `aria-invalid` / error text
- Temporary preview: default, disabled, error, with label, on the same throwaway surface as Button
- FPD recommendation: **no** react-hook-form / zod in v1

**Out of scope:**

- Select, Checkbox, Switch (chunk 07)
- Real submit/validation logic
- Registry docs (chunk 10)

**Implement:**

1. Add the primitives. Compose Field rather than baking label into Input.
2. Error state is accessible (`aria-invalid`, error associated with the control).
3. Tokens only. Shared spacing from the scale, not magic pixels.
4. Preview at least: Input empty/filled/disabled/error; Textarea; Label+Field.

**Verify:**

- [ ] Browser: click label focuses the input
- [ ] Browser: error text is announced/associated, not color-only
- [ ] Browser: both themes × both modes
- [ ] Disabled fields look disabled and are not focusable as editable
- [ ] `pnpm build` succeeds

**Review:**

- Field is composition, not a mega-Input with 20 props
- Native attributes still work (`type`, `autoComplete`, `rows`)
- No business logic

**Exit check:**

- [ ] Four pieces feel like one system next to Button
- [ ] Ready for choice controls

**Adjust:** If Field’s API is awkward, fix it now before Select lands inside it.
