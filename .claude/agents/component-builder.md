# Agent: Component Builder

Use this agent when you need to create a new React component for the website.

## Prompt template

```
Create a new React component for the Nyan Progress Bar website.

**Component name**: [ComponentName]
**Location**: src/components/[folder]/[ComponentName].tsx
**Purpose**: [describe what it renders / does]
**Props**: [list props with types]
**Styling notes**: [Tailwind classes, accent color #80deea, dark mode requirements]
**Uses Shadcn primitives**: [yes/no — list which ones from src/components/ui/]
**Needs Zustand store**: [yes/no — which store and what it reads/writes]

Rules to follow:
- Named export only (no default export)
- Add 'use client' only if the component uses useState, useEffect, or event handlers
- Use Tailwind for all styling — no inline styles except for dynamic values (e.g. style={{ height: `${h}px` }})
- Use Shadcn primitives from @/components/ui/ for buttons, inputs, cards, etc.
- Accent color is #80deea — use it for highlights, active states, CTA buttons
- Match dark theme: bg-card, border-border, text-muted-foreground for secondary text
```

## Example usage

"Create a new component AnnouncementBanner in src/components/layout/ that shows a dismissible top banner. It has a message prop (string) and a link prop (string). Uses Shadcn Button to dismiss. Stores dismissed state in localStorage via useEffect."
