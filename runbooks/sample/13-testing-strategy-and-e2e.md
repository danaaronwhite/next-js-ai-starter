# 13 — Testing strategy and e2e

**Goal:** `docs/testing/testing-strategy.md` matches the repo, and Playwright covers the gallery route (load, nav landmarks, theme attributes).

**Depends on:** Chunks 11–12.

**In scope:**

- `docs/testing/testing-strategy.md` — pyramid, what belongs where, agent on-change contract (FPD §11.4), commands
- Playwright install + config with `webServer` against this Next app
- Scripts: `pnpm test:e2e`, `pnpm test:e2e:ui`
- `tests/e2e/gallery.spec.ts` (or equivalent): `/` landmark/title, headings for Button, Input, Card, `data-theme` on color switch, dark class on mode switch
- Optional: Select keyboard path if chunk 12 deferred it
- `pnpm typecheck` script if not already present

**Out of scope:**

- Pre-commit (chunk 14) — e2e must **not** go on the hook
- CI workflow optional (FPD open question); add only if it stays small
- Visual-regression SaaS

**Implement:**

1. Write the strategy doc so it describes Vitest and Playwright as they actually run.
2. Playwright should boot `pnpm dev` or `pnpm build && pnpm start` in a documented way. Prefer a production-like server if it is not painful.
3. Assert attributes and roles, not screenshots, for v1.
4. Copy the agent testing contract into the strategy doc.

**Verify:**

- [ ] `pnpm test` still green
- [ ] `pnpm test:e2e` green locally
- [ ] Strategy doc commands match `package.json`
- [ ] E2E does not require a hand-started server if config can start one

**Review:**

- Doc is honest about the RSC / Playwright boundary
- Specs are short and stable (theme attributes, not copy that will churn)
- No e2e on every variant already covered in RTL

**Exit check:**

- [ ] All three layers have at least one real test
- [ ] Ready to gate commits

**Adjust:** If `webServer` needs env vars, add them to `.env.example` in this chunk.
