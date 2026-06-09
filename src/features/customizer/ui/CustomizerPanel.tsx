'use client';

import { useCustomizerStore } from '@features/customizer';
import { useExtensionDetected } from '@shared/hooks/useExtensionDetected';
import { sendToExtension } from '@shared/lib/extensionBridge';
import { Label } from '@shared/ui/label';
import { Slider } from '@shared/ui/slider';
import { ScrubberPreview } from '@widgets/cat-preview';

import { ICustomizerPanelProps } from './types';

export function CustomizerPanel({ labels, previewLabels, isMainPage }: ICustomizerPanelProps) {
  const { height, top, setHeight, setTop } = useCustomizerStore();
  const detected = useExtensionDetected();
  const disabled = detected === false;
  const extensionActive = detected === true;
  const isDisabled = disabled && !isMainPage;

  function updateStyles(next: { height: number; top: number }) {
    if (extensionActive) sendToExtension('UPDATE_CUSTOM_CAT_STYLES', { styles: next });
  }

  return (
    <div className="space-y-6">
      <ScrubberPreview labels={previewLabels} disabled={isDisabled} />

      <div className="card p-5 space-y-5">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{labels.adjustPosition}</p>

        <div className="space-y-2">
          <div className={`flex justify-between${isDisabled ? ' cursor-not-allowed' : ''}`}>
            <Label className={`text-sm${isDisabled ? ' cursor-not-allowed' : ''}`}>{labels.height}</Label>
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
            disabled={isDisabled}
          />
        </div>

        <div className="space-y-2">
          <div className={`flex justify-between${isDisabled ? ' cursor-not-allowed' : ''}`}>
            <Label className={`text-sm${isDisabled ? ' cursor-not-allowed' : ''}`}>{labels.topOffset}</Label>
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
            disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
}
