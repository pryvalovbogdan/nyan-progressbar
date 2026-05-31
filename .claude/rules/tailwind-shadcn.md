# Tailwind + Shadcn/UI Rules

## Styling approach
- Tailwind for all layout and styling — no CSS modules, no inline style objects
- Exception: dynamic numeric values that can't be expressed as Tailwind classes (e.g. `style={{ height: `${h}px` }}`)
- Use `cn()` from `@/lib/utils` when conditionally combining classes

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
