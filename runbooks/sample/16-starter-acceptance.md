# 16 — Starter acceptance

**Goal:** The FPD success criteria are true. This runbook is finished. The repo is a completed starter template, not a pile of half-connected chunks.

**Depends on:** Chunks 01–15.

**In scope:**

- Walk FPD §5 and §7.3, §8.7, §9.6, §10.4, §11.6, §12.4, §13.3, §13.5
- Fix drift (registry vs gallery vs tests vs README)
- Optional small CI workflow if it is still listed as a fast follow and you choose to add it
- Mark this runbook complete in the sample README status if you added one

**Out of scope:**

- New product features
- Re-opening chunk scope “while we’re here”

**Implement:**

1. Fresh-clone mindset: `pnpm install`, `pnpm dev`, open `/`.
2. Switch Blue/Teal and light/dark on the gallery.
3. `pnpm lint`, `pnpm test`, `pnpm test:e2e`, `pnpm build`.
4. Grep `src/components` for raw hex / rgb / hsl / oklch (theme files excluded).
5. Confirm every public registry id appears in the gallery catalog.
6. Confirm pre-commit still runs lint + tests.
7. Confirm README Runbooks + documentation sections are accurate.
8. Confirm `AGENTS.md`, `CLAUDE.md` → `AGENTS.md`, and `docs/documentation-policy.md` match the repo.
9. Update the FPD status from “Draft — ready for implementation” to “Implemented” (and date) if the criteria hold.

**Verify:**

- [ ] Hiring-manager path: clone → README → gallery in one sitting
- [ ] Agent path: design-system README + registry + one component doc explain reuse/extend/test
- [ ] Theme switch needs no component edits
- [ ] Each public component has implementation, doc, registry row, gallery story, tests
- [ ] Pre-commit blocks lint/test failures
- [ ] `docs/testing/testing-strategy.md` matches commands
- [ ] `AGENTS.md` and documentation policy are current

**Review:**

- Whole-repo skim: leftover TODOs from chunks 03–09, throwaway routes, unused deps
- Sample runbook still describes what we did (if chunk names or paths shifted, fix the sample README table)

**Exit check:**

- [ ] FPD success criteria all true
- [ ] This sample runbook is done
- [ ] Next featureset requires a new FPD and a new `runbooks/<slug>/` — do not append product work here

**Adjust:** File leftover UX nits as a *new* tiny runbook or issues. Do not silently start an AI feature.
