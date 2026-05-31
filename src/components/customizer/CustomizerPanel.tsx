'use client';

import { useCustomizerStore } from '@/store/customizerStore';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ScrubberPreview } from '@/components/scrubber/ScrubberPreview';

interface CustomizerLabels {
  adjustPosition: string;
  height: string;
  topOffset: string;
}

interface PreviewLabels {
  label: string;
  player: string;
}

interface Props {
  labels: CustomizerLabels;
  previewLabels: PreviewLabels;
}

export function CustomizerPanel({ labels, previewLabels }: Props) {
  const { height, top, setHeight, setTop } = useCustomizerStore();

  return (
    <div className="space-y-6">
      <ScrubberPreview labels={previewLabels} />

      <div className="rounded-xl border border-border bg-card p-5 space-y-5">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{labels.adjustPosition}</p>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-sm">{labels.height}</Label>
            <span className="text-sm text-[#80deea] font-mono">{height}px</span>
          </div>
          <Slider
            min={10}
            max={80}
            step={1}
            value={[height]}
            onValueChange={(v) => setHeight(Array.isArray(v) ? v[0] : v)}
            className="accent-[#80deea]"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-sm">{labels.topOffset}</Label>
            <span className="text-sm text-[#80deea] font-mono">{top}px</span>
          </div>
          <Slider
            min={-60}
            max={20}
            step={1}
            value={[top]}
            onValueChange={(v) => setTop(Array.isArray(v) ? v[0] : v)}
          />
        </div>
      </div>
    </div>
  );
}
