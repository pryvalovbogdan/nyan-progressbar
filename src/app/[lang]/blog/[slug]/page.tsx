import { getDictionary, hasLocale } from '@/i18n';
import type { Locale } from '@/i18n';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BLOG_POST_SLUGS, isBlogPostSlug } from '@entities/blog';
import { generatePageMetadata } from '@shared/lib/metadata';
import { BlogPostView } from '@views/BlogPostView';

export function generateStaticParams() {
  return BLOG_POST_SLUGS.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!hasLocale(lang) || !isBlogPostSlug(slug)) return {};

  const dict = await getDictionary(lang as Locale);
  const post = dict.blog.posts[slug];

  return generatePageMetadata(lang as Locale, dict, 'blog', {
    title: post.title,
    description: post.summary,
    route: `/blog/${slug}`,
    ogType: 'article',
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;

  if (!hasLocale(lang) || !isBlogPostSlug(slug)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <BlogPostView dict={dict} lang={lang} slug={slug} />;
}
