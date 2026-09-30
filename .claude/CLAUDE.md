# CLAUDE.md — Nyan Progress Bar Website

## Design Context
- **Register:** brand (marketing + support site — design sells the extension). **Platform:** web.
- Strategic context lives in [`PRODUCT.md`](../PRODUCT.md); visual system in `DESIGN.md`. Read them before design work.
- Core claim every page reinforces: **cats replace the YouTube scrubber**. Personality: playful, cute, joyful — but polished, never sketchy-freeware or cold/sterile. Primary CTA "Add to Chrome"; fallback is the on-site live customizer.

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

## Slash commands (`.claude/commands/`)

These commands are available as `/command-name`. Suggest them proactively at the right moment:

| Command | When to suggest it |
|---|---|
| `/interview` | User describes a feature vaguely or with open questions — suggest before writing any code |
| `/scaffold` | User asks to add a new component, widget, or feature slice |
| `/review` | Before committing, or when user asks for a code review |
| `/css-first` | Component uses `useState`/`useEffect` purely for visual toggle, animation, or layout |
| `/sync-state` | After a significant structural change (new page, new slice, new API route) |

**Rules for using commands:**
- Suggest `/interview` whenever a task has ambiguity — do not start implementing until requirements are clear
- Always run `/review` mentally before reporting a task complete; flag any must-fix findings
- Never skip `/scaffold` conventions (types.ts, barrel export, tsc+eslint check) when building new components

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
- `.claude/rules/i18n.md` — i18n rules: all visible text must come from translations
- `.claude/rules/shared-ui.md` — reuse-first policy for `shared/ui` primitives + when to promote

## Installed plugins

Two marketplace plugins are installed. Their skills are invoked via the Skill tool (or `/name`). Prefer these workflows over ad-hoc improvisation.

### superpowers (`claude-plugins-official`)

Structured engineering workflows. Apply them in this order for non-trivial work:

| Phase | Skill | When |
|---|---|---|
| Discover | `brainstorming` | Before any new feature/component/behavior change — explore intent before code. Pairs with the project's `/interview`. |
| Plan | `writing-plans` | Once requirements are clear and the task is multi-step. |
| Execute | `executing-plans`, `subagent-driven-development`, `dispatching-parallel-agents` | Working through a written plan; use parallel agents only for genuinely independent tasks. |
| Build | `test-driven-development` | Writing any feature or bugfix — tests before implementation. |
| Debug | `systematic-debugging` | Any bug, test failure, or unexpected behavior — before proposing a fix. |
| Isolate | `using-git-worktrees` | Feature work that should not touch the current workspace. |
| Review | `requesting-code-review`, `receiving-code-review` | Before merging; verify feedback with rigor, don't rubber-stamp. |
| Ship | `verification-before-completion`, `finishing-a-development-branch` | Before claiming done — run the checks and show output; then decide merge/PR/cleanup. |

**Rules:**
- Do not claim work is "done", "fixed", or "passing" without `verification-before-completion` — evidence (command output) before assertions.
- `brainstorming` and `writing-plans` come *before* touching code on anything non-trivial; this reinforces, not replaces, the project's `/interview` habit.
- Use `test-driven-development` and `systematic-debugging` as the default path, not a fallback.

### claude-mem (`thedotmack`)

Persistent cross-session memory. It captures observations automatically and injects relevant memory into context; you don't manage the store by hand.

| Skill | When |
|---|---|
| `mem-search` | Start of a task — check "did we solve this before?" / "how did we do X last time?" before re-deriving. |
| `learn-codebase` | Priming an unfamiliar area; reads source in full. |
| `smart-explore` | Structural/AST search instead of reading whole files. |
| `make-plan` → `do` | claude-mem's own plan-then-execute pair (analogous to superpowers' plan/execute). Pick one plan workflow per task, don't mix. |

**Rules:**
- Run `mem-search` before large tasks to reuse prior decisions.
- claude-mem is separate from this repo's file-based memory (`.claude/.../memory/`). Keep durable, project-specific facts in the file-based memory + `MEMORY.md` index per the memory instructions; treat claude-mem as automatic session recall, not a substitute.
- Don't invoke `babysit`, `version-bump`, `cloud-sync`, or the report skills (`timeline-report`, `weekly-digests`, etc.) unless the user explicitly asks.

### Choosing a plan workflow

Three plan/execute paths now exist: the project's `/interview` + `/scaffold`, superpowers' `writing-plans` + `executing-plans`, and claude-mem's `make-plan` + `do`. Default to the project commands for FSD component/page work; reach for superpowers for broader multi-step engineering; use claude-mem's pair only when the user names it. Never run two plan workflows for the same task.

## Skills are organized into bucket folders under `skills/`:

- `engineering/` — daily code work
- `productivity/` — daily non-code workflow tools
- `misc/` — kept around but rarely used
- `personal/` — tied to my own setup, not promoted
- `in-progress/` — drafts not yet ready to ship
- `deprecated/` — no longer used

Every skill in `engineering/`, `productivity/`, or `misc/` must have a reference in the top-level `README.md` and an entry in `.claude-plugin/plugin.json`. Skills in `personal/`, `in-progress/`, and `deprecated/` must not appear in either.

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.

Each bucket folder has a `README.md` that lists every skill in the bucket with a one-line description, with the skill name linked to its `SKILL.md`. Bucket `README.md`s and the top-level `README.md` group entries into **User-invoked** and **Model-invoked**.
