'use client';

import { create } from 'zustand';

import { catsData, catsList } from '@entities/cat';

const DEFAULT_CAT = catsList[0];

interface CustomizerStore {
  selectedCat: string;
  customGif: string | null;
  height: number;
  top: number;
  setSelectedCat: (src: string) => void;
  setCustomGif: (base64: string) => void;
  loadCustomGif: (base64: string) => void;
  setHeight: (h: number) => void;
  setTop: (t: number) => void;
}

export const useCustomizerStore = create<CustomizerStore>(set => ({
  selectedCat: DEFAULT_CAT.src,
  customGif: null,
  height: parseInt(DEFAULT_CAT.styles.height),
  top: parseInt(DEFAULT_CAT.styles.top),

  setSelectedCat: src => {
    const cat = catsData[src];

    set({
      selectedCat: src,
      height: cat ? parseInt(cat.styles.height) : 28,
      top: cat ? parseInt(cat.styles.top) : -13,
    });
  },

  setCustomGif: base64 => set({ customGif: base64, selectedCat: '__custom__', height: 28, top: -13 }),
  loadCustomGif: base64 => set({ customGif: base64 }),

  setHeight: h => set({ height: h }),
  setTop: t => set({ top: t }),
}));
