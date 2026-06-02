'use client';

import { useCustomizerStore } from '@features/customizer';
import { Slider } from '@shared/ui/slider';
import { Label } from '@shared/ui/label';
import { useExtensionDetected } from '@shared/lib/useExtensionDetected';
import { sendToExtension } from '@shared/lib/extensionBridge';
import { ScrubberPreview } from '@widgets/cat-preview';
import type { Props } from './types';

export function CustomizerPanel({ labels, previewLabels }: Props) {
  const { height, top, setHeight, setTop } = useCustomizerStore();
  const detected = useExtensionDetected();
  const disabled = detected === false;
  const extensionActive = detected === true;

  function updateStyles(next: { height: number; top: number }) {
    if (extensionActive) sendToExtension('UPDATE_CUSTOM_CAT_STYLES', { styles: next });
  }

  return (
    <div className="space-y-6">
      <ScrubberPreview labels={previewLabels} disabled={disabled} />

      <div className="rounded-xl border border-border bg-card p-5 space-y-5">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{labels.adjustPosition}</p>

        <div className="space-y-2">
          <div className={`flex justify-between${disabled ? ' cursor-not-allowed' : ''}`}>
            <Label className={`text-sm${disabled ? ' cursor-not-allowed' : ''}`}>{labels.height}</Label>
            <span className="text-sm text-[#80deea] font-mono">{height}px</span>
          </div>
          <Slider
            min={10}
            max={80}
            step={1}
            value={[height]}
            onValueChange={v => {
              const h = Array.isArray(v) ? v[0] : v;

              setHeight(h);
              updateStyles({ height: h, top });
            }}
            className="accent-[#80deea]"
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <div className={`flex justify-between${disabled ? ' cursor-not-allowed' : ''}`}>
            <Label className={`text-sm${disabled ? ' cursor-not-allowed' : ''}`}>{labels.topOffset}</Label>
            <span className="text-sm text-[#80deea] font-mono">{top}px</span>
          </div>
          <Slider
            min={-60}
            max={20}
            step={1}
            value={[top]}
            onValueChange={v => {
              const t = Array.isArray(v) ? v[0] : v;

              setTop(t);
              updateStyles({ height, top: t });
            }}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
