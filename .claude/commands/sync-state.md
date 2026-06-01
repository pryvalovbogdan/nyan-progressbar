---
description: Update PROJECT-STATE.md to reflect the current codebase structure. Run after adding pages, components, API routes, or translation keys.
---

Read the current codebase and update `PROJECT-STATE.md` in the project root. Update ONLY the sections that changed — do not rewrite sections that are still accurate.

**Steps:**

1. Run `find src -name "*.tsx" -o -name "*.ts" | grep -v node_modules | sort` to get the current file tree.
2. Diff it mentally against the existing `PROJECT-STATE.md` (or create the file if it doesn't exist).
3. Update only the changed sections below.

---

**`PROJECT-STATE.md` structure to maintain:**

```markdown
# Project State — Nyan Progress Bar Website
_Last updated: [date]_

## Stack
Next.js 16 · TypeScript · Tailwind CSS v4 · Shadcn/UI · Zustand · Nodemailer · next-themes

## FSD Layers

### app/
| Route | Page file | View |
|---|---|---|
[one row per route]

### views/
| File | Purpose |
|---|---|
[one row per view — max one line each]

### widgets/
| Slice | Components | Notes |
|---|---|---|
[one row per widget slice]

### features/
| Slice | Components | Store |
|---|---|---|
[one row per feature slice]

### entities/
| Slice | Models | Data |
|---|---|---|

### shared/
| Path | Contents |
|---|---|
shared/ui | Shadcn primitives (button, card, input, …)
shared/lib | utils.ts (cn), mailer.ts
shared/dictionaries | 10 locales: en es pt vi id fr tl pl de uk

## API Routes
| Method | Path | Handler |
|---|---|---|

## Zustand Stores
| Store | Location | State keys |
|---|---|---|

## Translation Keys
Top-level keys in each locale JSON: [list them]
New keys added recently: [list with which files they appear in]

## Design Tokens
Accent: #80deea · Google yellow: #FBBC04 · Theme: dark-first
CSS vars: bg-background, bg-card, border-border, text-foreground, text-muted-foreground

## Active Conventions
- Named exports only (except Next.js pages/layouts)
- Types in colocated types.ts
- Shadcn imports from @shared/ui/[component]
- Cross-layer imports via path aliases
- 'use client' pushed to leaf components only
```

**Rules:**
- Each row max one line — no paragraphs
- Do not add commentary or rationale inside the table
- Do not remove rows for things that still exist
- After writing, run `npx tsc --noEmit` to confirm the state is consistent with the actual build
