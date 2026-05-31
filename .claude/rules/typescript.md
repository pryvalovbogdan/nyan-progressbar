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

## Props
- Always define a `Props` interface directly above the component:
  ```ts
  interface Props {
    title: string;
    onClick: () => void;
  }
  export function MyComponent({ title, onClick }: Props) { ... }
  ```

## Async/await
- Always `await` promises — never fire-and-forget unless inside an event handler where you handle errors yourself
