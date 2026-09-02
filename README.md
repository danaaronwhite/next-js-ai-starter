# Next.js AI Starter

**This repo is not just a starter codebase — it is a methodology for building real projects with AI assistance while keeping the engineer in the loop.**

You get a production-shaped Next.js app (design system, gallery, tests, hooks). More importantly, you get a repeatable process: plan in writing, execute in reviewable chunks, keep documentation as the source of truth, and let agents work inside guardrails instead of freewheeling across the whole codebase.

The code is the proof. The process is the product.

**Live preview:** [next-js-ai-starter.vercel.app](https://next-js-ai-starter.vercel.app/) — component gallery, theme switcher, and design tokens in the browser.

---

## The methodology

```text
Feature Planning Document (FPD)     ← what & why (source of truth)
        ↓
Project Documentation (docs/)       ← active source of truth: design system, testing, policy
        ↓
Runbook (numbered chunks)           ← how, one digestible slice at a time
        ↓
Implement → test → review UI/UX → review diff → update docs → next chunk
        ↓
Living documentation + guardrails   ← registry, policies, AGENTS.md, pre-commit
```

| Piece | Role |
| --- | --- |
| **[Feature Planning Documents](docs/feature-planning/)** | Every feature starts here. Goals, non-goals, stack, acceptance criteria. If it is not in an FPD, it is not ready to build. |
| **[Project Documentation](docs/)** | Living source of truth for how the project works: design system, testing strategy, documentation policy, and feature plans. Updated whenever code or process changes. |
| **[Runbooks](runbooks/)** | Break large work into chunks an engineer can actually review. One prompt, one demoable slice, one test pass — then you steer before the next chunk. |
| **[Documentation policy](docs/documentation-policy.md)** | Docs are part of the deliverable. Code and docs change together — including README, `AGENTS.md`, and design-system registry. |
| **Guardrails** | Component registry, theme tokens, testing strategy, Cursor rules (`.cursor/rules/`), Husky pre-commit. Agents inherit constraints; engineers approve output. |
| **Engineer review** | You are not prompting “build the app.” You are approving chunk N: Does the UI feel right? Is the diff readable? Did docs and tests move with the code? |

AI accelerates implementation. **You** own architecture, taste, and merge decisions.

---

## Pivot this starter into your project

The sample runbook ([`runbooks/sample/`](runbooks/sample/)) built *this* template. Your product is a **new FPD + new runbook** — not a single giant agent prompt.

### Step 1 — Rewrite the Feature Planning Document

**Always start here.** Copy or replace [`docs/feature-planning/feature-planning-document.md`](docs/feature-planning/feature-planning-document.md) with your product’s FPD (or add `docs/feature-planning/<your-product>.md` and link it from the README).

Define problem, goals, non-goals, stack changes, design-system impact, testing expectations, and success criteria. Do not write application code until the FPD reflects *your* project.

**Sample prompt:**

```text
I am pivoting this repo from the generic Next.js AI Starter into [YOUR PRODUCT NAME].

Read docs/feature-planning/feature-planning-document.md as a template only.

Create docs/feature-planning/[your-product-slug].md that describes:
- Problem statement and target users
- Goals and explicit non-goals
- What we keep from the starter (design system, testing pyramid, runbooks)
- What changes (routes, features, data layer, branding/themes)
- Success criteria and risks

Do not implement code yet. Output the FPD only, then list open questions for me to answer.
```

### Step 2 — Update project documentation for the pivot

Align every “source of truth” doc with the new direction **before** chunk 1 of implementation.

**Sample prompt:**

```text
Using docs/feature-planning/[your-product-slug].md as the contract, update project documentation for the pivot:

1. README.md — new one-liner, methodology section stays, replace starter-specific copy with our product; keep runbook/FPD instructions
2. AGENTS.md — current state, key paths, conventions for this product
3. docs/design-system/README.md — note any new components or token/branding rules
4. docs/testing/testing-strategy.md — only if test scope changes

Do not write feature code. Docs only. Flag any FPD gaps you find.
```

### Step 3 — Create your runbook (numbered chunks)

Copy the shape of [`runbooks/sample/`](runbooks/sample/): a README index plus `01-…`, `02-…` files. Each chunk needs goal, scope, implement steps, verify (commands + manual UI check), review checklist, exit check, and adjust.

**Sample prompt:**

```text
Read docs/feature-planning/[your-product-slug].md.

Create runbooks/[your-product-slug]/README.md and numbered chunks 01, 02, 03…
Each chunk must be one reviewable slice: demoable when done, testable before the next chunk.
Map chunks to FPD phases. Include UI/UX and code-review gates.
Each chunk file must include a **Secrets** section (env vars / third-party keys needed to verify that step, or "none").

Do not implement yet — runbook files only.
```

### Step 4 — Execute one chunk at a time

Point the agent at **one** runbook file. You verify, review the diff, adjust UI/UX, update docs if the plan shifted, then open the next chunk.

**Sample prompt:**

```text
Execute runbooks/[your-product-slug]/01-[chunk-name].md only.

Follow AGENTS.md, docs/design-system/, and docs/testing/testing-strategy.md.
When done: run verify steps, update run-log.md (include **Secrets needed** — or "None for this chunk"),
update any docs that changed, and return instructions for any keys I must add to .env.local before the next chunk.
Stop after this chunk — do not start 02.
```

Log each run in `runbooks/<your-product-slug>/run-log.md` (see [`runbooks/sample/run-log.md`](runbooks/sample/run-log.md)).

### Step 5 — Keep documentation active

After every chunk (or any user-directed change):

- Update relevant files under `docs/`
- Update README / `AGENTS.md` if behavior or workflow changed
- Update design-system registry and component docs when UI changes
- Never merge a chunk whose docs or tests lag behind the code

---

## What about when secrets are needed?

Integrations (APIs, auth providers, AI models, webhooks) need keys the agent must **not** invent or commit. Handle that inside the same runbook workflow — not as a surprise after five chunks.

### When you write the runbook

Tell the agent to build a **sequential runbook** for the feature: numbered chunks, each testable on its own. In every chunk file, add a **Secrets** subsection that states:

- Which env vars or third-party keys this chunk needs (if any)
- Whether the chunk can be verified without them (mocked tests only, etc.)
- What the engineer must add before the *next* chunk can be fully tested

**Sample addition to the Step 3 runbook prompt:**

```text
For each chunk, include a **Secrets** section: list any env vars or third-party keys
required to verify that step. Note if the chunk is testable without them (mocks/stubs).
Agents must never commit secret values — only .env.example variable names and docs.
```

### When the agent finishes a chunk

The agent must end its turn with two outputs:

1. **`run-log.md` entry** for that run — including a **Secrets needed** block at the bottom
2. **Plain-language instructions for you** — exactly what to add to `.env.local` (or your secrets manager), where to get the keys, and how to re-run verify steps once configured

Example **`Secrets needed`** block in `run-log.md`:

```markdown
### Secrets needed

- `OPENAI_API_KEY` — required to test chat completion in this chunk
- `DATABASE_URL` — not required yet; chunk 04 uses an in-memory stub

**Engineer action:** Add `OPENAI_API_KEY` to `.env.local`. Get a key from … Re-run `pnpm test` and manual check on `/chat`.
```

If no secrets are required, say so explicitly: `None for this chunk.`

### Rules

| Do | Don't |
| --- | --- |
| Document variable **names** in `.env.example` | Commit `.env`, `.env.local`, or real key values |
| Pause the runbook until you add keys and re-verify | Let the agent guess keys or skip verify |
| Note blockers in `run-log.md` before starting the next chunk | Stack chunks that depend on secrets you have not supplied |

Secrets are **your** responsibility. The runbook and run log are how the agent tells you **when** and **which** keys are needed — one chunk at a time, while the diff is still digestible.

---

## What you inherit (the codebase)

| Layer | Location |
| --- | --- |
| Next.js 16 App Router | `src/app/` |
| Token-driven design system (Blue / Grayscale) | `src/styles/themes/`, `docs/design-system/` |
| Component gallery (custom Storybook) | `/` |
| Tests | Vitest + Playwright — [`docs/testing/testing-strategy.md`](docs/testing/testing-strategy.md) |
| Pre-commit | Husky: lint-staged + `pnpm test` |
| Agent entry | [`AGENTS.md`](AGENTS.md) · [`CLAUDE.md`](CLAUDE.md) |

**Stack:** Next.js 16.3 · React 19 · TypeScript · pnpm · Tailwind v4 · shadcn/ui · Vitest · Playwright · Husky

---

## Quick start

```bash
corepack enable
pnpm install
pnpm dev
```

**What `corepack enable` does:** [Corepack](https://nodejs.org/api/corepack.html) is bundled with Node.js. Enabling it once per machine lets Node install and run the **exact pnpm version** pinned in this repo’s `package.json` (`pnpm@10.33.0`) when you run `pnpm` here — so lockfiles and installs match for everyone and in CI. You only need to run it once (admin may be required on some systems). If you already use that pnpm version globally, you can skip it, but Corepack is the recommended path.

Open [http://localhost:3000](http://localhost:3000) for the design system gallery locally, or browse the [live preview](https://next-js-ai-starter.vercel.app/).

### Playwright (first time only)

E2e tests need a browser binary. After `pnpm install`, run once per machine:

```bash
pnpm exec playwright install chromium
```

Or use the convenience script: `pnpm test:e2e:install`.

Then run `pnpm test:e2e` (starts a production build on port **3010** automatically).

| Script | Description |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm test` | Unit/component tests |
| `pnpm test:e2e` | Playwright e2e |
| `pnpm test:e2e:install` | One-time Chromium install for Playwright |
| `pnpm test:e2e:update-snapshots` | Regenerate gallery component screenshot baselines |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check |

---

## Key documentation

| Doc | Purpose |
| --- | --- |
| [`docs/feature-planning/`](docs/feature-planning/) | FPDs — start every feature here |
| [`docs/design-system/`](docs/design-system/) | Components, tokens, registry |
| [`docs/testing/testing-strategy.md`](docs/testing/testing-strategy.md) | Test pyramid and agent rules |
| [`docs/testing/component-screenshots.md`](docs/testing/component-screenshots.md) | Playwright per-component gallery snapshots |
| [`docs/documentation-policy.md`](docs/documentation-policy.md) | Docs-on-change policy |
| [`runbooks/sample/`](runbooks/sample/) | Reference runbook + [`run-log.md`](runbooks/sample/run-log.md) |

---

## Changing the color theme

1. **Runtime:** ThemeSwitcher on `/` (Blue \| Grayscale, light \| dark \| system).
2. **Default:** `DEFAULT_COLOR_THEME` in `src/lib/theme.ts` and `data-theme` on `<html>` in `src/app/layout.tsx`.
3. **New palette:** Duplicate `src/styles/themes/blue.css`, new `data-theme` id, register in `src/lib/theme.ts` and ThemeSwitcher.
4. **Never:** Hardcode colors in components.

---

## For hiring managers and reviewers

This repository is meant to show **how** software gets built: written plans, chunked delivery, documented design systems, automated quality gates, and human review between slices — with AI as a implementer, not a substitute for engineering judgment.

---

## License

MIT
