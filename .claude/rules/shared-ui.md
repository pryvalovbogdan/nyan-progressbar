# Shared UI Reuse Rules

This rule is the single source of truth for *what to reuse* and *when to promote* a pattern into `src/shared/ui/`. It is stricter than `tailwind-shadcn.md` and supersedes it where they overlap.

## 1. Reuse first

Before writing UI, scan `src/shared/ui/` and the utility classes in `src/shared/theme/globals.css`. If a primitive fits, use it. If a near-fit exists, extend it (add a variant) — do not clone it.

Concretely, this means **never**:

- Raw `<button>` — use `Button` (or `<Button variant="ghost" size="icon">` for icon buttons).
- Raw `<input>` / `<textarea>` — use `Input` / `Textarea`.
- Raw `<select>` — use `Select`.
- Raw `<hr>` or ad-hoc `border-t border-border` for visual separation — use `Separator`.
- Hand-rolled card container (`<div className="rounded-* border bg-card …">`) — use `Card` (or the `.card` utility class for the simplest case).
- Inline pill/badge (`<span className="rounded px-1.5 py-0.5 …">`) — use `Badge`.
- Hand-rolled `<label>` for form fields — use `Label`.
- Inline `text-[#80deea] hover:underline` on a link — use the `.link-accent` utility class.

## 2. Allowed primitives today

Shadcn primitives (from `src/shared/ui/`, barrel-exported via `@shared/ui`):
`Accordion`, `Badge`, `Button`, `Card` (+ `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`), `Input`, `Label`, `Select`, `Separator`, `Slider`, `Sonner` (toast), `Textarea`, `GoogleAd`.

App composites (also in `src/shared/ui/`):
`PageContainer`, `SectionHeading`, `FeatureCard`, `CTACard`, `SelectableCard`, `StarRating`.

Utility classes (defined in `src/shared/theme/globals.css`):
- `.card` — `rounded-xl border border-border bg-card`. Use when you need a card *background* without the full `Card` component composition.
- `.btn-press` — `transition-all duration-200 active:scale-[0.97]`. Use for press-feedback on non-`Button` interactive elements (rare; prefer `Button`).
- `.link-accent` — `text-[#80deea] hover:underline`. Use for any `<a>` / `<Link>` styled with the accent color.

## 3. When to promote a pattern into `shared/ui/`

If a JSX shape with **matching Tailwind classes** appears in **3 or more places** across different files, extract it into a primitive in `src/shared/ui/`. Two occurrences stay inline.

When extracting:

- Keep it domain-agnostic. No `dict` prop, no imports from `entities/` or `features/`. Pass text as children or string props.
- Compose existing primitives where possible (e.g. `FeatureCard` wraps `Card`/`CardHeader`/`CardContent`, it doesn't redefine card styling).
- Add a `types.ts` sibling with `I{Name}Props` if props are non-trivial; otherwise keep the interface inline above the component.
- Re-export from `src/shared/ui/index.ts`.

If the component needs `dict.*`, business logic, or imports from `entities/`/`features/`, it does **not** belong in `shared/ui/` — put it in `widgets/` or in the relevant feature slice.

## 4. Don't reinvent variants

When an existing primitive needs a new look (e.g. an accent CTA button), add a variant to its `cva` config — do not create a new component or hard-code the styles at the call site.

**Wrong:**
```tsx
<Button className="bg-[#80deea] text-background font-semibold hover:bg-[#80deea]/90">
  Install
</Button>
```

**Right** — extend `buttonVariants` in `src/shared/ui/button.tsx`:
```ts
variant: {
  // …
  accent: 'bg-[#80deea] text-background font-semibold hover:bg-[#80deea]/90'
}
```
…then:
```tsx
<Button variant="accent">Install</Button>
```

## 5. Worked example — `PageContainer`

The wrapper `<div className="mx-auto max-w-6xl px-4 py-8 sm:py-16 space-y-12 sm:space-y-20">` appears in every view. That is duplication, not flexibility. Use `PageContainer`:

```tsx
<PageContainer maxWidth="6xl" space="lg">
  {/* sections */}
</PageContainer>
```

The same principle applies to `SectionHeading`, `FeatureCard`, `CTACard`, `SelectableCard`, and `StarRating` — see their source for the prop shape.

## 6. Pre-commit checklist

Before opening a PR, mentally answer:

- Did I write any raw `<button>`, `<input>`, `<textarea>`, `<select>`, `<hr>`? If yes — replace.
- Did I repeat a JSX shape I already wrote elsewhere? If 3+ times — extract.
- Did I hard-code `bg-[#80deea]` or `text-[#80deea] hover:underline`? If yes — use `<Button variant="accent">` or `.link-accent`.
- Did I add a new primitive without exporting it from `src/shared/ui/index.ts`? Fix the barrel.
