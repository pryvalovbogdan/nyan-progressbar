'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useCustomizerStore } from '@features/customizer';
import { fetchAsBase64, getBuiltInCatSrc } from '@features/trending/helpers/utils';
import { useExtensionDetected } from '@shared/hooks/useExtensionDetected';
import { trackEvent } from '@shared/lib/analytics';
import { sendToExtension } from '@shared/lib/extensionBridge';

import { BADGE_STYLES } from './consts';
import type { ITrendingCardProps } from './types';

export function TrendingCard({ dict, lang, style }: ITrendingCardProps) {
  const t = dict.trending;
  const meta = t.styles[style.id];
  const router = useRouter();
  const detected = useExtensionDetected();
  const { setSelectedCat, setCustomGif } = useCustomizerStore();

  const builtInSrc = getBuiltInCatSrc(style.imageSrc);
  const customizerHref = `/${lang}/customizer`;
  const eventName = style.id;

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (builtInSrc) {
      setSelectedCat(builtInSrc);
      trackEvent('cat_select', { cat_name: eventName, source: 'trending_card' });

      if (detected) {
        sendToExtension('SELECT_CAT', { src: builtInSrc });
      }

      return;
    }

    event.preventDefault();
    trackEvent('custom_gif_select', { cat_name: eventName, source: 'trending_card' });

    void fetchAsBase64(encodeURI(style.imageSrc))
      .then(base64 => {
        setCustomGif(base64);

        if (detected) {
          sendToExtension('UPLOAD_CUSTOM_CAT', { base64 });
        }
      })
      .finally(() => router.push(customizerHref));
  }

  return (
    <Link
      href={customizerHref}
      onClick={handleClick}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-[#80deea]/40 hover:shadow-[0_8px_24px_rgba(128,222,234,0.12)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image src={style.imageSrc} alt={meta.title} fill unoptimized className="object-cover" />

        {style.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {style.badges.map(badge => (
              <span
                key={badge}
                className={`text-[10px] font-bold uppercase tracking-wide leading-none px-1.5 py-1 rounded-md ${BADGE_STYLES[badge]}`}
              >
                {t.badges[badge]}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-base font-semibold leading-tight group-hover:text-[#80deea] transition-colors">
          {meta.title}
        </h3>

        {style.tagKeys.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {style.tagKeys.map(key => (
              <span key={key} className="text-[11px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                #{t.tags[key]}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground leading-relaxed">{meta.description}</p>

        <span className="mt-auto pt-1 text-sm text-[#80deea] font-medium">{t.cta} →</span>
      </div>
    </Link>
  );
}
