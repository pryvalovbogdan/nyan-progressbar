# Agent: API Route Creator

Use this agent when adding a new Next.js App Router API route.

## Prompt template

```
Add a new API route to the Nyan Progress Bar website.

**Route**: /api/[route]
**File**: src/app/api/[route]/route.ts
**Method**: GET | POST | PUT | DELETE
**Request body**: [TypeScript interface or 'none']
**Response body**: [TypeScript interface]
**Side effects**: [e.g. sends email via mailer.ts, reads from DB, etc.]
**Auth required**: [yes/no]

Rules to follow:
- Use NextRequest / NextResponse from 'next/server'
- Validate the request body with a type guard function (isXPayload) — no zod
- Return { error: string } with appropriate status on failure
- Return { ok: true } or the data object on success
- Log errors with console.error('[route-name] description', err)
- No any — use unknown for parsed JSON then narrow with a type guard
```

## Example usage

"Add a POST /api/subscribe route. Body: { email: string }. Saves the email to a text file on the server. Returns { ok: true } on success. Validate that email contains @."
