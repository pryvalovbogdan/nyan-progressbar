---
description: Scaffold a new FSD component with types.ts, barrel export, and correct layer placement. Pass the component name and purpose.
---

Scaffold a complete FSD component for this project. Follow every rule below exactly.

**Input I need from context or the task description:**
- Component name (PascalCase)
- FSD layer: `widgets`, `features`, `entities`, or `shared`
- Slice name (kebab-case)
- Purpose (one sentence)
- Props (names + TypeScript types)
- Whether it needs `'use client'`
- Which Shadcn primitives it uses (from `@shared/ui/`)
- Which cross-layer imports it needs (`@entities/*`, `@features/*`, `@widgets/*`, `@shared/*`)
- New translation keys (if any)

**Step 1 — Decide the layer**

| Building… | Layer | Path |
|---|---|---|
| Complex section composed of multiple features | `widgets` | `src/widgets/[slice]/ui/[Name].tsx` |
| Self-contained user feature (form, tool, selector) | `features` | `src/features/[slice]/ui/[Name].tsx` |
| Business domain display component | `entities` | `src/entities/[slice]/ui/[Name].tsx` |
| Generic, domain-agnostic primitive | `shared/ui` | `src/shared/ui/[Name].tsx` |

**Step 2 — Create these files in order**

1. `src/[layer]/[slice]/ui/types.ts`
   - One `interface Props { … }` per component
   - Named exports only
   - Use `import type { … }` for cross-layer types

2. `src/[layer]/[slice]/ui/[Name].tsx`
   - Add `'use client'` only if: useState / useEffect / event handlers / Zustand hooks
   - Named export: `export function [Name]({ … }: Props) { … }`
   - Tailwind only — no CSS modules, no inline style objects except dynamic numeric values
   - Accent color `#80deea` for highlights, active states, CTAs
   - Theme classes: `bg-background`, `bg-card`, `border-border`, `text-muted-foreground`
   - Shadcn imports: `@shared/ui/[component]` — never `@/components/ui/`
   - Cross-layer imports via path aliases (`@shared/*`, `@entities/*`, `@features/*`, `@widgets/*`)
   - Internal imports (same slice) use relative paths (`./types`, `../model/store`)

3. `src/[layer]/[slice]/index.ts` (create or update)
   - Export the component and its public types
   - Example: `export { [Name] } from './ui/[Name]'; export type { Props as [Name]Props } from './ui/types';`

**Step 3 — Add translations (if needed)**

For each new translation key, add it to all 10 locale files:
`src/shared/dictionaries/{en,es,pt,vi,id,fr,tl,pl,de,uk}.json`

Run `npx tsc --noEmit` and `npx eslint src/[layer]/[slice]/ui/[Name].tsx` after creating files. Fix all errors before reporting done.

**Output format:**
- List every file created/modified with its full path
- Show the `Props` interface
- State whether `'use client'` was added and why (or why not)
- List any translation keys added
