'use client';

import { useState } from 'react';

import type { BlogPostType } from '@entities/blog';
import { Button } from '@shared/ui';

import { BlogPostCard } from '../BlogPostCard';
import type { IBlogFilteredListProps } from './types';

type Filter = BlogPostType | 'all';

const FILTERS: readonly Filter[] = ['all', 'release', 'fact', 'news'];

export function BlogFilteredList({ posts, dict, lang }: IBlogFilteredListProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const visible = filter === 'all' ? posts : posts.filter(p => p.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={dict.filter.all}>
        {FILTERS.map(f => {
          const active = f === filter;

          return (
            <Button
              key={f}
              variant={active ? 'secondary' : 'ghost'}
              size="sm"
              aria-pressed={active}
              onClick={() => setFilter(f)}
            >
              {dict.filter[f]}
            </Button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">{dict.empty}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visible.map(post => (
            <BlogPostCard key={post.slug} post={post} dict={dict} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
