
# State Management Rules (Zustand)

## Store location
- Stores live inside the feature they belong to: `src/features/[name]/model/[name]Store.ts`
- Currently: `src/features/customizer/model/customizerStore.ts` (selectedCat, height, top)
- Export the store hook from the feature's `index.ts` barrel so consumers import from `@features/customizer`

## Store structure
```ts
'use client';

import { create } from 'zustand';

// Always type the store interface explicitly
interface MyStore {
  value: string;
  setValue: (v: string) => void;
}

export const useMyStore = create<MyStore>((set) => ({
  value: 'default',
  setValue: (v) => set({ value: v }),
}));
```

## Usage rules
- Add `'use client'` to the store file and to any component that imports a store hook
- Import stores via the feature barrel: `import { useCustomizerStore } from '@features/customizer'`
- Never import a store directly from its internal path outside its own feature
- Call store hooks at the top level of the component — never inside conditions or loops
- Prefer selecting only what you need: `const { height } = useCustomizerStore()`

## What belongs in Zustand vs local state
- **Zustand**: state shared across multiple features or pages (e.g. selected cat, height/top)
- **Local useState**: ephemeral UI state scoped to one component (e.g. form field values, loading flag, open/closed)

## No devtools in production
- Do not add `devtools` middleware — keep stores lean
