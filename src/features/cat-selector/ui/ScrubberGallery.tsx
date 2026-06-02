'use client';

import { catsList } from '@entities/cat';
import { useExtensionDetected } from '@shared/lib/useExtensionDetected';
import { ScrubberCard } from './ScrubberCard';

interface Props {
  installTooltip?: string;
}

export function ScrubberGallery({ installTooltip }: Props) {
  const detected = useExtensionDetected();
  const disabled = detected === false;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {catsList.map(cat => (
        <ScrubberCard key={cat.src} cat={cat} disabled={disabled} tooltip={disabled ? installTooltip : undefined} />
      ))}
    </div>
  );
}
