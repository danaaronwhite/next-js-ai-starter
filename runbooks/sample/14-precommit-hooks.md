# 14 — Pre-commit hooks

**Goal:** After `pnpm install`, a Husky pre-commit hook runs lint and the Vitest suite. A dirty lint or failing unit test blocks the commit. Playwright does not run here.

**Depends on:** Chunks 12–13 (`pnpm lint` and `pnpm test` exist and are meaningful).

**In scope:**

- Husky via `prepare` script
- lint-staged for ESLint on staged files **or** a simple `pnpm lint && pnpm test` pre-commit (FPD §12.2)
- Confirm CI-safe `prepare` (missing `.git` / `HUSKY=0`)
- Do not document `--no-verify` as a workflow

**Out of scope:**

- Root README hook section (chunk 15) — behavior must already match what that section will say
- E2E on commit
- Changing ESLint rules unless a hook-blocking false positive is new

**Implement:**

1. `pnpm add -D husky lint-staged` as needed. `prepare: "husky"`.
2. `.husky/pre-commit` runs lint + `vitest run`.
3. If lint-staged is used, still run the unit suite once so tests cannot be skipped.
4. Do not add a skip-hooks npm script.

**Verify:**

- [ ] Fresh `pnpm install` leaves `.husky/pre-commit` in place
- [ ] A deliberate lint error blocks `git commit` (then revert)
- [ ] A deliberate test failure blocks `git commit` (then revert)
- [ ] A clean tree can commit (or would, if you try on a throwaway file)
- [ ] Playwright is not invoked by the hook

**Review:**

- Hook is pnpm-native, not leftover npm/npx from a blog post
- No extra format wars unless Prettier was already in the scaffold

**Exit check:**

- [ ] Quality gate is real
- [ ] Ready to write the public README

**Adjust:** If the suite is too slow for every commit, shrink what `pnpm test` runs *without* dropping component tests — do not remove the hook.
