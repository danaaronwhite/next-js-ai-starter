# Feature Planning Document

**Project:** Next.js AI Starter  
**Document:** FPD-001 — Foundation, Design System, and Developer Experience  
**Status:** Implemented  
**Date:** 2026-09-01  
**Author:** Dana A.  
**Audience:** Future collaborators, hiring managers reviewing process, and coding agents working in this repo

---

## 1. Why this document exists

This repository is a public GitHub project. It is meant to do two jobs at once:

1. Give employers a clear view of how I plan, design, document, and ship a product — not just a pile of finished code.
2. Give a coding agent a contract it can follow: what to build, what not to invent, which tokens to use, which components to reach for, and which tests must run after a change.

The first implementation slice is not an AI chat product. It is the **platform** that later AI features will sit on: latest Next.js, a token-driven shadcn design system, a living component gallery, a testing pyramid, and a pre-commit gate.

If a later feature cannot be described in a document like this one, it is not ready to build. If it is too large to implement in one sitting, it is not ready to hand to an agent either — break it into a runbook first. **This FPD is executed by the sample runbook** at `runbooks/sample/`: numbered chunks from a docs-only repo to the completed starter. The project README must include a **Runbooks** section that explains the method and points at that sample (the README index plus `01`…`16`).

---

## 2. Problem statement

Most “starter” repos fail in the same ways:

- Design is ad hoc. Colors, spacing, and radii are hardcoded in components. Themes cannot be swapped without a rewrite.
- Components are one-off. A new screen copies markup instead of composing primitives.
- Documentation is a README that goes stale on day two.
- Agents (and humans) do not know when to reuse a component, when to extend it with a new prop, or which tests to run after a change.
- Quality gates are optional. Lint and tests only run if someone remembers.

This project exists to invert that. The starter should be the **source of truth** for process, design, and quality — then later features inherit it.

---

## 3. Goals

| ID | Goal | Success looks like |
| --- | --- | --- |
| G1 | Ship on the latest stable Next.js App Router | `create-next-app` defaults, TypeScript, App Router, React Server Components. No Pages Router. |
| G2 | Make shadcn the design system, not a grab-bag of widgets | Every UI surface is a reusable, props-driven component. No one-off styled markup on pages. |
| G3 | Tokenize all visual decisions | Size, space, type, radius, shadow, and color come from theme tokens. No hex/rgb/oklch literals in component files. |
| G4 | Ship two named color themes: **Blue** and **Grayscale** | Switching themes is a documented, one-place change. Light and dark variants exist for both. |
| G5 | Document every custom component | Each component has a usage doc under `docs/design-system/components/`. A machine-readable registry lists when to use, when to extend, and how to test. |
| G6 | Home page is a custom Storybook | `/` renders every registered component with variants, states, and usage notes. No third-party Storybook in v1. |
| G7 | Testing is specified before code | Unit, integration, and e2e layers have owners, tools, and a written strategy. |
| G8 | Pre-commit cannot be skipped casually | A pnpm-managed Husky hook runs lint and the fast test suite on every commit. |
| G9 | The README is the on-ramp | A new developer (or agent) can install, run, switch themes, add a component, and run tests from the README alone. |
| G10 | Large work ships as runbooks | Featuresets are split into small, testable chunks with UI/UX and code-review gates. The sample is `runbooks/sample/` (this starter, chunks 01–16). The project README explains runbooks and links there. |
| G11 | Docs stay in sync with code | Any completed work updates relevant `docs/`, READMEs, `AGENTS.md`, and `CLAUDE.md` (see `docs/documentation-policy.md` and `.cursor/rules/documentation-on-change.mdc`). |

---

## 4. Non-goals (this FPD)

These are intentionally out of scope for this slice. They may become later FPDs.

- Authentication, billing, or multi-tenant product features
- A real AI chat, RAG pipeline, or model-provider integration
- Official Storybook, Chromatic, or visual-regression SaaS
- A published npm component library or monorepo of packages
- i18n, CMS, or content marketing site
- Backend database, ORM, or API product surface
- Pixel-perfect recreation of a specific brand (Blue / Grayscale are starter palettes, not a client brand)

---

## 5. Success criteria

This FPD is done when all of the following are true:

1. A hiring manager can clone the repo, follow the README, and see a working component gallery in under ten minutes.
2. A coding agent can add a new button variant by reading `docs/design-system/`, the component registry JSON, and the existing Button docs — without inventing a new color or spacing scale.
3. Changing the color theme from Blue to Grayscale requires no component edits.
4. Every custom component has: implementation, usage markdown, registry entry, gallery story, and tests as defined in this document.
5. `pnpm lint` and the unit/component test suite run on pre-commit and fail the commit on error.
6. The testing strategy document exists and matches what the repo actually runs.
7. The starter was built by executing `runbooks/sample/` one chunk at a time, not as a single undifferentiated implementation pass.
8. `AGENTS.md`, `CLAUDE.md`, and `docs/documentation-policy.md` exist and match how the repo is worked on.

---

## 6. Proposed stack

Pin to **latest stable** at implementation time. Expected baseline as of 2026-09-01:

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16.3.x** (latest patch, App Router) | Current stable. RSC, TypeScript-first, Turbopack. Do not pin an outdated major. |
| Language | TypeScript, strict | Portfolio signal and agent safety. |
| Package manager | **pnpm** | Fast, lockfile-honest, required for the pre-commit story. |
| Styling | **Tailwind CSS v4** + CSS-first `@theme` | Matches current Next + shadcn path. Tokens live in CSS, not a JS config dump. |
| Design system | **shadcn/ui** (New York, RSC, CSS variables) | Copy-in components we own and document. Not a black-box UI kit. |
| Icons | Lucide (shadcn default) | Consistent, tree-shakeable. |
| Color themes | Custom **Blue** and **Grayscale** token files | Named product themes, plus light/dark. |
| Theme switching | `next-themes` + `data-theme` / class strategy | Light/dark and named color theme without flash of wrong theme. |
| Unit / component tests | **Vitest** + React Testing Library + jsdom | Fast, ESM-native, fits Next 16. |
| Integration tests | Vitest (component + mocked network / form flows) | See §11. |
| E2E | **Playwright** | Only layer that can honestly test async Server Components and the gallery route. |
| Lint / format | ESLint (Next config) + Prettier if the scaffold includes it | One command, one opinion. |
| Git hooks | **Husky** + **lint-staged**, invoked via pnpm | Pre-commit runs lint and tests on touched files where possible; full unit suite if that is simpler and still fast. |

Implementation rule: run `pnpm create next-app@latest` and `pnpm dlx shadcn@latest init` rather than hand-rolling an outdated template.

---

## 7. Feature 1 — Latest Next.js application shell

### 7.1 Intent

A current, conventional Next.js app that looks like production work, not a tutorial leftover.

### 7.2 Requirements

- App Router only. `src/app` (or `app/` — pick one during scaffold and stick to it; **prefer `src/`** for a clearer split between app code and docs).
- TypeScript, ESLint, Tailwind, `@/*` import alias.
- Root layout owns fonts, theme provider, and global CSS. Pages do not set visual globals.
- `next.config.ts` stays boring unless a later FPD needs a flag (for example Instant Navigations). Do not turn on experimental flags just to look modern.
- Environment files: `.env.example` with no secrets. `.env*` stays gitignored except the example.
- Path hygiene: application code under `src/`, documentation under `docs/`, tests colocated or under `tests/` as defined in §11.

### 7.3 Acceptance criteria

- `pnpm dev`, `pnpm build`, and `pnpm start` work from a clean install.
- No Pages Router files.
- `packageManager` field in `package.json` records the pnpm version.
- README install steps match the actual scripts.

### 7.4 Implementation notes for agents

- Execute [`runbooks/sample/01-scaffold-nextjs.md`](../../runbooks/sample/01-scaffold-nextjs.md), not this entire FPD.
- Do not add features in the first scaffold chunk beyond what that runbook lists.
- Prefer Server Components. Mark `'use client'` only when a component needs state, effects, or browser APIs (theme toggle, gallery controls, form interactivity).

---

## 8. Feature 2 — Design system principles and theme tokens

### 8.1 Intent

Visual decisions are **data**, not opinions scattered across JSX. Components consume tokens. Themes swap token values.

### 8.2 Design-system documentation (required)

Create `docs/design-system/README.md` as the human + agent contract. It must state, in plain language:

1. **Everything is a component.** Pages compose primitives. If a chunk of UI will appear twice, or has a name (Button, Field, Card), it is a component with props — not a `div` soup on the page.
2. **Components are props-driven.** Variants, sizes, tones, and states are props (or `cva` variants), not forked files (`ButtonPrimary.tsx`, `ButtonBig.tsx`).
3. **Output quality bar.** Code should be readable, typed, accessible (keyboard, focus, labels, contrast), and scalable. Prefer composition over inheritance. Prefer extending a primitive with a new variant over creating a parallel component.
4. **Tokens own the look.** All sizing, spacing, typography, radius, shadow, motion, and color come from theme tokens. Arbitrary values (`p-[13px]`, `text-[#1d4ed8]`, `gap-[0.7rem]`) are a defect unless there is a written exception in the design-system README.
5. **Colors come from the theme file.** Components use semantic tokens (`bg-primary`, `text-muted-foreground`, `border-input`). They never name palette ids like `"blue"` or `"grayscale"`. Named palettes only live in theme files.

### 8.3 Token architecture

Split tokens into two layers:

| Layer | Lives in | Examples | Who changes it |
| --- | --- | --- | --- |
| **Primitive tokens** | Theme files | `--blue-500`, `--gray-600`, `--space-4`, `--radius-md` | Theme authors |
| **Semantic tokens** | Theme files, consumed by Tailwind `@theme inline` | `--primary`, `--background`, `--destructive`, `--radius` | Theme authors |
| **Utilities / components** | Component files | `bg-primary`, `px-4`, `rounded-md` | Component authors — semantic names only |

Recommended file layout:

```text
src/styles/
  globals.css              # Tailwind import, @theme inline mappings, base layer
  tokens/
    spacing.css            # space scale (optional split; may live in globals if small)
    typography.css
    radius.css
  themes/
    blue.css               # Blue light + dark semantic values
    grayscale.css          # Grayscale light + dark semantic values
```

If the scaffold is small, themes may live as `[data-theme="blue"]` / `[data-theme="grayscale"]` blocks in `globals.css`. The **rule** matters more than the file count: one place defines colors; components do not.

### 8.4 Color themes: Blue and Grayscale

Ship **two named color themes**, each with **light and dark**.

| Theme id | `data-theme` | Character |
| --- | --- | --- |
| Blue | `blue` | Default. Confident product blue for primary actions, links, and focus rings. Cool neutrals. |
| Grayscale | `grayscale` | Alternate. Neutral charcoal primary; zero-chroma surfaces and borders. |

Required semantic color tokens (minimum, shadcn-compatible):

- `background` / `foreground`
- `card` / `card-foreground`
- `popover` / `popover-foreground`
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `muted` / `muted-foreground`
- `accent` / `accent-foreground`
- `destructive` / `destructive-foreground`
- `border`, `input`, `ring`
- `chart-1` … `chart-5` if charts are added later (define now only if shadcn init includes them)

Use OKLCH (current shadcn / Tailwind v4 default) unless the generated scaffold uses another space. Do not mix color spaces in the same theme file.

**Light / dark** is orthogonal to **Blue / Grayscale**. Implementation should support:

- `data-theme="blue"` + `class="dark"` (or equivalent)
- `data-theme="grayscale"` + light/dark

Default for first load: **Blue, system-aware light/dark** (or light if system detection is deferred). Document the default in the README.

### 8.5 How to change the color theme (README contract)

The project README must include a short section, **“Changing the color theme”**, that a non-expert can follow. It will document:

1. **Runtime switch (user-facing):** Use the theme control on the gallery (and later in a site header). Preference persists in `localStorage` (via `next-themes` or equivalent).
2. **Default theme (developer):** Change the default in the theme provider (e.g. `defaultTheme` / `defaultColorTheme`) in the root layout or a `theme-provider` component. One file.
3. **Adding a third palette:** Duplicate `blue.css` or `grayscale.css`, assign a new `data-theme` id, map the same semantic token names, register the id in the theme switcher and in this README. Do not edit components.
4. **What never to do:** Do not hardcode palette colors in components. Do not create theme-specific component variants. Do not change Tailwind utility names per theme.

### 8.6 Spacing, type, and radius

Define a closed scale. Suggested starting point (adjust to shadcn New York if it already provides a coherent scale):

- Spacing: 4px base (`--space-1` = 0.25rem …). Components use `p-4`, `gap-2`, etc. — never magic pixels.
- Radius: `--radius` plus `sm` / `md` / `lg` / `xl` derived from it.
- Typography: a small type ramp (e.g. `xs`, `sm`, `base`, `lg`, `xl`, `2xl`) and font tokens (`--font-sans`, `--font-mono`).
- Focus: `ring` token only. Visible focus on every interactive control.

### 8.7 Acceptance criteria

- `docs/design-system/README.md` exists and includes the five principles in §8.2.
- Blue and Grayscale both render correctly in light and dark on the gallery.
- Grep of `src/components` finds no raw hex / rgb / hsl / oklch literals (except inside theme files).
- README “Changing the color theme” section exists and is accurate.

---

## 9. Feature 3 — Design system components, docs, and registry

### 9.1 Intent

A small, complete set of primitives that prove the system. Quality over quantity. Each component is a product: API, docs, registry rules, gallery story, tests.

### 9.2 v1 component set (minimum)

**Primitives (shadcn-based, then wrapped or documented as ours):**

| Component | Role |
| --- | --- |
| `Button` | Primary actions. Variants: default, secondary, outline, ghost, destructive, link. Sizes: sm, default, lg, icon. |
| `Input` | Single-line text. Supports label association, error, disabled, placeholder. |
| `Textarea` | Multi-line text. Same field semantics as Input. |
| `Select` | Discrete choice. Keyboard accessible. |
| `Checkbox` | Boolean. Labelled. |
| `Switch` | Immediate on/off (settings), distinct from Checkbox. |
| `Label` | Accessible captions for fields. |
| `Form` / field helpers | Composition for label + control + description + error. Use react-hook-form + zod if it stays thin; otherwise a presentational Field wrapper is enough for v1. |

**Custom / composed:**

| Component | Role |
| --- | --- |
| `Card` | Surface grouping: header, title, description, content, footer. |
| `Badge` | Short status or category chip. |
| `Alert` | Inline message: info, success, warning, destructive. |
| `ThemeToggle` or `ThemeSwitcher` | Light/dark and Blue/Grayscale controls. Custom; not a raw shadcn primitive. |

If shadcn generates extra primitives as dependencies (e.g. `Popover` for Select), they may exist in `components/ui` but they still need a registry entry if they are public API. Private implementation details can be marked `"public": false` in the registry.

### 9.3 Component implementation rules

- Location: `src/components/ui/` for primitives, `src/components/` for composed/custom pieces.
- Variants via `class-variance-authority` (shadcn default).
- `cn()` for class merging. Callers may pass `className` for layout (`w-full`, `mt-4`) but not for recoloring or rescaling that fights variants.
- Props are typed and exported. Prefer extending native element props (`React.ComponentProps<"button">`) so `type`, `disabled`, `aria-*` work without a custom API.
- Accessibility is part of done: labels, `aria-invalid`, focus order, disabled states, contrast against both themes and both color modes.
- No business logic inside primitives. A Button does not fetch. A Card does not know about users.

### 9.4 Per-component documentation

For **each public component**, create:

```text
docs/design-system/components/<component-name>.md
```

Example: `docs/design-system/components/button.md`.

Each doc must include:

1. **Purpose** — one paragraph.
2. **When to use** — and when *not* to use (e.g. Button vs link-styled Button vs Next.js `Link`).
3. **Anatomy** — composition parts if any (`CardHeader`, `CardContent`).
4. **Props / variants** — table: name, type, default, description.
5. **Examples** — real JSX the gallery can mirror.
6. **Theming** — which semantic tokens it consumes. Reminder: do not add color props like `color="grayscale"`.
7. **Accessibility** — required attributes and keyboard behavior.
8. **Related components** — e.g. Input + Label + Field.
9. **Change policy** — pointer to the registry: when to add a prop vs. compose vs. create a new component.

### 9.5 Component registry (machine-readable)

Create a single registry file that agents and humans both read:

```text
docs/design-system/component-registry.json
```

This file is the **index of record**. If a component is not in the registry, it is not part of the public design system (even if a file exists).

#### 9.5.1 Schema (v1)

```json
{
  "$schema": "./component-registry.schema.json",
  "version": 1,
  "updated": "2026-09-01",
  "components": [
    {
      "id": "button",
      "name": "Button",
      "path": "src/components/ui/button.tsx",
      "docs": "docs/design-system/components/button.md",
      "galleryId": "button",
      "public": true,
      "kind": "primitive",
      "status": "stable",
      "useWhen": [
        "The user triggers an action (submit, confirm, navigate via click handler).",
        "You need a consistent interactive affordance with variants and sizes."
      ],
      "doNotUseWhen": [
        "The destination is a static route with no extra button semantics — use Next.js Link styled as a button via asChild, or the link variant.",
        "You need an icon-only control without an accessible name."
      ],
      "composeWith": ["card", "form"],
      "tokensUsed": ["primary", "primary-foreground", "destructive", "ring", "radius"],
      "extendPolicy": {
        "addPropOrVariantWhen": [
          "The same component is copy-pasted with a one-line class difference that will be needed in more than one place.",
          "A new visual variant is a first-class product state (e.g. a new intent), not a one-off layout tweak."
        ],
        "doNotModifyWhen": [
          "A single screen needs a unique layout — use className for layout only, or compose existing parts.",
          "You want a different color — change the theme, not the Button API."
        ],
        "createNewComponentWhen": [
          "The interaction model is different (e.g. a split button, a toggle button group).",
          "You would have to fight the existing API or accessibility contract."
        ]
      },
      "testing": {
        "unit": ["src/components/ui/button.test.tsx"],
        "onChange": [
          "Run the component's unit tests.",
          "Run unit tests of any component that imports this one (see usedBy).",
          "If visuals or a11y change, run the gallery e2e spec that includes this galleryId."
        ]
      },
      "usedBy": ["theme-switcher", "gallery"]
    }
  ]
}
```

Also add `docs/design-system/component-registry.schema.json` so the registry can be validated in CI later.

Required fields per public component: `id`, `name`, `path`, `docs`, `galleryId`, `public`, `kind`, `status`, `useWhen`, `doNotUseWhen`, `extendPolicy`, `testing`.

#### 9.5.2 Agent rules encoded in the registry

These rules must appear in `docs/design-system/README.md` **and** be implied by every registry entry:

| Situation | Required action |
| --- | --- |
| Need UI that matches an existing component | Import it. Do not fork the file. |
| Need a slight visual difference used once | `className` for layout/spacing only. No new color tokens inline. |
| Need a difference used in 2+ places | Add a **variant or prop**. Update the component doc, registry, gallery story, and tests in the same change. |
| Need a different interaction or a11y model | New component. New doc. New registry row. New gallery story. New tests. |
| Change an existing component’s API or styles | Follow `testing.onChange`. Run that component’s tests **and** tests for every `usedBy` / importer. If the gallery story changes, run the affected e2e spec. Do not merge with failing visual/a11y checks. |
| Change tokens only | No component code changes. Visually verify Blue/Grayscale × light/dark on the gallery. |

`status` values: `draft` | `stable` | `deprecated`. Deprecated components stay in the registry with a `replacedBy` field.

### 9.6 Acceptance criteria

- All v1 components in §9.2 exist, are typed, and render in both themes.
- Each public component has a markdown doc and a registry entry that agrees on path, props, and tests.
- Registry JSON is valid against the schema.
- An agent reading only the registry + one component doc can decide: reuse, extend, or create new.

---

## 10. Feature 4 — Home page as a custom Storybook

### 10.1 Intent

`/` is not a marketing landing page in v1. It is a **living catalog** of the design system: the fastest way to see quality, themes, and components. This is also the portfolio “hero” — a hiring manager lands on a real system, not lorem ipsum.

### 10.2 Requirements

- Route: `/` (App Router `page.tsx`).
- Lists every **public** registry component.
- For each component: title, short purpose (from docs or registry), and interactive examples for every important variant and state (default, disabled, error, sizes, destructive, etc.).
- Controls in the page chrome:
  - Color theme: Blue | Grayscale
  - Mode: Light | Dark | System (if implemented)
- Layout: readable sections, skip links or in-page nav (sidebar or sticky toc) so a reviewer can jump to Button, Input, Card, etc.
- Examples use the real components, not screenshots.
- Source of truth: adding a component means adding a registry entry **and** a gallery section. Prefer a data-driven gallery that reads a typed catalog in code (mirroring the registry) so the page cannot silently drift. If reading JSON from `docs/` in the app is awkward, maintain `src/components/gallery/catalog.ts` and a checklist in the design-system README that they must stay in sync. **Prefer generating or importing one catalog** over two hand-edited lists.

### 10.3 Non-goals for the gallery

- Isolated iframe per story (full Storybook)
- Docs MDX compilation
- Addons, knobs beyond theme, or a11y addon panels (a11y is still required in components and tests)

### 10.4 Acceptance criteria

- Visiting `/` shows every public v1 component with variants.
- Theme and mode switches update the entire page without reload artifacts (no unstyled flash if practical; `suppressHydrationWarning` on `<html>` as next-themes requires).
- The page is a Server Component shell where possible; interactive examples and theme controls are client islands.
- Keyboard navigation through the gallery is possible.

---

## 11. Feature 5 — Testing strategy

### 11.1 Intent

Tests are part of the product, not a later cleanup. The strategy must be written, followed, and hooked to git.

Full write-up lives at:

```text
docs/testing/testing-strategy.md
```

This FPD defines what that document must contain and which tools we use. The strategy doc is a deliverable of this slice, not a follow-up.

### 11.2 Pyramid

```text
        / e2e (Playwright)  \          few, slow, real browser + Next server
       / integration (Vitest) \        flows: form compose, gallery catalog, theme provider
      / unit + component (Vitest) \    many, fast: tokens helpers, cva variants, RTL
```

| Layer | Tool | What belongs here | What does not |
| --- | --- | --- | --- |
| **Unit** | Vitest | Pure functions (`cn`, theme id helpers, registry schema checks if we parse JSON), cva variant class output | Async Server Components, real network |
| **Component** | Vitest + RTL + jsdom | Client components and *synchronous* presentational components: click, keyboard, disabled, error text, accessible name | Async RSC pages, `headers()`, `cookies()`, real routing |
| **Integration** | Vitest + RTL | Composed fields (Label+Input+error), Card+Button, gallery section renderer with a mock catalog | Full app boot, theme persistence across reloads |
| **E2E** | Playwright | `/` gallery loads; theme switch Blue↔Grayscale and light↔dark; critical a11y smoke; any async Server Component route | Recreating every variant already covered in RTL |

Hard rule for Next.js 16: **async Server Components are Playwright’s job.** Do not invent a Vitest renderer for them.

### 11.3 What to test per component

Minimum for each public primitive:

- Renders the default variant.
- Each documented variant/size is present in the DOM (role + name or test id used sparingly).
- Disabled / error states are exposed accessibly (`toBeDisabled`, `aria-invalid`).
- Critical keyboard path (Button activate, Checkbox toggle, Select if feasible in jsdom — if Select is too portal-heavy, cover it in Playwright).

Gallery e2e (minimum):

- Home page title / landmark exists.
- Nav or headings for Button, Input, Card are visible.
- Switching color theme changes a stable attribute (`data-theme`) and a screenshot-optional assertion on that attribute.
- Switching dark mode toggles `class="dark"` (or documented equivalent).

### 11.4 Agent testing contract (on change)

This must be copied into `docs/testing/testing-strategy.md` and referenced from the registry:

1. **Changed a component file** → run that component’s unit/component tests.
2. **Changed a component’s props, variants, or a11y** → update its markdown doc, registry entry, gallery story, and tests in the same change. Run tests for `usedBy` components.
3. **Changed tokens or theme files** → run unit tests for token helpers (if any) and Playwright gallery theme specs.
4. **Changed the gallery or catalog** → run gallery e2e.
5. **Changed hooks, lint, or CI config** → run lint + full unit suite once locally.
6. Do not disable or skip tests to land a change. If a test is wrong, fix the test and document why.

### 11.5 Commands (to be created)

| Script | Meaning |
| --- | --- |
| `pnpm test` | Vitest unit + component + integration (watch off in CI / hook) |
| `pnpm test:watch` | Local TDD |
| `pnpm test:e2e` | Playwright |
| `pnpm test:e2e:ui` | Playwright UI mode |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` (recommended; include in CI even if not in pre-commit) |

Pre-commit uses `pnpm test` (non-watch) and `pnpm lint`. E2E is **CI and explicit local**, not pre-commit, so commits stay fast.

### 11.6 Acceptance criteria

- `docs/testing/testing-strategy.md` exists and matches this section.
- Vitest runs in CI-friendly mode (`vitest run`).
- Playwright config uses a local Next server (webServer) for e2e.
- At least one real test exists per layer (unit, component/integration, e2e) so the pipeline is not a hollow config.
- Every public v1 component has a unit/component test file as listed in the registry.

---

## 12. Feature 6 — pnpm pre-commit hook

### 12.1 Intent

A commit that breaks lint or unit tests never reaches GitHub from this machine. The hook is part of the “how I work” story.

### 12.2 Requirements

- Package manager: **pnpm** only. Document `corepack enable` or the pnpm version in the README.
- **Husky** git hooks, installed via a `prepare` script so clones get hooks after `pnpm install`.
- **lint-staged** (preferred): on staged files, run ESLint (and Prettier if present). Then run the unit test suite once (`pnpm test`) so component edits cannot skip tests.
- Alternative if lint-staged + full suite is redundant: husky `pre-commit` runs `pnpm lint && pnpm test`. Either is acceptable; **lint + unit tests must both run**.
- Playwright does **not** run on pre-commit.
- Do not use `--no-verify` in project docs as a workflow. Do not add a “skip hooks” script.

### 12.3 Suggested wiring

```json
{
  "scripts": {
    "prepare": "husky",
    "lint": "eslint .",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

`prepare` must be safe on CI (Husky no-ops when `HUSKY=0` or when `.git` is missing — verify during implement).

### 12.4 Acceptance criteria

- After `pnpm install`, `.husky/pre-commit` exists and is executable.
- A deliberate lint error or failing unit test blocks `git commit`.
- README documents the hook and what it runs.
- CI (when added) runs the same lint + unit commands; e2e is a separate job. CI config may land in this slice as a GitHub Actions workflow if time allows; if not, note it as a fast follow in the README.

---

## 13. Feature 7 — Full README

### 13.1 Intent

The README is the product homepage on GitHub. It should explain **what this is**, **why it is built this way**, and **how to use it** — without replacing the deeper docs.

### 13.2 Required sections

1. **Name and one-liner** — Next.js AI starter: a production-shaped foundation with a token-driven design system, written for humans and agents.
2. **Why it exists** — portfolio + process + agent-ready contracts.
3. **Stack** — versions at a glance (Next, React, Tailwind, shadcn, pnpm, Vitest, Playwright).
4. **Quick start** — clone, `corepack`/`pnpm`, `pnpm install`, `pnpm dev`, open `/`.
5. **Scripts** — table of every package.json script.
6. **Changing the color theme** — see §8.5. This section is mandatory.
7. **Design system** — link to `docs/design-system/README.md`, component docs, and `component-registry.json`. How to add a component (checklist).
8. **Gallery** — `/` is the custom Storybook; how to add a story.
9. **Testing** — link to `docs/testing/testing-strategy.md`; how to run unit vs e2e; what pre-commit runs.
10. **Git hooks** — Husky + pnpm; what happens on commit.
11. **Project structure** — tree of `src/`, `docs/`, tests.
12. **Process** — link to this FPD. State that features start as documents in `docs/feature-planning/`, then are executed as runbooks (see the next required section).
13. **Runbooks** — mandatory. Explain what a runbook is, how to use one (one testable chunk at a time, verify, adjust UI/UX, review the agent diff, then continue), and **where the sample lives:** [`runbooks/sample/`](../../runbooks/sample/) — the full starter sequence (index + `01-scaffold-nextjs.md` through `16-starter-acceptance.md`). Do not bury this only in `docs/`.
14. **Documentation and agents** — link to [`docs/documentation-policy.md`](../documentation-policy.md). State that any completed work updates relevant `docs/`, READMEs, `AGENTS.md`, and `CLAUDE.md`. Point agents at `AGENTS.md`.
15. **What is not included yet** — honest non-goals (no AI feature in v1).
16. **License** — MIT unless a different license is chosen at publish time.

Tone: clear, specific, no hype. Show the work.

### 13.3 Runbooks in the project README

The root README must have a dedicated **Runbooks** section. Minimum content:

- One paragraph: runbooks break a large featureset into smaller, testable chunks so you can implement, test, adjust UI/UX, and review agent code before the next chunk starts.
- How to use them: FPD first → `runbooks/<feature-slug>/` with numbered chunk files → execute **one chunk**, then verify and review, then the next.
- Where the sample is: `runbooks/sample/` — **this starter’s real sequence**, not a fictional template. Start at [`runbooks/sample/README.md`](../../runbooks/sample/README.md); implementation begins at `01-scaffold-nextjs.md` and ends at `16-starter-acceptance.md`.
- Pointer to the fuller contract in §13.4 of this FPD.
- Link to [`docs/documentation-policy.md`](../documentation-policy.md) and `AGENTS.md` for agent contributors.

---

## 13.4 Feature 8 — Runbooks

### Intent

An FPD is the contract for a whole feature. A **runbook** is the script for building it without losing the chance to steer.

Agents (and humans) produce better work when each prompt is a digestible chunk: a demoable slice, a named test, a UI pass, and a code review. Stacking an entire featureset into one generation hides UX problems and makes the diff too large to review honestly.

### Requirements

- Live at repo root: `runbooks/`, not under `docs/` (docs explain the system; runbooks are the working scripts).
- **`runbooks/sample/` is the sample and the implementation plan for this FPD.** It is a complete sequence from the current docs-only repo to the finished starter: a README index plus numbered chunks `01`–`16`. Later features copy that shape into `runbooks/<feature-slug>/`. They do not add more product work onto the sample.
- Each chunk has: goal, in/out of scope, depends on, implement steps, verify (commands + manual UI/UX), review (what to read in the diff), exit check, and an adjust prompt.
- Chunks stay small enough to review in one pass. One concern per chunk when possible.
- After each chunk: run the relevant tests, look at the UI (both themes / modes if visual), review the diff, update later chunks or the FPD if the plan changed. Then start the next chunk.
- Point agents at **one numbered file**, not the entire sample folder and not this FPD as the implementation spec.
- The project README’s Runbooks section (see §13.3) is the on-ramp. Do not leave runbooks undocumented except in this FPD.

### Acceptance criteria

- `runbooks/sample/README.md` indexes the starter sequence and explains the loop.
- Numbered chunks `01-scaffold-nextjs.md` through `16-starter-acceptance.md` exist and cover FPD phases without collapsing into one file.
- Root README includes the Runbooks section and links to `runbooks/sample/` as that sample.
- This FPD is implemented by executing those chunks in order.

---

## 13.5 Feature 9 — Documentation and agent files on change

### Intent

Code and docs must not drift. Whether work comes from a user prompt or a runbook chunk, the same change (or the same PR) updates the documentation that describes it.

### Requirements

- Policy doc: `docs/documentation-policy.md`
- Agent entry point: `AGENTS.md` (stack, paths, runbooks, design-system pointers, documentation rule)
- Claude pointer: `CLAUDE.md` → `AGENTS.md` only (no duplicate agent guidance)
- Cursor rule: `.cursor/rules/documentation-on-change.mdc` with `alwaysApply: true`
- On every chunk or feature: update relevant `docs/` files, affected READMEs, and `AGENTS.md` if workflow or paths changed
- Runbook **Adjust** sections should call out doc updates when the plan shifts

### Acceptance criteria

- Policy, agent files, and Cursor rule exist and agree
- Root README (chunk 15) links the policy and `AGENTS.md`
- Chunk 16 verifies docs match the built starter

---

## 14. Documentation tree (this slice)

```text
docs/
  documentation-policy.md           # docs-on-change policy
  feature-planning/
    feature-planning-document.md    # this file
  design-system/
    README.md                       # principles, tokens, agent rules
    component-registry.json
    component-registry.schema.json
    components/
      button.md
      input.md
      textarea.md
      select.md
      checkbox.md
      switch.md
      label.md
      form.md                       # or field.md
      card.md
      badge.md
      alert.md
      theme-switcher.md
  testing/
    testing-strategy.md
runbooks/
  sample/                           # SAMPLE: this FPD, docs-only → completed starter
    README.md                       # index, methodology, chunk table
    01-scaffold-nextjs.md
    02-shadcn-and-token-wiring.md
    03-blue-and-teal-themes.md
    04-design-system-principles.md
    05-button.md
    06-form-controls.md
    07-choice-controls.md
    08-surfaces.md
    09-theme-switcher.md
    10-registry-and-component-docs.md
    11-gallery-home-page.md
    12-unit-and-component-tests.md
    13-testing-strategy-and-e2e.md
    14-precommit-hooks.md
    15-project-readme.md
    16-starter-acceptance.md
.cursor/rules/
  documentation-on-change.mdc       # always-on Cursor rule
AGENTS.md                           # agent instructions
CLAUDE.md                           # points to AGENTS.md
README.md                           # project root (must include Runbooks + documentation sections)
```

---

## 15. Suggested repository structure (implementation)

```text
src/
  app/
    layout.tsx
    page.tsx                        # gallery
    globals.css                     # or src/styles/globals.css re-exported
  components/
    ui/                             # shadcn primitives
    gallery/                        # catalog, section, story wrappers
    theme-provider.tsx
    theme-switcher.tsx
  lib/
    utils.ts                        # cn()
    theme.ts                        # theme ids, types
  styles/
    themes/
      blue.css
      grayscale.css
tests/                              # optional; e2e often lives here
  e2e/
    gallery.spec.ts
runbooks/
  sample/                           # see documentation tree for chunk files
```

Colocate `*.test.tsx` next to components **or** under `src/**/__tests__`. Pick one convention at scaffold time and document it. **Recommendation:** colocate `button.test.tsx` beside `button.tsx` for agent locality.

---

## 16. Implementation phases

Build in this order so each phase is demoable. **Do not implement from this table directly.** Execute the matching files in `runbooks/sample/`. Stop after each chunk for tests, UI/UX, and review.

| Phase | Runbook chunks | Deliverable | Exit check |
| --- | --- | --- | --- |
| **P0** | 01 | Scaffold Next.js latest + pnpm + TypeScript + Tailwind + ESLint | `pnpm dev` / `build`; docs/runbooks intact |
| **P1** | 02–03 | shadcn init, token wiring, Blue + Grayscale, theme provider | Both themes × light/dark |
| **P1b** | 04 | Design-system principles README | Contract exists before more UI |
| **P2** | 05–09 | v1 components + ThemeSwitcher; temporary previews | Each chunk has its own UI gate |
| **P3** | 10 | Component docs + registry + schema | Docs match files |
| **P4** | 11 | Gallery home page driven by catalog | `/` is the Storybook |
| **P5** | 12 | Vitest + RTL tests for all public components | `pnpm test` green |
| **P6** | 13 | Playwright gallery e2e + testing-strategy.md | `pnpm test:e2e` green |
| **P7** | 14 | Husky + lint-staged / pre-commit | Bad commit blocked |
| **P8** | 15–16 | Root README (theme + Runbooks) and FPD acceptance | Fresh-clone walkthrough; starter complete |

Do not skip docs to “finish features faster.” In this repo, docs are a feature.

---

## 17. Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| shadcn / Tailwind v4 token wiring is easy to get wrong (`@theme` vs `@theme inline`) | Themes appear broken | Follow current shadcn Next install; verify `bg-primary` after init before customizing palettes |
| Select / portals are painful in jsdom | False confidence or skipped coverage | RTL for simple states; Playwright for Select open/choose |
| Dual catalog (JSON docs + TS gallery) drifts | Gallery missing a component | One export or a test that asserts registry ids ⊆ gallery ids |
| Pre-commit too slow | People skip hooks | No e2e on commit; Vitest only; lint-staged for eslint |
| Theme flash on first paint | Looks unprofessional | `next-themes` + `suppressHydrationWarning`; default theme documented |
| Scope creep into AI features | Foundation stays half-done | Non-goals in §4; new FPD required for AI |

---

## 18. Open questions (resolve during P0–P1, then update this doc)

1. **`src/` vs repo-root `app/`** — Recommendation: `src/`. Confirm at scaffold.
2. **Form library in v1** — react-hook-form + zod vs presentational Field only. Recommendation: presentational Field + Label + error for v1; add RHF when the first real form ships.
3. **CI in this slice** — GitHub Actions for lint + `pnpm test` + Playwright. Recommendation: yes, a single `ci.yml`, if it does not delay P8.
4. **License and GitHub topics** — MIT, topics: `nextjs`, `shadcn`, `design-system`, `starter`.
5. **Default color theme** — Blue.

---

## 19. Traceability

| User request | FPD section | Later artifacts |
| --- | --- | --- |
| Latest Next.js | §6, §7 | Scaffold, `package.json` |
| shadcn + componentized, token-driven UI; Blue/Grayscale; README theme switch | §8 | `docs/design-system/README.md`, theme files, root README |
| Components + per-component docs + registry + agent test rules | §9 | `docs/design-system/components/*`, `component-registry.json` |
| Home page as custom Storybook | §10 | `src/app/page.tsx`, gallery |
| Testing strategy (unit, integration, e2e) | §11 | `docs/testing/testing-strategy.md`, Vitest, Playwright |
| pnpm pre-commit lint + tests | §12 | Husky, lint-staged, scripts |
| Full README | §13 | `README.md` |
| Runbooks for chunked, reviewable delivery | §13.3–13.4 | `runbooks/sample/` (01–16); README Runbooks section |
| Documentation on change | §13.5 | `docs/documentation-policy.md`, `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/` |

---

## 20. Decision record (this FPD)

| Decision | Choice | Rationale |
| --- | --- | --- |
| Storybook | Custom gallery on `/`, not Storybook OSS | Fewer deps; the app *is* the demo; still document like stories |
| Color themes | Blue and Grayscale as `data-theme`, not separate Button skins | Proves tokens work |
| Test runner | Vitest, not Jest | Native for modern Next / Vite toolchain |
| E2E | Playwright | Required for App Router RSC honesty |
| Hooks | Husky via pnpm `prepare` | Standard, visible in the repo |
| Agent contract | JSON registry + markdown, not only prose | Machines can parse use/extend/test rules |
| Delivery | Runbooks: small testable chunks, not one-shot featuresets | Preserves UI/UX adjustment and digestible code review |
| This FPD’s runbook | `runbooks/sample/` (01–16) is the sample *and* the build sequence | Future features copy the folder shape; they do not extend this sample |
| Documentation | Policy + `AGENTS.md` + Cursor rule; update docs with every change | Prevents portfolio repo from lying about how it works |

---

## 21. Next action

Start implementation at [`runbooks/sample/01-scaffold-nextjs.md`](../../runbooks/sample/01-scaffold-nextjs.md). Do not implement this FPD in one pass. After each sample chunk: verify, adjust UI/UX, review the agent diff, then open the next numbered file. The starter is complete when [`16-starter-acceptance.md`](../../runbooks/sample/16-starter-acceptance.md) is green.

When a new product feature is proposed (for example an AI chat kit):

1. Open a new FPD:

```text
docs/feature-planning/<feature-slug>.md
```

2. Open a new runbook folder (do not append to `runbooks/sample/`):

```text
runbooks/<feature-slug>/
```

Use this document as the FPD template. Use `runbooks/sample/` as the runbook template (index README + numbered chunks with the same section headings). Execute one chunk at a time.
