import type { Dictionary } from '@/i18n';
import { notFound } from 'next/navigation';

import type { BlogPostSlug } from '@entities/blog';
import { getBlogPostBySlug } from '@entities/blog';
import { PageContainer } from '@shared/ui';
import { BlogPostContent } from '@widgets/blog-post-content';

interface IBlogPostViewProps {
  dict: Dictionary;
  lang: string;
  slug: BlogPostSlug;
}

export function BlogPostView({ dict, lang, slug }: IBlogPostViewProps) {
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <PageContainer maxWidth="3xl" space="lg">
      <BlogPostContent post={post} dict={dict.blog} lang={lang} />
    </PageContainer>
  );
}
