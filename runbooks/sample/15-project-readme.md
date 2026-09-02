# 15 — Project README

**Goal:** The root `README.md` is the GitHub on-ramp. It matches the running starter and includes every section in FPD §13.2, especially **Changing the color theme** and **Runbooks**.

**Depends on:** Chunks 01–14 so the README is not aspirational.

**In scope:**

- Replace the create-next-app README
- All required sections (FPD §13.2–§13.3)
- Accurate script table, structure tree, and links
- Runbooks section: what they are, how to use them (one chunk at a time), **sample at `runbooks/sample/`**, start with that folder’s README, then `01-scaffold-nextjs.md` for this featureset
- Documentation section: link [`docs/documentation-policy.md`](./docs/documentation-policy.md), `AGENTS.md`, and note that `CLAUDE.md` points to `AGENTS.md`
- License (MIT unless decided otherwise)

**Out of scope:**

- Rewriting the FPD
- New features mentioned as if they exist (no AI chat)
- Marketing filler

**Implement:**

1. Write to the built product, not the plan. Commands must work copy-pasted.
2. Theme section: runtime switcher, default in the provider, how to add a third palette, what never to do (FPD §8.5).
3. Runbooks section: mandatory; link `runbooks/sample/README.md`.
4. Process: FPD first, then a runbook folder; this starter was built with `runbooks/sample/`.
5. Honest non-goals.

**Verify:**

- [ ] Read the README as a stranger: can you install, run, switch themes, find tests, find the sample runbook, find agent docs?
- [ ] Documentation section links policy and `AGENTS.md`
- [ ] Every script listed exists
- [ ] Every internal link resolves
- [ ] No leftover “getting started with create-next-app” boilerplate that contradicts this project

**Review:**

- Tone is clear and specific (FPD: no hype)
- Runbooks are not buried only under `docs/`
- Theme instructions do not tell people to edit Button

**Exit check:**

- [ ] README is hire-manager-ready
- [ ] Ready for the final acceptance pass

**Adjust:** If a script or path is wrong, fix the code or the README in this chunk — do not leave drift for chunk 16 to discover as a surprise.
