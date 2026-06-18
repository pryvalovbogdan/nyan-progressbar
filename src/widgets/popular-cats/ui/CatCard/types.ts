import type { IPopularCat } from '../types';

export interface ICatCardProps {
  cat: IPopularCat;
  rank: number;
  isSelected: boolean;
  onSelect: (src: string) => void;
}
