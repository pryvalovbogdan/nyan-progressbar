# Next.js App Router Rules

## Server vs Client components
- All components are Server Components by default
- Add `'use client'` at the top only when the component uses:
  - `useState`, `useReducer`, `useEffect`, `useRef`
  - Event handlers (onClick, onChange, onSubmit)
  - Browser APIs (localStorage, window, document)
  - Zustand store hooks
- Keep `'use client'` as deep in the tree as possible — push it to leaf components

## Pages
- Page files export a default async function
- Export a `metadata` const (or `generateMetadata` function) for SEO in every page
- Pages should be thin: import and compose components, not contain logic
- Page wrapper: `<div className="mx-auto max-w-6xl px-4 py-16 space-y-20">`

## API Routes
- Use Route Handlers (`route.ts`) in `src/app/api/`
- Import `NextRequest`, `NextResponse` from `'next/server'`
- Validate all incoming data — never trust raw request body

## Navigation
- Use `<Link>` from `next/link` for internal navigation
- Use `<a>` with `target="_blank" rel="noopener noreferrer"` for external links
- Use `<Image>` from `next/image` for all images — add `unoptimized` for GIFs

## Fonts
- Font is loaded in `src/app/layout.tsx` via `next/font/google`
- Apply font class to `<html>` element, not `<body>`

## Environment variables
- Server-only vars (SMTP_*): access via `process.env.VAR_NAME` — only in Server Components or API routes
- Client vars: prefix with `NEXT_PUBLIC_` — accessible in client components
