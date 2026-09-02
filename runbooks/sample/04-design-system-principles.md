# 04 — Design-system principles

**Goal:** `docs/design-system/README.md` exists and is the human + agent contract for components and tokens, before we add more UI.

**Depends on:** Chunk 03 exit check green (so the README can name real theme files and token names).

**In scope:**

- `docs/design-system/README.md` covering FPD §8.2 and §9.5.2
- Pointers to theme files, upcoming component docs folder, and the registry (to be filled in chunk 10)
- Closed scales (space, type, radius, focus) as they exist after shadcn init

**Out of scope:**

- Per-component markdown (chunk 10, after components exist)
- `component-registry.json` (chunk 10)
- New visual components

**Implement:**

1. Write the five principles: everything is a component; props-driven; quality bar; tokens own the look; colors come from the theme file.
2. Document agent rules: reuse vs `className` vs new variant vs new component; tests on change (FPD table in §9.5.2).
3. Document how Blue/Teal and light/dark work, and that components never take `color="teal"`.
4. List the actual token file paths from chunks 02–03.
5. State that a component is not public until it has implementation, docs, registry row, gallery story, and tests (later chunks).

**Verify:**

- [ ] File exists at `docs/design-system/README.md`
- [ ] An agent could read only this file and know not to hardcode colors
- [ ] Paths match the repo (no stale FPD-only paths)

**Review:**

- Prose is specific to this repo, not generic shadcn marketing
- Rules are enforceable (“grep for hex in `src/components`”) not slogans

**Exit check:**

- [ ] Contract is accurate
- [ ] Ready to add the first primitive (Button) against these rules

**Adjust:** If token paths in this README disagree with the FPD, update the FPD documentation tree in the same change.
