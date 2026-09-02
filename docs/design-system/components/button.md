# Button

## Purpose

Primary interactive control for actions.

## When to use

- Submit, confirm, or trigger an in-page action
- Consistent affordance with variants and sizes

## When not to use

- Static route navigation — use `Link` with button styling
- Icon-only without `aria-label`

## Props / variants

| Prop | Values |
| --- | --- |
| `variant` | `default`, `secondary`, `outline`, `ghost`, `destructive`, `link` |
| `size` | `xs`, `sm`, `default`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg` |

## Theming

Uses `primary`, `secondary`, `destructive`, `ring`, `radius` tokens. Corner radius: `rounded-md` (default), tighter on `xs`/`sm` sizes.

## Accessibility

Native `<button>` semantics. Visible focus ring. Disabled is non-interactive.

## Change policy

See [`component-registry.json`](../component-registry.json) → `button`.
