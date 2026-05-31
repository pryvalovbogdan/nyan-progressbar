# State Management Rules (Zustand)

## Store location
- All stores in `src/store/`
- One store per domain, named `[domain]Store.ts`
- Currently: `customizerStore.ts` (selectedCat, height, top)

## Store structure
```ts
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
- Add `'use client'` to any file that imports a store hook
- Call store hooks at the top level of the component — never inside conditions or loops
- Prefer selecting only what you need: `const { height } = useCustomizerStore()` not the whole store

## What belongs in Zustand vs local state
- **Zustand**: state shared across multiple components or pages (e.g. selected cat, height/top)
- **Local useState**: ephemeral UI state scoped to one component (e.g. form field values, loading, open/closed)

## No devtools in production
- Do not add `devtools` middleware — keep stores lean
