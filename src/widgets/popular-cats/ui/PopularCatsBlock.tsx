'use client';

import { useCustomizerStore } from '@features/customizer';
import { trackEvent } from '@shared/lib/analytics';
import { sendToExtension } from '@shared/lib/extensionBridge';
import { useExtensionDetected } from '@shared/lib/useExtensionDetected';

import { CatCard } from './CatCard';
import { POPULAR_CATS } from './consts';
import type { IPopularCatsBlockProps } from './types';

export function PopularCatsBlock({ heading, description }: IPopularCatsBlockProps) {
  const detected = useExtensionDetected();
  const { selectedCat, setSelectedCat } = useCustomizerStore();

  function handleSelect(src: string) {
    setSelectedCat(src);
    trackEvent('cat_select', { cat_name: src.replace('.gif', ''), source: 'popular_block' });

    if (detected) {
      sendToExtension('SELECT_CAT', { src });
    }
  }

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{heading}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {POPULAR_CATS.map((cat, index) => (
          <CatCard
            key={cat.src}
            cat={cat}
            rank={index + 1}
            isSelected={selectedCat === cat.src}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </section>
  );
}
