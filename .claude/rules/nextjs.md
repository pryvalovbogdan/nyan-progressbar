# Next.js App Router Rules

## Server vs Client components
- All components are Server Components by default
- Add `'use client'` at the top only when the component uses:
  - `useState`, `useReducer`, `useEffect`, `useRef`
  - Event handlers (onClick, onChange, onSubmit)
  - Browser APIs (localStorage, window, document)
  - Zustand store hooks
- Keep `'use client'` as deep in the tree as possible — push it to leaf components

## Pages (FSD: thin wrappers)
- Page files live in `src/app/[lang]/[route]/page.tsx`
- Pages must be thin: fetch the dictionary, export metadata, return a view component
- All layout and composition logic belongs in the view (`src/views/[Name]View.tsx`), not the page
- Page wrapper used inside views: `<div className="mx-auto max-w-6xl px-4 py-8 sm:py-16 space-y-12 sm:space-y-20">`

## Views
- Views live in `src/views/` and are Server Components
- Each view receives `dict: Dictionary` (and optionally `locale: string`) as props
- Views compose features and widgets — they do not contain inline business logic
- Export every view from `src/views/index.ts`

## API Routes
- Use Route Handlers (`route.ts`) in `src/app/api/`
- Import `NextRequest`, `NextResponse` from `'next/server'`
- Import server utilities from `@shared/lib/` only
- Validate all incoming data — never trust raw request body

## Navigation
- Use `<Link>` from `next/link` for internal navigation
- Use `<a>` with `target="_blank" rel="noopener noreferrer"` for external links
- Use `<Image>` from `next/image` for all images — add `unoptimized` for GIFs
- Nav links array lives in `src/widgets/header/ui/Nav.tsx` and `src/widgets/header/ui/MobileNav.tsx`

## i18n
- All routes are under `src/app/[lang]/` — locale is a URL segment
- `getDictionary(locale)` and `hasLocale()` are imported from `@shared/dictionaries`
- When adding a new translation key, add it to **all** locale JSON files in `src/shared/dictionaries/`

## Fonts
- Font is loaded in `src/app/[lang]/layout.tsx` via `next/font/google`
- Apply font class to `<html>` element, not `<body>`

## Environment variables
- Server-only vars (SMTP_*): access via `process.env.VAR_NAME` — only in Server Components or API routes
- Client vars: prefix with `NEXT_PUBLIC_` — accessible in client components
