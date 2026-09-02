# Documentation policy

This repo treats documentation as part of the deliverable, not a follow-up. The rule applies to human work and agent work, including runbook chunks.

## When documentation must change

Update docs in the **same change** as the code (or before marking the task complete):

| Work type | Update |
| --- | --- |
| New or changed feature | FPD or feature doc under `docs/feature-planning/` |
| UI / design system | `docs/design-system/` (README, component docs, `component-registry.json`) |
| Tests or quality gates | `docs/testing/testing-strategy.md` |
| Runbook chunk completed | Chunk **Adjust** section; **Secrets needed** in `run-log.md`; later chunks or FPD if the plan shifted |
| Integration requiring keys | `.env.example` variable names only (never values); README/run-log engineer instructions |
| User-facing behavior | Root `README.md` and any affected folder README |
| Agent workflow or repo layout | `AGENTS.md` (and confirm `CLAUDE.md` still points to it) |

## Files agents and contributors must keep current

- **`docs/`** — Source of truth for planning, design system, testing, and process
- **`README.md`** (root) — On-ramp for humans; must stay accurate
- **Folder READMEs** — e.g. `runbooks/sample/README.md`, future `docs/design-system/README.md`
- **`AGENTS.md`** — Instructions for coding agents working in this repo
- **`CLAUDE.md`** — Short pointer to `AGENTS.md` (single source for agent guidance)

## Cursor rule

The always-on project rule lives at:

```text
.cursor/rules/documentation-on-change.mdc
```

It enforces this policy in Cursor sessions.

## Definition of done

Work is complete only when:

1. Relevant `docs/` files reflect what was built
2. READMEs match behavior and commands
3. `AGENTS.md` describes how to work here today
4. `CLAUDE.md` references `AGENTS.md`

## Related

- Feature planning: [`docs/feature-planning/feature-planning-document.md`](./feature-planning/feature-planning-document.md)
- Runbook sample: [`runbooks/sample/README.md`](../runbooks/sample/README.md)
