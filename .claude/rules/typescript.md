# TypeScript Rules

## Types vs interfaces
- Use `interface` for object shapes (props, API payloads, store types)
- Use `type` only for unions, intersections, or aliases of primitives

## Null safety
- Strict null checks are on — never assume a value is non-null without checking
- Prefer optional chaining (`?.`) and nullish coalescing (`??`) over `|| ''`

## No `any`
- Never use `any`
- Parse external data as `unknown`, then narrow with a type guard function
- Type guard pattern:
  ```ts
  function isFoo(v: unknown): v is Foo {
    if (!v || typeof v !== 'object') return false;
    const p = v as Record<string, unknown>;
    return typeof p.name === 'string';
  }
  ```

## Exports
- Named exports only — no `export default` for components or utilities
- Exception: Next.js pages and layouts must use `export default`

## Props and component types

### Naming
- Props interface must be named `I{ComponentName}Props` (not generic `Props`):
  ```ts
  interface IMyComponentProps {
    title: string;
    onClick: () => void;
  }
  export function MyComponent({ title, onClick }: IMyComponentProps) { ... }
  ```
- All other interfaces follow the same `I` prefix convention: `IStatCardProps`, `INavProps`, etc.

### Sub-components always go in separate files
- Never define a named sub-component inside the same file as its parent. Every component that has its own props gets its own file.
  ```
  widgets/reviews/ui/
    ReviewsSection.tsx  ← composes ReviewCard and Stars
    ReviewCard.tsx      ← own file
    Stars.tsx           ← own file
    types.ts            ← IReviewsSectionProps, IReviewCardProps, IStarsProps, …
  ```
- Add the sub-component's props interface to the shared `types.ts` alongside the parent's.
- This applies at every layer: features, widgets, shared/ui.

### File organisation

A component that has its own props interface must live in its own folder. The folder is named in **kebab-case** for `shared/ui/` primitives and **PascalCase** for widgets/features components (matching the existing filename convention). Layout:

```
{ComponentName}/
  index.ts            ← `export { ComponentName } from './ComponentName';`
  ComponentName.tsx   ← imports from ./types and ./consts (if needed)
  types.ts            ← I{ComponentName}Props + interfaces used only by this component
  consts.ts           ← module-level constants used only by this component (optional)
```

This applies at every layer — `src/shared/ui/`, `src/widgets/*/ui/`, `src/features/*/ui/`. Auto-generated Shadcn primitives in `src/shared/ui/` are exempt.

Where types live:
- **Props interface** for the component → in *its own* `types.ts` only. Never define `I{Name}Props` in another component's `types.ts`, and never inline it above the component.
- **Slice-shared domain types** (e.g. `Review`, `ReviewsLabels`, label-bundle types passed across multiple components in a slice) → keep at the slice's `ui/types.ts` one level up. Re-export from the slice barrel when consumers outside the slice need them.

Components with **zero props** can stay as flat `.tsx` files; the folder rule only triggers when a props interface exists.

**Views** (`src/views/`) are exempt — they may keep `I{Name}ViewProps` inline since they are thin compositions.

Because every component with props lives in its own folder, every component that has its own props is also in its own file — this supersedes the previous "sub-components always go in separate files" rule.

## Async/await
- Always `await` promises — never fire-and-forget unless inside an event handler where you handle errors yourself
