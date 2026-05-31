# CLAUDE.md — Nyan Progress Bar Website

## Stack
- **Next.js 16** (App Router, `src/` layout)
- **TypeScript** (strict)
- **Tailwind CSS v4** + **Shadcn/UI** components
- **Zustand** — client state (`src/store/`)
- **Nodemailer** — contact form email (`src/lib/mailer.ts`)
- **next-themes** — dark/light theme

## Project root
`nyan-progressbar/nyan-progressbar/` (inside the parent `nyan-plugin-youtube` monorepo)

## Key folders
| Path | Purpose |
|---|---|
| `src/app/` | Pages and API routes (App Router) |
| `src/components/layout/` | Header, Footer, Nav |
| `src/components/scrubber/` | Cat gallery, cards, live preview |
| `src/components/customizer/` | Height/top sliders + preview panel |
| `src/components/support/` | Ko-Fi / Patreon / BMC tiles |
| `src/components/contact/` | Contact form |
| `src/components/ui/` | Shadcn auto-generated primitives — do not edit |
| `src/data/cats.ts` | Cat registry (mirrors `../../src/js/consts.js`) |
| `src/store/customizerStore.ts` | Zustand store (selectedCat, height, top) |
| `src/lib/mailer.ts` | Nodemailer transporter + sendContactEmail() |
| `src/types/cat.ts` | CatEntry, CatStyles interfaces |
| `public/cats/` | GIFs — auto-copied from `../../assets/*.gif` via `npm run copy-assets` |

## Pages
| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Home: hero + cat gallery + live customizer |
| `/extension` | `src/app/extension/page.tsx` | Chrome extension install page |
| `/support` | `src/app/support/page.tsx` | Ko-Fi / Patreon / Buy Me a Coffee |
| `/contact` | `src/app/contact/page.tsx` | Bug reports and questions form |
| `POST /api/contact` | `src/app/api/contact/route.ts` | Email send endpoint |

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

## Code rules
- `.claude/rules/typescript.md` — TS patterns
- `.claude/rules/tailwind-shadcn.md` — Tailwind/Shadcn patterns
- `.claude/rules/nextjs.md` — App Router conventions
- `.claude/rules/state-management.md` — Zustand patterns
