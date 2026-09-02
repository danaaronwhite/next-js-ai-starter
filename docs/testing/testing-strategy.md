# Testing strategy

## Pyramid

```text
        / e2e (Playwright)  \     gallery route, theme attributes, async RSC
       / integration (Vitest) \   Field composition, catalog
      / unit + component (Vitest) \  utils, theme helpers, Button, Field
```

| Layer | Tool | Scope |
| --- | --- | --- |
| Unit | Vitest | Pure helpers (`cn`, theme ids) |
| Component | Vitest + RTL | Button, Field, synchronous UI |
| Integration | Vitest + RTL | Label + Input + error |
| E2E | Playwright | `/` gallery, `data-theme`, dark class, **per-component gallery screenshots** |

**Rule:** async Server Components belong in Playwright, not Vitest.

## Component screenshots

Each public gallery section has an isolated Playwright snapshot (`tests/e2e/gallery-screenshots.spec.ts`), driven by `GALLERY_CATALOG`.

**When adding a public component:** gallery entry + registry → run `pnpm test:e2e:update-snapshots` → commit new baseline PNGs.

Full workflow: [`component-screenshots.md`](./component-screenshots.md).

## Playwright first-time setup

`@playwright/test` is installed with dev dependencies, but **browser binaries are not**. Before the first `pnpm test:e2e`:

```bash
pnpm exec playwright install chromium
```

Or: `pnpm test:e2e:install` (same command via `package.json` script).

Re-run after upgrading `@playwright/test` if the CLI prompts for a browser update.

## Commands

| Script | Purpose |
| --- | --- |
| `pnpm test` | Vitest (CI + pre-commit) |
| `pnpm test:watch` | Local TDD |
| `pnpm test:e2e` | Playwright against production server |
| `pnpm test:e2e:install` | One-time Chromium install for Playwright |
| `pnpm test:e2e:ui` | Playwright UI mode |
| `pnpm test:e2e:update-snapshots` | Regenerate gallery component screenshot baselines |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |

Pre-commit runs `lint-staged` + `pnpm test`. E2E is manual/CI only.

`pnpm lint` targets application code (`src/`, `tests/`, root configs). `.cursor/` agent skills are excluded in `eslint.config.mjs`.

## Agent on-change contract

1. Component file changed → run its unit tests + importer tests
2. Props/variants/a11y changed → update doc, registry, gallery, tests together
3. Token/theme files changed → gallery e2e theme specs
4. Gallery/catalog changed → gallery e2e + screenshot baselines if visuals changed
5. Hooks/CI changed → lint + full unit suite

Do not skip or disable tests to land a change.

## Layout

- Colocated tests: `src/**/*.test.{ts,tsx}`
- E2E: `tests/e2e/` (behavior + `gallery-screenshots.spec.ts` per-component snapshots)
- Config: `vitest.config.ts`, `playwright.config.ts`
