# Agent: Page Creator

Use this agent when adding a new Next.js App Router page.

## Prompt template

```
Add a new page to the Nyan Progress Bar Next.js website.

**Route**: /[route]
**File**: src/app/[route]/page.tsx
**Purpose**: [describe what this page shows]
**Metadata**: title and description for <head>
**Components to use**: [list existing components from src/components/]
**Needs client state**: [yes/no]
**Layout notes**: [max-w-*, padding, section spacing]

Rules to follow:
- Pages are Server Components by default — only add 'use client' if the page itself needs hooks
- Export metadata const for SEO
- Use max-w-6xl (or max-w-4xl / max-w-2xl for narrow content) with px-4 py-16 wrapper
- Add the route to src/components/layout/Nav.tsx links array if it should appear in the nav
```

## Example usage

"Add a page at /changelog that lists version history. It's a Server Component. Uses a static array of release entries (date, version, description). Rendered as a timeline list. Add it to the Nav."
