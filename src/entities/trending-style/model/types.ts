export type TrendingSectionId = 'popular' | 'trending' | 'new' | 'collections';

export type TrendingBadge = 'new' | 'hot' | 'custom';

export type TrendingStyleId =
  | 'nyan-classic'
  | 'cute-cat'
  | 'glitch-cat'
  | 'pixel-cat'
  | 'cute-kawaii'
  | 'gatito'
  | 'garfield'
  | 'orange-dance'
  | 'kitty-wigglez'
  | 'black-cat'
  | 'white-cat'
  | 'orange'
  | 'cute-bunny'
  | 'japan-creature'
  | 'anatroll'
  | 'pixel-dogs'
  | 'purple-bat'
  | 'cute-dog'
  | 'parrot-pixel'
  | 'cartoon-cat'
  | 'pixel-tiger'
  | 'fawn'
  | 'osito'
  | 'rolling-cat'
  | 'dancing-kitty'
  | 'snow-kitten'
  | 'scarf-cat'
  | 'night-walker'
  | 'happy-cat'
  | 'chubby-cat'
  | 'shadow-cat'
  | 'pixel-corgi'
  | 'puppy-love'
  | 'running-pug'
  | 'music-fox'
  | 'rainbow-bird'
  | 'ramen-shark';

export type TrendingTagKey =
  | 'nyan'
  | 'classic'
  | 'rainbow'
  | 'cute'
  | 'pink'
  | 'glitch'
  | 'pixel'
  | 'kawaii'
  | 'dance'
  | 'orange'
  | 'minimal'
  | 'retro'
  | 'bunny'
  | 'dog'
  | 'bat'
  | 'creature'
  | 'bird'
  | 'tiger'
  | 'deer'
  | 'bear'
  | 'cartoon'
  | 'fox'
  | 'shark'
  | 'music'
  | 'cozy'
  | 'dark';

export type TrendingCollectionId = 'classic' | 'pixel' | 'kawaii' | 'dance' | 'monochrome' | 'orange';

export interface ITrendingStyle {
  id: TrendingStyleId;
  imageSrc: string;
  badges: TrendingBadge[];
  tagKeys: TrendingTagKey[];
}

export interface ITrendingCollection {
  id: TrendingCollectionId;
  coverImageSrc: string;
  itemCount: number;
}

export interface ITrendingSection {
  id: TrendingSectionId;
  styles?: ITrendingStyle[];
  collections?: ITrendingCollection[];
  paginated?: boolean;
}
