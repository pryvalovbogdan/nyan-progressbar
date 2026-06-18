import type { Dictionary } from '@/i18n';
import { ExtensionBanner, GifSourcesBlock, PopularCatsBlock } from '@widgets';
import Link from 'next/link';

import { ScrubberGallery } from '@features/cat-selector';
import { CustomizerPanel } from '@features/customizer';
import { FeatureCard } from '@shared/ui/feature-card';
import { PageContainer } from '@shared/ui/page-container';
import { Separator } from '@shared/ui/separator';

interface ICustomizerViewProps {
  dict: Dictionary;
  lang: string;
}

export async function CustomizerView({ dict, lang }: ICustomizerViewProps) {
  const c = dict.customizerPage;

  return (
    <PageContainer maxWidth="6xl" space="md">
      <section className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-bold">{c.heading}</h1>
        <p className="text-muted-foreground">{c.description}</p>
      </section>

      <ExtensionBanner
        labels={{
          heading: c.banner.heading,
          description: c.banner.description,
          cta: c.banner.cta,
          dismiss: c.banner.dismiss,
        }}
      />
      <PopularCatsBlock heading={c.popularCats.heading} description={c.popularCats.description} />

      <section className="space-y-4 sm:space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{c.galleryHeading}</h2>
          <p className="text-muted-foreground text-sm">{c.galleryDesc}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6 sm:gap-8 items-start">
          <ScrubberGallery installTooltip={c.installTooltip} uploadLabel={dict.customizer.uploadGif} />
          <div className="lg:sticky lg:top-20">
            <CustomizerPanel
              labels={{
                adjustPosition: dict.customizer.adjustPosition,
                height: dict.customizer.height,
                topOffset: dict.customizer.topOffset,
              }}
              isMainPage={false}
              previewLabels={{
                label: dict.preview.label,
                player: dict.preview.player,
              }}
            />
          </div>
        </div>
      </section>

      <GifSourcesBlock
        heading={c.gifSources.heading}
        description={c.gifSources.description}
        browseCta={c.gifSources.browseCta}
        sourceDescriptions={{
          GIPHY: c.gifSources.giphyDesc,
          Tenor: c.gifSources.tenorDesc,
          Imgur: c.gifSources.imgurDesc,
        }}
      />

      <Separator />

      <section className="space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold">{c.tipsHeading}</h2>
        <p className="text-muted-foreground leading-relaxed">{c.tipsIntro}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: c.tip1Title, desc: c.tip1Desc },
            { title: c.tip2Title, desc: c.tip2Desc },
            { title: c.tip3Title, desc: c.tip3Desc },
            { title: c.tip4Title, desc: c.tip4Desc },
          ].map(({ title, desc }) => (
            <FeatureCard key={title} title={title} description={desc} density="compact" />
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold">{c.useCasesHeading}</h2>
        <p className="text-muted-foreground leading-relaxed">{c.useCasesIntro}</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: c.useCase1Title, desc: c.useCase1Desc },
            { title: c.useCase2Title, desc: c.useCase2Desc },
            { title: c.useCase3Title, desc: c.useCase3Desc },
          ].map(({ title, desc }) => (
            <FeatureCard key={title} title={title} description={desc} density="compact" />
          ))}
        </div>
      </section>

      <Separator />

      <section className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold">{c.faqHintHeading}</h2>
        <p className="text-muted-foreground">
          {c.faqHintPre}{' '}
          <Link href={`/${lang}/faq`} className="link-accent">
            {c.faqHintLinkText}
          </Link>{' '}
          {c.faqHintPost}
        </p>
      </section>
    </PageContainer>
  );
}
