import type { Dictionary } from '@/i18n';

import { ScrubberGallery } from '@features/cat-selector';
import { CustomizerPanel } from '@features/customizer';
import { ExtensionBanner } from '@widgets/extension-banner';
import { GifSourcesBlock } from '@widgets/gif-sources';
import { PopularCatsBlock } from '@widgets/popular-cats';

interface ICustomizerViewProps {
  dict: Dictionary;
}

export async function CustomizerView({ dict }: ICustomizerViewProps) {
  const c = dict.customizerPage;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16 space-y-8 sm:space-y-10">
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
    </div>
  );
}
