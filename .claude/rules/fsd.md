# Feature-Sliced Design (FSD) Rules

## Layer hierarchy (top imports from bottom, never the reverse)
```
app → views → widgets → features → entities → shared
```

Violations: a `shared` file must never import from `features`; a `feature` must never import from `widgets` or `views`.

## Import rules
- **Within a layer**: use relative imports (`./`, `../`)
- **Across layers**: always use path aliases (`@shared/*`, `@entities/*`, `@features/*`, `@widgets/*`, `@views/*`)
- Never use `@/*` in new code — it bypasses layer boundaries and makes imports ambiguous

## Barrel exports (index.ts)
Every folder in `features/`, `widgets/`, `entities/` must have an `index.ts` that defines its public API:
```ts
// src/features/customizer/index.ts
export { CustomizerPanel } from './ui/CustomizerPanel';
export { useCustomizerStore } from './model/customizerStore';
```
Outside consumers import from the barrel, not from internal paths:
```ts
// ✅ correct
import { useCustomizerStore } from '@features/customizer';

// ❌ wrong — exposes internals
import { useCustomizerStore } from '@features/customizer/model/customizerStore';
```

## Folder structure per slice
```
features/[name]/
  model/        ← Zustand stores, types, business logic
  ui/           ← React components
  index.ts      ← public barrel export

widgets/[name]/
  ui/           ← React components
  index.ts      ← public barrel export

entities/[name]/
  model/        ← TypeScript interfaces + static data
  index.ts      ← public barrel export
```

## Where does new code go?

| What you're building | Layer |
|---|---|
| New page layout / full-page content | `src/views/` |
| Complex section used across pages | `src/widgets/` |
| New user-facing feature (form, selector, tool) | `src/features/` |
| Business data model or static registry | `src/entities/` |
| Reusable utility, hook, or UI primitive | `src/shared/` |
| Route file (URL → view) | `src/app/` |

## shared/ui
- Contains Shadcn auto-generated primitives — **do not edit** these files
- To add a new primitive: `npx shadcn@latest add <component>`
- Import from `@shared/ui/[component]` or from the barrel `@shared/ui`

## shared/lib
- `utils.ts` — `cn()` helper only
- `mailer.ts` — Nodemailer server-side only; never import in client components

## shared/dictionaries
- `getDictionary(locale)` — async, returns typed `Dictionary`
- `hasLocale(string)` — type guard
- `locales`, `defaultLocale` — locale constants
- Import as `@shared/dictionaries`
