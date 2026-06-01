---
description: Audit a component or feature for JS-driven visual behaviour that native CSS could handle. Suggests CSS replacements before reaching for JavaScript or a library.
---

Audit the specified component (or the most recently discussed one) for visual behaviours that are implemented in JavaScript but could be replaced with native CSS. This project uses Tailwind CSS v4 — prefer Tailwind utilities, fall back to `style={}` only for dynamic numeric values.

**Check for these JS→CSS replacements:**

| If the code uses… | Consider replacing with… |
|---|---|
| `useState` for open/closed toggle | CSS `:has()` selector or `details`/`summary` |
| `useState` + scroll listener for sticky/visible | `position: sticky`, `IntersectionObserver` → `content-visibility` |
| `ResizeObserver` for layout changes | CSS container queries (`@container`) |
| JS-driven scroll animations | `animation-timeline: scroll()` (scroll-driven animations) |
| `visibility: hidden` toggled by JS | `content-visibility: auto` for off-screen content |
| Manual virtualization for moderate lists (<10k) | `content-visibility: auto` on list items |
| JS class toggle for sibling/parent state | CSS `:has()` selectors |
| `useEffect` for enter/exit animations | CSS `@keyframes` + `transition`, or Tailwind `animate-*` |
| `window.matchMedia` for responsive logic | CSS media queries / container queries |
| JS measuring element dimensions | CSS custom properties + `calc()` |

**JavaScript is appropriate (do not flag) for:**
- Drag-and-drop interactions
- Complex multi-touch gestures
- Canvas or WebGL rendering
- Lists exceeding 10,000 items (real virtualization needed)
- Animations that depend on JS-computed values (physics, spring)
- State that genuinely needs to be shared across distant components

**Output format:**

For each finding:
```
file/path.tsx:42
  Current: [describe the JS implementation]
  CSS alternative: [concrete Tailwind classes or CSS snippet]
  Trade-off: [any browser support concern or edge case to watch for]
```

If no JS→CSS improvements are found, say so clearly. Do not invent improvements that wouldn't actually simplify the code.

After listing findings, rank them by impact (complexity removed / lines deleted) and implement the top one if the user agrees.
