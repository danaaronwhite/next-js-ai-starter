# 01 — Scaffold Next.js

**Goal:** A latest-stable Next.js App Router app runs with pnpm, TypeScript, Tailwind, and ESLint, without destroying the docs and runbooks already in this repo.

**Depends on:** Nothing in code. FPD §6–§7 accepted.

**In scope:**

- `pnpm create next-app@latest` (or equivalent) into this repo
- TypeScript, App Router, Tailwind, ESLint, `@/*` alias
- Prefer `src/` directory
- `packageManager` field in `package.json`
- `.env.example` (empty of secrets)
- Confirm `docs/` and `runbooks/` still exist
- Preserve `AGENTS.md`, `CLAUDE.md`, and `.cursor/rules/` if already present

**Out of scope:**

- shadcn, themes, components, tests, Husky, root README rewrite
- Experimental Next flags
- Replacing this runbook or the FPD

**Implement:**

1. Check the working tree. Keep `docs/`, `runbooks/`, `AGENTS.md`, `CLAUDE.md`, and `.cursor/rules/`. If the scaffolder wants an empty directory, scaffold in a temp folder and merge, or pass flags that do not wipe existing files.
2. Use **pnpm**. Pin latest stable Next.js (16.3.x or whatever `create-next-app@latest` installs today). Record the pnpm version in `package.json` (`packageManager`).
3. Choose: TypeScript, App Router, Tailwind, ESLint, `src/` directory, `@/*` alias. No Pages Router.
4. Add `.env.example` with a one-line comment that no secrets belong here. Confirm `.gitignore` covers `.env*`.
5. Leave the default home page for now. Chunk 11 replaces `/` with the gallery.
6. Do not rewrite the project README yet (chunk 15). A stub from create-next-app is fine if it does not delete `docs/` or `runbooks/`.

**Verify:**

- [ ] `pnpm install` succeeds
- [ ] `pnpm dev` serves the default Next page
- [ ] `pnpm build` succeeds
- [ ] No `pages/` directory
- [ ] `docs/feature-planning/`, `docs/documentation-policy.md`, and `runbooks/sample/` still exist
- [ ] `AGENTS.md`, `CLAUDE.md`, and `.cursor/rules/documentation-on-change.mdc` still exist
- [ ] `package.json` has a `packageManager` field

**Review:**

- Scaffold is conventional, not a custom framework
- No extra dependencies “for later”
- Path alias and `src/` match the FPD recommendation (or a written exception in the FPD open questions)

**Exit check:**

- [ ] Dev and build work
- [ ] Existing documentation is intact
- [ ] Ready for shadcn in chunk 02

**Adjust:** If `src/` was not used, update the FPD open question and every later path in this runbook before continuing.
