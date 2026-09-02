# Sample runbook — starter foundation

This folder is the **sample**: a real runbook, not a fictional template. It takes this repository from **docs only** (the FPD and this runbook) to the **completed Next.js AI starter** described in [`docs/feature-planning/feature-planning-document.md`](../../docs/feature-planning/feature-planning-document.md).

Later featuresets get their own folder (`runbooks/<feature-slug>/`) that copies this shape: a README index plus numbered chunk files. The project README must have a **Runbooks** section that points here.

---

## Why runbooks exist

Large featuresets fail when they ship as one dump:

- UI and UX never get a real look until everything is “done.”
- Agent output arrives as a wall of files. Review becomes skim-or-accept.
- Tests land last, or not at all.
- Scope creeps because nobody can mark a chunk complete.

An FPD describes the whole feature. A runbook is the **sequence of testable chunks**. After each chunk you can change the UI, reject a pattern, or rewrite an API before the next chunk copies the mistake.

---

## How to use this sample

1. Read this README and the FPD for context. Do **not** implement the whole FPD in one prompt.
2. Point the agent at **exactly one** numbered file, starting with [`01-scaffold-nextjs.md`](./01-scaffold-nextjs.md).
3. When that chunk’s exit check is green: test, look at the UI if the chunk is visual, review the diff, note adjustments.
4. Update later chunks or the FPD if the plan changed. Update relevant `docs/`, READMEs, `AGENTS.md`, and `CLAUDE.md` per [`docs/documentation-policy.md`](../../docs/documentation-policy.md).
5. Start the next numbered file. Repeat through [`16-starter-acceptance.md`](./16-starter-acceptance.md).

Do not stack untested chunks. Do not skip the UI/UX gate on visual work.

---

## Starting state

**Implemented.** The starter was built via runs 01–16. See [`run-log.md`](./run-log.md).

Present: Next.js app, design system, gallery at `/`, tests, hooks, README, registry, agent docs.

---

## Chunk sequence

| # | File | Demo when done |
| --- | --- | --- |
| 01 | [Scaffold Next.js](./01-scaffold-nextjs.md) | `pnpm dev` shows the default app; existing docs still on disk |
| 02 | [shadcn + token wiring](./02-shadcn-and-token-wiring.md) | `bg-primary` and tokens resolve; no custom palettes yet |
| 03 | [Blue and Teal themes](./03-blue-and-teal-themes.md) | Both palettes × light/dark can be forced and seen |
| 04 | [Design-system principles](./04-design-system-principles.md) | `docs/design-system/README.md` is the contract |
| 05 | [Button](./05-button.md) | Button variants exist; first primitive is reviewable |
| 06 | [Form controls](./06-form-controls.md) | Label, Input, Textarea, Field |
| 07 | [Choice controls](./07-choice-controls.md) | Select, Checkbox, Switch |
| 08 | [Surfaces](./08-surfaces.md) | Card, Badge, Alert |
| 09 | [Theme switcher](./09-theme-switcher.md) | User can change Blue/Teal and light/dark |
| 10 | [Registry + component docs](./10-registry-and-component-docs.md) | Every public component is documented and registered |
| 11 | [Gallery home page](./11-gallery-home-page.md) | `/` is the custom Storybook |
| 12 | [Unit and component tests](./12-unit-and-component-tests.md) | `pnpm test` covers public components |
| 13 | [Testing strategy + e2e](./13-testing-strategy-and-e2e.md) | Strategy doc + Playwright gallery specs |
| 14 | [Pre-commit hooks](./14-precommit-hooks.md) | Lint + unit tests block a bad commit |
| 15 | [Project README](./15-project-readme.md) | GitHub on-ramp, including Runbooks + theme switch |
| 16 | [Starter acceptance](./16-starter-acceptance.md) | FPD success criteria; starter is complete |

---

## Chunk file shape (copy for later features)

Each numbered file uses:

| Section | Purpose |
| --- | --- |
| **Goal** | One sentence. What exists when this chunk is done. |
| **In scope / Out of scope** | Hard edges so the agent does not swallow the next chunk. |
| **Depends on** | Previous exit checks that must already be green. |
| **Implement** | Ordered steps. Points at the FPD; does not rewrite it. |
| **Verify** | Commands plus a manual UI/UX checklist when the chunk is visual. |
| **Review** | What a human should read in this diff only. |
| **Exit check** | All true → next file. Any false → fix this chunk. |
| **Adjust** | What to change in later chunks or the FPD before continuing. Note any required `docs/`, README, or `AGENTS.md` updates. |
| **Secrets** | Env vars or third-party keys needed to verify this chunk; or explicit "none". Never commit values. |

After each run, the agent adds a **`Secrets needed`** section to `run-log.md` and returns instructions for the engineer to add keys before the next chunk (see README **What about when secrets are needed?**).

---

## The loop

```text
FPD (the feature)
  → this folder (the sequence)
      → chunk N: implement → test → review UI/UX → review code → update docs → adjust
      → chunk N+1
  → feature is done when chunk 16’s exit check is green
```

Agents get **one chunk file** per prompt, not this whole folder and not the entire FPD as the implementation spec.

---

## After this sample is finished

New product work (auth, AI chat, and so on) needs:

1. A new FPD under `docs/feature-planning/`.
2. A new folder `runbooks/<feature-slug>/` with the same README-plus-numbered-chunks shape as this sample.
