import { ScrubberGallery } from '@features/cat-selector';
import { CustomizerPanel } from '@features/customizer';
import { ExtensionBanner } from '@widgets/extension-banner';
import type { Dictionary } from '@/i18n';

interface Props {
  dict: Dictionary;
}

export function CustomizerView({ dict }: Props) {
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

      <section className="space-y-4 sm:space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{c.galleryHeading}</h2>
          <p className="text-muted-foreground text-sm">{c.galleryDesc}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6 sm:gap-8 items-start">
          <ScrubberGallery installTooltip={c.installTooltip} />
          <div className="lg:sticky lg:top-20">
            <CustomizerPanel
              labels={{
                adjustPosition: dict.customizer.adjustPosition,
                height: dict.customizer.height,
                topOffset: dict.customizer.topOffset,
              }}
              previewLabels={{
                label: dict.preview.label,
                player: dict.preview.player,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
