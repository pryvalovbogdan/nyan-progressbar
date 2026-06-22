import Link from 'next/link';

import type { BlogPostType } from '@entities/blog';
import { Badge } from '@shared/ui';

import type { IBlogPostContentProps } from './types';

const BADGE_VARIANT: Record<BlogPostType, 'default' | 'secondary' | 'outline'> = {
  release: 'default',
  fact: 'secondary',
  news: 'outline',
};

export function BlogPostContent({ post, dict, lang }: IBlogPostContentProps) {
  const translation = dict.posts[post.slug];
  const formattedDate = new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(new Date(post.date));

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={BADGE_VARIANT[post.type]}>{dict.type[post.type]}</Badge>
          {post.version ? <Badge variant="outline">v{post.version}</Badge> : null}
          <time dateTime={post.date} className="text-sm text-muted-foreground">
            {formattedDate}
          </time>
        </div>
        <h1 className="text-4xl font-bold leading-tight">{translation.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{translation.summary}</p>
      </header>

      <div className="space-y-5 text-base leading-relaxed">
        {translation.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <Link href={`/${lang}/blog`} className="link-accent inline-block text-sm font-medium">
        {dict.backToList}
      </Link>
    </article>
  );
}
