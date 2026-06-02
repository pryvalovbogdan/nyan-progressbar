'use client';

import { useCustomizerStore } from '../model/customizerStore';
import { Slider } from '@shared/ui/slider';
import { Label } from '@shared/ui/label';
import { useExtensionDetected } from '@shared/lib/useExtensionDetected';
import { ScrubberPreview } from '@widgets/cat-preview';
import type { Props } from './types';

export function CustomizerPanel({ labels, previewLabels }: Props) {
  const { height, top, setHeight, setTop } = useCustomizerStore();
  const detected = useExtensionDetected();
  const disabled = detected === false;

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
            onValueChange={v => setHeight(Array.isArray(v) ? v[0] : v)}
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
            onValueChange={v => setTop(Array.isArray(v) ? v[0] : v)}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
