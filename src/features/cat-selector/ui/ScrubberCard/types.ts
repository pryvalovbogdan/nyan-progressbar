import type { CatEntry } from '@entities/cat';

export interface IScrubberCardProps {
  cat: CatEntry;
  disabled?: boolean;
  tooltip?: string;
  onSelect?: (src: string) => void;
  isMainPage?: boolean;
}
