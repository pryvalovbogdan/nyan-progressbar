# CLAUDE.md — Nyan Progress Bar Website

## Stack
- **Next.js 16** (App Router, `src/` layout)
- **TypeScript** (strict)
- **Tailwind CSS v4** + **Shadcn/UI** components
- **Zustand** — client state (inside `src/features/*/model/`)
- **Nodemailer** — contact form email (`src/shared/lib/mailer.ts`)
- **next-themes** — dark/light theme

## Project root
`nyan-progressbar/nyan-progressbar/` (inside the parent `nyan-plugin-youtube` monorepo)

## Architecture
Feature-Sliced Design (FSD). Layers from top to bottom — upper layers import from lower ones only:

```
app/        → Next.js routing only; pages are thin wrappers around views
views/      → Full-page compositions (one per route)
widgets/    → Complex multi-component UI sections (header, footer, preview)
features/   → Self-contained feature modules (cat-selector, customizer, contact-form)
entities/   → Business domain models and static data (cat types + data)
shared/     → Domain-agnostic utilities (ui primitives, lib, dictionaries)
```

## Key folders
| Path | Purpose |
|---|---|
| `src/app/[lang]/` | Thin page files + locale routing |
| `src/app/api/` | API route handlers |
| `src/views/` | Full-page view components (HomeView, ExtensionView, etc.) |
| `src/widgets/header/` | Header, Nav, MobileNav, ThemeToggle, LanguageSelector |
| `src/widgets/footer/` | Footer |
| `src/widgets/cat-preview/` | ScrubberPreview (live preview panel) |
| `src/features/cat-selector/` | ScrubberGallery + ScrubberCard |
| `src/features/customizer/` | CustomizerPanel + customizerStore (Zustand) |
| `src/features/contact-form/` | ContactForm |
| `src/entities/cat/` | CatEntry / CatStyles types + catsData / catsList |
| `src/shared/ui/` | Shadcn auto-generated primitives — do not edit |
| `src/shared/lib/` | utils.ts (cn helper), mailer.ts |
| `src/shared/dictionaries/` | i18n JSON files + getDictionary() |
| `public/cats/` | GIFs — auto-copied from `../../assets/*.gif` via `npm run copy-assets` |

## Path aliases
| Alias | Resolves to |
|---|---|
| `@shared/*` | `src/shared/*` |
| `@entities/*` | `src/entities/*` |
| `@features/*` | `src/features/*` |
| `@widgets/*` | `src/widgets/*` |
| `@views/*` | `src/views/*` |
| `@/*` | `src/*` (legacy, avoid in new code) |

## Pages
| Route | Page file | View component |
|---|---|---|
| `/[lang]` | `src/app/[lang]/page.tsx` | `src/views/HomeView.tsx` |
| `/[lang]/extension` | `src/app/[lang]/extension/page.tsx` | `src/views/ExtensionView.tsx` |
| `/[lang]/support` | `src/app/[lang]/support/page.tsx` | `src/views/SupportView.tsx` |
| `/[lang]/contact` | `src/app/[lang]/contact/page.tsx` | `src/views/ContactView.tsx` |
| `POST /api/contact` | `src/app/api/contact/route.ts` | — |

## Environment variables
Copy `.env.local.example` to `.env.local` and fill in SMTP credentials.

## Dev commands
```bash
npm run dev          # copy assets + start dev server
npm run build        # copy assets + production build
npm run copy-assets  # copy GIFs from ../../assets/ to public/cats/
```

## Adding a new page
See `.claude/agents/page-creator.md`

## Adding a new component
See `.claude/agents/component-builder.md`

## Adding a new API route
See `.claude/agents/api-route-creator.md`

## Code rules
- `.claude/rules/fsd.md` — FSD layer rules and import conventions
- `.claude/rules/typescript.md` — TS patterns
- `.claude/rules/tailwind-shadcn.md` — Tailwind/Shadcn patterns
- `.claude/rules/nextjs.md` — App Router conventions
- `.claude/rules/state-management.md` — Zustand patterns
