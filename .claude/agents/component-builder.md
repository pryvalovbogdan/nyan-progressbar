# Agent: Component Builder

Use this agent when creating a new React component. First decide which FSD layer it belongs to, then follow the template for that layer.

## Choosing the right layer

| You're building… | Layer | Path pattern |
|---|---|---|
| A reusable UI section composed of multiple features (e.g. a new header widget) | `widgets/` | `src/widgets/[name]/ui/[Name].tsx` |
| A self-contained user feature (form, selector, interactive tool) | `features/` | `src/features/[name]/ui/[Name].tsx` |
| A display component tied to a business entity | `entities/` | `src/entities/[name]/ui/[Name].tsx` |
| A generic, domain-agnostic primitive | `shared/ui/` | `src/shared/ui/[Name].tsx` |

## Prompt template

```
Create a new React component for the Nyan Progress Bar website.

**Component name**: [ComponentName]
**FSD layer**: [widgets | features | entities | shared]
**Feature/slice name**: [e.g. cat-selector, customizer, header]
**Full path**: src/[layer]/[slice]/ui/[ComponentName].tsx
**Purpose**: [describe what it renders / does]
**Props**: [list props with types]
**Styling notes**: [Tailwind classes, accent color #80deea, dark mode requirements]
**Uses Shadcn primitives**: [yes/no — list which ones, import from @shared/ui/[name]]
**Needs Zustand store**: [yes/no — which store, import from @features/[slice]]
**Imports from other layers**: [list any @entities/*, @features/*, @widgets/*, @shared/* imports]

Rules to follow:
- Named export only (no default export)
- Add 'use client' only if the component uses useState, useEffect, event handlers, or Zustand hooks
- Use Tailwind for all styling — no inline styles except for dynamic values (e.g. style={{ height: `${h}px` }})
- Import Shadcn primitives from @shared/ui/[component] (not from @/components/ui/)
- Import cross-layer dependencies via path aliases, not relative paths
- Internal imports within the same feature use relative paths (e.g. ../model/store)
- After creating the component, export it from the slice's index.ts barrel
- Accent color is #80deea — use it for highlights, active states, CTA buttons
- Match dark theme: bg-card, border-border, text-muted-foreground for secondary text
```

## Example usage

"Create a new component `AnnouncementBanner` in the `widgets/announcements` slice. It shows a dismissible top banner with a `message` string prop and a `link` string prop. Uses `@shared/ui/button` to dismiss. Stores dismissed state in local useState."
