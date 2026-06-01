---
description: Review staged or specified files against project conventions. Reports must-fix, should-fix, and nit issues with file:line references.
---

Review the code in the files provided (or run `git diff --staged` if no files are specified). Check against every category below. Skip a category entirely if there are zero findings — do not pad the review with "looks good" comments.

**Review categories**

**1. FSD layer violations**
- Does any `shared` file import from `features`, `widgets`, or `views`?
- Does any `feature` import from `widgets` or `views`?
- Are cross-layer imports using path aliases (`@shared/*`, `@features/*`, etc.) not relative paths?
- Does every `features/*/`, `widgets/*/`, `entities/*/` folder have an `index.ts` barrel?
- Are consumers importing from the barrel (`@features/customizer`) not internal paths (`@features/customizer/model/customizerStore`)?

**2. TypeScript**
- Any use of `any`? → must fix (use `unknown` + type guard)
- Missing types on function params or return values?
- Are all interfaces in a colocated `types.ts`? (not inline in the component file)
- `export default` used outside of Next.js page/layout files? → must fix

**3. React / Next.js**
- `'use client'` added to a component that doesn't need it? (no useState/useEffect/handlers/Zustand)
- `'use client'` missing on a component that does use them?
- Server Component importing from a client-only module?
- `<img>` used instead of `next/image`?
- `<a>` used for internal navigation instead of `next/link`?
- Page file doing more than: fetch dict + return view? (logic belongs in the view)

**4. Styling**
- Hardcoded color values that aren't the accent (`#80deea`) or Google yellow (`#FBBC04`)?
- Arbitrary Tailwind values (`w-[123px]`) where a design token exists?
- Inline style objects used for non-dynamic values?
- Shadcn primitives imported from `@/components/ui/` instead of `@shared/ui/`?

**5. i18n**
- Any hardcoded user-visible string (not a dev comment)?
- New translation keys added to `en.json` but missing from other locales?

**6. State management**
- Zustand store created outside `features/[name]/model/`?
- Store hook called inside a condition or loop?
- Global state used for something that should be local `useState`?

**7. Performance**
- Large data arrays or expensive computations not memoized when inside a render?
- Missing `key` props on mapped elements, or `key={index}` on reorderable lists?
- `useEffect` with missing or wrong dependencies?

**Output format**

Group findings by file. For each finding:
```
[must fix | should fix | nit] file/path.tsx:42 — description of the issue and suggested fix
```

End with a one-line summary: total must-fix / should-fix / nit counts. If zero findings across all categories, say "No issues found."
