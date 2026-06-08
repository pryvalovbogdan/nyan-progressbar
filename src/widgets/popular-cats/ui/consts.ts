import type { IPopularCat } from './types';

export const POPULAR_CATS: IPopularCat[] = [
  { src: 'cute-cat.gif', name: 'Cute Cat', percentage: 25 },
  { src: 'cute-kawaii.gif', name: 'Cute Kawaii', percentage: 13 },
  { src: 'gatito.gif', name: 'Gatito', percentage: 13 },
  { src: 'glitch-cat.gif', name: 'Glitch Cat', percentage: 13 },
  { src: 'cat-garfield.gif', name: 'Garfield', percentage: 8 },
];

export const RANK_STYLES: Record<number, { badge: string; bar: string }> = {
  1: { badge: 'bg-amber-400 text-amber-950', bar: 'bg-amber-400' },
  2: { badge: 'bg-slate-400 text-slate-950', bar: 'bg-slate-400' },
  3: { badge: 'bg-orange-400 text-orange-950', bar: 'bg-orange-400' },
};

export const DEFAULT_RANK_STYLE = { badge: 'bg-muted text-muted-foreground', bar: 'bg-[#80deea]/60' };
export const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
