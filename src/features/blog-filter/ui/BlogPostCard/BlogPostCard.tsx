import Link from 'next/link';

import type { BlogPostType } from '@entities/blog';
import { Badge } from '@shared/ui';

import type { IBlogPostCardProps } from './types';

const BADGE_VARIANT: Record<BlogPostType, 'default' | 'secondary' | 'outline'> = {
  release: 'default',
  fact: 'secondary',
  news: 'outline',
};

export function BlogPostCard({ post, dict, lang }: IBlogPostCardProps) {
  const translation = dict.posts[post.slug];
  const formattedDate = new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(new Date(post.date));

  return (
    <Link
      href={`/${lang}/blog/${post.slug}`}
      className="group block rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#80deea]/40 hover:shadow-[0_8px_24px_rgba(128,222,234,0.12)]"
    >
      <div className="flex items-center gap-2 mb-3">
        <Badge variant={BADGE_VARIANT[post.type]}>{dict.type[post.type]}</Badge>
        {post.version ? <Badge variant="outline">v{post.version}</Badge> : null}
        <time dateTime={post.date} className="text-xs text-muted-foreground ml-auto">
          {formattedDate}
        </time>
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-[#80deea] transition-colors">{translation.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{translation.summary}</p>
      <span className="text-sm text-[#80deea] font-medium">{dict.readMore} →</span>
    </Link>
  );
}
