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

### File organisation
- **Features and widgets** — put all types (including Props) in `types.ts` next to the component; put module-level constants in `consts.ts` next to the component:
  ```
  features/my-feature/ui/
    MyComponent.tsx   ← imports from ./types and ./consts
    types.ts          ← IMyComponentProps + all other interfaces
    consts.ts         ← constants used by the component(s)
  ```
- **Views** (`src/views/`) — Props may stay inline since views are thin compositions with a single `dict: Dictionary` prop; rename to `I{Name}ViewProps` regardless.
- Never define a component Props interface outside `types.ts` (for features/widgets) or directly above the component (for views).

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

## Async/await
- Always `await` promises — never fire-and-forget unless inside an event handler where you handle errors yourself
