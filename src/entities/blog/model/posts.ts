import type { BlogPost, BlogPostSlug } from './types';

export const BLOG_POSTS: readonly BlogPost[] = [
  { slug: 'now-on-edge-and-opera', type: 'news', date: '2026-06-10' },
  { slug: 'nyan-cat-v2-release', type: 'release', date: '2026-05-15', version: '2.0' },
  { slug: 'the-original-2011-nyan-cat', type: 'fact', date: '2026-04-02' },
];

export const BLOG_POST_SLUGS: readonly BlogPostSlug[] = BLOG_POSTS.map(p => p.slug);

export function isBlogPostSlug(v: unknown): v is BlogPostSlug {
  return typeof v === 'string' && (BLOG_POST_SLUGS as readonly string[]).includes(v);
}

export function getBlogPostBySlug(slug: BlogPostSlug): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
