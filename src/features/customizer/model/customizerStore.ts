'use client';

import { create } from 'zustand';
import { catsData, catsList } from '@entities/cat';

const DEFAULT_CAT = catsList[0];

interface CustomizerStore {
  selectedCat: string;
  height: number;
  top: number;
  setSelectedCat: (src: string) => void;
  setHeight: (h: number) => void;
  setTop: (t: number) => void;
}

export const useCustomizerStore = create<CustomizerStore>(set => ({
  selectedCat: DEFAULT_CAT.src,
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

  setHeight: h => set({ height: h }),
  setTop: t => set({ top: t }),
}));
