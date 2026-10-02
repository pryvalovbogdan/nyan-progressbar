import type { CatSectionId } from '@entities/cat';

export interface IScrubberGalleryProps {
  installTooltip?: string;
  uploadLabel?: string;
  sectionLabels: Record<CatSectionId, string>;
  isMainPage?: boolean;
}
