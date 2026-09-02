# Agent instructions

Guidance for coding agents working in this repository.

## Project

**Next.js AI Starter** — a **methodology** for AI-assisted delivery (FPD → runbooks → reviewable chunks → living docs), plus a production-shaped Next.js foundation.

Read the **[README](./README.md)** first — especially **Pivot this starter into your project**. Current codebase: gallery at `/`, design system, tests, Husky.

## Before you implement

1. **FPD** — [`docs/feature-planning/`](./docs/feature-planning/). No feature without a planning document.
2. **Runbook** — one numbered chunk at a time under `runbooks/<feature-slug>/`. Log runs in `run-log.md`.
3. **Design system** — [`docs/design-system/README.md`](./docs/design-system/README.md) + registry
4. **Testing** — [`docs/testing/testing-strategy.md`](./docs/testing/testing-strategy.md)

Do not implement an entire FPD or runbook folder in one pass. The engineer reviews each chunk before the next.

## Secrets (required at end of each chunk)

Never commit secret values. When a chunk finishes:

1. Add **Secrets needed** to the run’s `run-log.md` entry (variable names, whether required now or later, engineer action).
2. Return clear instructions for what the engineer must add to `.env.local` (or secrets manager) to verify this step or integration.
3. If none: write `None for this chunk.`

See README **What about when secrets are needed?**

## Documentation on change (required)

Update in the same change:

| Change | Update |
| --- | --- |
| Features | `docs/feature-planning/` |
| UI/components | `docs/design-system/` |
| Tests/hooks | `docs/testing/` |
| User-facing | `README.md` |
| Agent workflow | `AGENTS.md` |

Policy: [`docs/documentation-policy.md`](./docs/documentation-policy.md)  
`CLAUDE.md` → this file only.

## Commands

```bash
pnpm dev          # gallery at /
pnpm test         # Vitest
pnpm test:e2e:install  # once per machine — Chromium for Playwright
pnpm test:e2e     # Playwright (behavior + component screenshots)
pnpm lint
pnpm typecheck
```

## Key paths

```text
src/components/ui/          shadcn primitives
src/components/gallery/     gallery catalog + page
src/styles/themes/          blue.css, grayscale.css
docs/design-system/         contract + registry
runbooks/sample/            starter runbook + run-log
```

## Conventions

- Props-driven components; semantic tokens only (Blue/Grayscale via `data-theme`)
- Reuse registry components; extend variants before forking
- Async RSC → Playwright; sync UI → Vitest + RTL
- New public gallery component → add catalog entry, then `pnpm test:e2e:update-snapshots` (see `docs/testing/component-screenshots.md`)
