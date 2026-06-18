import type { Dictionary } from '@/i18n';

import type { HowToArticleSlug } from '@entities/how-to-article';
import { HowToArticleBody } from '@features/how-to-article';
import { AD_SLOTS } from '@shared/lib/adsense-slots';
import { GoogleAd } from '@shared/ui/google-add';
import { PageContainer } from '@shared/ui/page-container';
import { HowToSidebar } from '@widgets/how-to-sidebar';

interface IHowToUseArticleViewProps {
  dict: Dictionary;
  lang: string;
  slug: HowToArticleSlug;
}

export function HowToUseArticleView({ dict, lang, slug }: IHowToUseArticleViewProps) {
  return (
    <PageContainer maxWidth="6xl" space="lg">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
        <HowToSidebar dict={dict} lang={lang} currentSlug={slug} />
        <HowToArticleBody dict={dict} lang={lang} slug={slug} />
      </div>
      <GoogleAd slot={AD_SLOTS.howToArticle} />
    </PageContainer>
  );
}
