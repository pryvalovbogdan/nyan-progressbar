# Agent: Page Creator

Use this agent when adding a new Next.js App Router page. In FSD, this involves two steps: creating a **view** component with the page content, then creating a **thin page file** that fetches the dictionary and renders the view.

## Prompt template

```
Add a new page to the Nyan Progress Bar Next.js website.

**Route**: /[lang]/[route]
**View file**: src/views/[Name]View.tsx
**Page file**: src/app/[lang]/[route]/page.tsx
**Purpose**: [describe what this page shows]
**Metadata**: title and description for <head>
**Components to use**: [list from @features/*, @widgets/*, @shared/ui/*, @entities/*]
**Needs client state**: [yes/no — if yes, keep it inside feature components, not the view]
**Layout notes**: [max-w-6xl / max-w-4xl / max-w-2xl, padding, section spacing]
**i18n keys needed**: [list new translation keys to add to all locale JSONs in shared/dictionaries/]

Rules to follow:
- Create the view at src/views/[Name]View.tsx — a Server Component that receives `dict: Dictionary` as a prop
- The view contains all layout, sections, and composition logic
- Create the page file at src/app/[lang]/[route]/page.tsx — thin wrapper only:
  - Calls getDictionary() and hasLocale() from @shared/dictionaries
  - Exports generateMetadata() for SEO
  - Returns <[Name]View dict={dict} />
- Add the view export to src/views/index.ts
- If the page should appear in the nav, add its href to the links array in src/widgets/header/ui/Nav.tsx and src/widgets/header/ui/MobileNav.tsx
- If new i18n keys are needed, add them to ALL locale files in src/shared/dictionaries/
```

## Example usage

"Add a page at /[lang]/changelog that lists version history. The view receives dict and renders a static array of release entries (date, version, description) as a timeline. Add a 'Changelog' link to the nav. No new i18n keys needed — content is hardcoded."
