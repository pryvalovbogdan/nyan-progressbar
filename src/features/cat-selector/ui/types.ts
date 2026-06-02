import type { CatEntry } from '@entities/cat';

export interface ScrubberCardProps {
  cat: CatEntry;
  disabled?: boolean;
  tooltip?: string;
  onSelect?: (src: string) => void;
}
