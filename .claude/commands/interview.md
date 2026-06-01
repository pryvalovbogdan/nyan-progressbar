---
description: Interview me about the task before writing any code. Surfaces hidden requirements, edge cases, and architectural decisions upfront.
---

Before writing a single line of code, interview me relentlessly about every aspect of this task. Do not produce any implementation until the interview is complete.

Ask questions in batches of 3–4. Cover all of the following dimensions (skip only those that are clearly irrelevant):

**Scope & requirements**
- What exactly needs to happen? What does "done" look like?
- What are the edge cases and error states?
- Are there any constraints I haven't mentioned?

**Architecture (FSD)**
- Which FSD layer does this live in — `app`, `views`, `widgets`, `features`, `entities`, or `shared`?
- Does it introduce a new slice or extend an existing one?
- Which existing slices does it depend on? Does anything depend on it?

**Data & state**
- Where does the data come from — server (dict/getDictionary), API route, or client state (Zustand)?
- Does this need a new Zustand store, or can it use `customizerStore`?
- What happens while data is loading or if it fails?

**UI & styling**
- What should it look like on mobile vs desktop?
- Does it need dark mode variants beyond the default?
- Are there hover, focus, or active states to handle?
- Does anything animate or transition?

**i18n**
- Does this feature need new translation keys?
- Which of the 10 locales (en, es, pt, vi, id, fr, tl, pl, de, uk) need to be updated?

**Server vs Client**
- Does any part need `'use client'`? (useState, useEffect, event handlers, Zustand hooks)
- Can the outer shell be a Server Component with only leaf nodes marked client?

**Types**
- Do new interfaces belong in a colocated `types.ts` or in `entities/`?
- Are there existing types I can extend rather than duplicate?

After the interview, produce a structured plan:
1. Files to create (layer/slice/filename, purpose)
2. Files to modify (path, what changes)
3. New translation keys needed
4. Blocking dependencies (what must be done first)
5. Open questions still remaining
