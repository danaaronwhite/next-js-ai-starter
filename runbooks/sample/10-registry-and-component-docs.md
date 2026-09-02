# 10 — Registry and component docs

**Goal:** Every public component has a usage doc and a valid registry row. The registry is the index of record.

**Depends on:** Chunks 05–09 (components exist so docs are not fiction).

**In scope:**

- `docs/design-system/component-registry.schema.json`
- `docs/design-system/component-registry.json`
- `docs/design-system/components/*.md` for: button, input, textarea, select, checkbox, switch, label, field (or form), card, badge, alert, theme-switcher
- Mark generated private deps `public: false` if they appear in `components/ui`
- Update `docs/design-system/README.md` to link the registry and the components folder

**Out of scope:**

- Gallery implementation (chunk 11) — but each doc’s `galleryId` should be the id the gallery will use
- Tests (chunk 12) — registry `testing.unit` paths should be the paths you *will* create
- Root README

**Implement:**

1. Schema first. Required fields match FPD §9.5.1.
2. One registry entry per public component: `useWhen`, `doNotUseWhen`, `extendPolicy`, `testing.onChange`, `usedBy`.
3. Each markdown doc: purpose, when to use / not, anatomy, props table, examples, tokens, a11y, related, change policy.
4. Paths in the registry must match files on disk.
5. Do not invent components in the registry that were not built.

**Verify:**

- [ ] JSON validates against the schema (script or a one-off check)
- [ ] Every public file in `src/components` that we consider API is listed
- [ ] Docs examples match the actual props (open Button and compare)
- [ ] Theme-switcher is documented as custom, not a shadcn primitive

**Review:**

- Agent rules are concrete, not “use good judgment”
- `usedBy` is honest (gallery will be added in the next chunk — you may list it now)
- No leftover FPD sample-only Button row if the real Button differs

**Exit check:**

- [ ] Registry + docs agree with the code
- [ ] Ready to build a gallery driven by these ids

**Adjust:** If a component’s API drifted from the FPD table, update the FPD v1 list so chunk 11 does not build stories for variants that do not exist.
