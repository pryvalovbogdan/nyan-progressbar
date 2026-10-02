export interface CatStyles {
  height: string;
  top: string;
  topHover: string;
  topMusic: string;
}

export type CatSectionId = 'kitties' | 'doggies' | 'buddies';

export interface CatSection {
  id: CatSectionId;
  icon: string;
}

export interface CatEntry {
  src: string;
  section: CatSectionId;
  styles: CatStyles;
}
