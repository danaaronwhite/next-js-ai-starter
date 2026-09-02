# 02 — shadcn and token wiring

**Goal:** shadcn/ui is initialized so semantic tokens (`bg-primary`, `text-foreground`, `rounded-md`) resolve through Tailwind v4 `@theme inline`. No Blue/Teal palettes yet.

**Depends on:** Chunk 01 exit check green.

**In scope:**

- `pnpm dlx shadcn@latest init` (New York, RSC, CSS variables)
- Token mapping in global CSS (`@theme inline` or the generated equivalent)
- `cn()` / `lib/utils`
- Confirm a single semantic color (`primary`) paints a throwaway element

**Out of scope:**

- Custom Blue/Teal files (chunk 03)
- Installing the v1 component set (chunks 05–08)
- `docs/design-system/README.md` (chunk 04)
- Theme switcher

**Implement:**

1. Run the current shadcn Next.js init. Prefer New York, TypeScript, CSS variables, Lucide.
2. Follow FPD §8.3. If init writes tokens into `globals.css`, keep that; do not invent a second Tailwind JS config that fights v4.
3. Use `@theme inline` when tokens reference CSS variables (required for dark mode later).
4. Add a temporary, obvious use of `bg-primary` / `text-primary-foreground` on the default page so you can see tokens work. Remove or replace it in chunk 11.
5. Do not hardcode hex/oklch in any component file.

**Verify:**

- [ ] `pnpm dev` — primary background is visible on the throwaway element
- [ ] `pnpm build` still succeeds
- [ ] `src/lib/utils.ts` (or equivalent) exports `cn`
- [ ] `components.json` exists and `cssVariables` is true

**Review:**

- Token names are semantic, not “blue-500” in JSX
- No duplicate Tailwind configs
- Diff is init + wiring only

**Exit check:**

- [ ] `bg-primary` works
- [ ] Ready to replace default palette values with Blue and Teal

**Adjust:** If shadcn’s generated file layout differs from the FPD (`src/styles/` vs `src/app/globals.css`), write the actual paths into the FPD and into chunks 03–04. Do not fight the generator.
