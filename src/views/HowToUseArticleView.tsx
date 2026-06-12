import type { Dictionary } from '@/i18n';

import type { HowToArticleSlug } from '@entities/how-to-article';
import { HowToArticleBody } from '@features/how-to-article';
import { HowToSidebar } from '@widgets/how-to-sidebar';

interface IHowToUseArticleViewProps {
  dict: Dictionary;
  lang: string;
  slug: HowToArticleSlug;
}

export function HowToUseArticleView({ dict, lang, slug }: IHowToUseArticleViewProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
        <HowToSidebar dict={dict} lang={lang} currentSlug={slug} />
        <HowToArticleBody dict={dict} lang={lang} slug={slug} />
      </div>
    </div>
  );
}
