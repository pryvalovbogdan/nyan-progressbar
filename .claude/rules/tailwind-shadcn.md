# Tailwind + Shadcn/UI Rules

## Styling approach
- Tailwind for all layout and styling — no CSS modules
- Use `cn()` from `@shared/lib/utils` when conditionally combining classes

### No inline `style={{...}}` on DOM elements

Tailwind classes are the only way to style elements. The `style` prop is **disallowed** except in four narrow cases:

1. **Dynamic numeric values driven by JS state or props** that have no compile-time analog — e.g. `style={{ height: `${h}px`, top: `${top}px` }}` when `h` comes from a Zustand store, slider, or computed layout. Use arbitrary Tailwind classes (`h-[40px]`) when the value is static.
2. **CSS custom properties** fed at runtime to a keyframe animation or to a third-party component's theme contract (e.g. the heart-float animation in `globals.css`, the Sonner toaster). These must be cast `as React.CSSProperties` for type safety.
3. **Runtime-derived layout transitions** where the value itself is dynamic (`gridTemplateRows: expanded ? '1fr' : '0fr'`, staggered `transitionDelay`). Conditional class toggles belong in `className` via `cn()`; only the genuinely dynamic property stays inline.
4. **Auto-generated Shadcn primitives** in `src/shared/ui/*.tsx` — not our code to police.

Everything else — gradients, static colors, `display`, conditional brand colors driven by data — must use a Tailwind class. For values that are syntactically too long for an arbitrary class (multi-stop gradients, multi-line `box-shadow`), add a named utility to `@layer components` in `src/shared/theme/globals.css` and reference it by class. For data-driven brand colors, attach a Tailwind class to the data row instead of a hex value.

When in doubt: if you can write the value at the keyboard *without* a JS interpolation, it's static — use a class.

## Shadcn primitives
- Always use Shadcn components from `@/components/ui/` for: Button, Card, Input, Textarea, Select, Label, Slider, Badge, Separator, Sonner (toast)
- Never manually recreate what a Shadcn component already provides
- To add a new Shadcn component: `npx shadcn@latest add <component-name>`
- Do not edit files in `src/components/ui/` directly — they are auto-generated

## Design tokens
- Accent color: `#80deea` (cyan) — used for highlights, active states, primary CTAs
- Use CSS variable classes for theming: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`
- Avoid hardcoded colors except for the accent `#80deea`

## Dark mode
- Default theme is dark — design dark-first
- Use `dark:` prefix for light-mode overrides if needed
- ThemeProvider from `next-themes` handles the toggle

## Interactive states
- Hover: `-translate-y-1`, border/shadow transition
- Active: `scale(0.96)` or similar subtle press feedback
- Transition: `transition-all duration-200` or specific properties

## Shadow pattern for cards
```
hover:shadow-[0_4px_16px_rgba(128,222,234,0.2)]   /* accent glow */
hover:shadow-[0_8px_24px_rgba(128,222,234,0.12)]  /* subtler glow */
```
