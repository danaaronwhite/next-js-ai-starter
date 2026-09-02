# 12 — Unit and component tests

**Goal:** Vitest + React Testing Library run via `pnpm test`. Every public component has the tests the registry promised. At least one unit test and one integration-style compose test exist.

**Depends on:** Chunks 10–11 (registry paths and gallery catalog are real).

**In scope:**

- Vitest config (jsdom, React plugin, `@/*`)
- Scripts: `pnpm test` (`vitest run`), `pnpm test:watch`
- Colocated `*.test.tsx` next to components (FPD recommendation)
- Tests per FPD §11.3: default render, variants/sizes, disabled/error a11y, critical keyboard where jsdom allows
- Integration: Field (label+input+error) and/or Card+Button; catalog ids ⊆ public registry ids if easy
- `cn` or theme helper unit test so the unit layer is not empty

**Out of scope:**

- Playwright (chunk 13)
- Husky (chunk 14)
- Testing-strategy.md (chunk 13, so it can describe what actually runs)
- Forcing Select’s full portal flow in jsdom — note “covered in e2e” in the registry if you skip it

**Implement:**

1. Add Vitest the Next 16–typical way. Do not add Jest.
2. Write tests that match registry `testing.unit` paths. If you change a path, update the registry in this chunk.
3. Prefer roles and accessible names over test ids.
4. Do not test async Server Components here.

**Verify:**

- [ ] `pnpm test` is green
- [ ] Every public component listed in the registry has a test file that exists
- [ ] A deliberate failing assertion fails the command (sanity: then revert)
- [ ] `pnpm lint` still clean if tests introduced new files

**Review:**

- Tests assert behavior, not class-string snapshots of all of Tailwind
- Integration test is more than “it renders”
- No skipped tests without a written e2e follow-up

**Exit check:**

- [ ] Fast suite is real, not a config husk
- [ ] Ready to add e2e + the strategy document

**Adjust:** If jsdom cannot handle a control, record that in the registry and in chunk 13’s implement list.
