import type { Dictionary } from '@/i18n';

import { HOW_TO_ARTICLE_SLUGS } from '@entities/how-to-article';
import { HowToArticleCard } from '@features/how-to-article';
import { PageContainer } from '@shared/ui';

interface IHowToUseIndexViewProps {
  dict: Dictionary;
  lang: string;
}

export function HowToUseIndexView({ dict, lang }: IHowToUseIndexViewProps) {
  const h = dict.howToUse;

  return (
    <PageContainer maxWidth="4xl" space="2xl">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">{h.index.heading}</h1>
        <p className="text-muted-foreground leading-relaxed text-lg">{h.index.description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HOW_TO_ARTICLE_SLUGS.map(slug => (
          <HowToArticleCard key={slug} dict={dict} lang={lang} slug={slug} />
        ))}
      </div>
    </PageContainer>
  );
}
