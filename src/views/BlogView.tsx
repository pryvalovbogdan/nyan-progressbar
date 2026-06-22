import type { Dictionary } from '@/i18n';

import { BLOG_POSTS } from '@entities/blog';
import { BlogFilteredList } from '@features/blog-filter';
import { PageContainer } from '@shared/ui';

interface IBlogViewProps {
  dict: Dictionary;
  lang: string;
}

export function BlogView({ dict, lang }: IBlogViewProps) {
  const b = dict.blog;

  return (
    <PageContainer maxWidth="4xl" space="xl">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">{b.heading}</h1>
        <p className="text-muted-foreground leading-relaxed text-lg">{b.description}</p>
      </header>

      <BlogFilteredList posts={BLOG_POSTS} dict={b} lang={lang} />
    </PageContainer>
  );
}
