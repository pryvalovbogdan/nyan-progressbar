export type BlogPostType = 'release' | 'fact' | 'news';

export type BlogPostSlug = 'nyan-cat-v2-release' | 'the-original-2011-nyan-cat' | 'now-on-edge-and-opera';

export interface BlogPost {
  slug: BlogPostSlug;
  type: BlogPostType;
  date: string;
  version?: string;
}
