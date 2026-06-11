import type { IVersionEntry } from './types';

export const VERSIONS: IVersionEntry[] = [
  {
    version: '2.0.0',
    date: '2026-06-07',
    latest: true,
    changes: [
      { type: 'new', text: 'Per-GIF custom styling — each cat remembers its own height and position' },
      { type: 'new', text: 'Default position reset button in the customizer' },
      { type: 'new', text: 'Height/position slider with live preview' },
      { type: 'improvement', text: 'Error handling and unlimited Chrome storage for custom GIFs' },
      { type: 'improvement', text: 'Popup init logic refactored into standalone modules' },
    ],
  },
  {
    version: '1.9.0',
    date: '2026-05-28',
    changes: [
      { type: 'new', text: 'Upload any GIF as a custom scrubber from the popup' },
      { type: 'new', text: 'Promotional banner notification in the YouTube player' },
      { type: 'new', text: 'Full UI internationalisation — 11 languages supported' },
      { type: 'improvement', text: 'Custom height and top-offset controls for the scrubber' },
    ],
  },
  {
    version: '1.8.0',
    date: '2026-05-27',
    changes: [
      { type: 'new', text: 'YouTube Music support — cat scrubber works on music.youtube.com' },
      { type: 'new', text: 'Cat selector popup with full GIF grid' },
      { type: 'improvement', text: 'Long-polling fallback ensures injection even on slow page loads' },
    ],
  },
  {
    version: '1.7.0',
    date: '2026-03-20',
    changes: [
      { type: 'fix', text: 'Observer added for late-loading progress containers' },
      { type: 'fix', text: 'Interval fallback for load-progress segments' },
      { type: 'improvement', text: 'Overridden scrubber wrapper overflow to prevent clipping' },
    ],
  },
  {
    version: '1.6.0',
    date: '2025-10-23',
    changes: [{ type: 'new', text: 'Production build pipeline with esbuild bundling and CSS minification' }],
  },
  {
    version: '1.5.0',
    date: '2025-10-18',
    changes: [{ type: 'fix', text: 'Rainbow and night-sky bar disappeared after a YouTube DOM update — fixed' }],
  },
  {
    version: '1.4.0',
    date: '2025-08-11',
    changes: [{ type: 'new', text: 'Rainbow overlay applied to newly loaded chapter/segment bars' }],
  },
  {
    version: '1.3.0',
    date: '2025-03-30',
    changes: [{ type: 'new', text: 'Cat scrubber shown on hover-preview thumbnail progress bars' }],
  },
  {
    version: '1.2.0',
    date: '2024-11-06',
    changes: [{ type: 'new', text: 'Cat scrubber injected into the main-page video hover preview bar' }],
  },
  {
    version: '1.1.0',
    date: '2023-10-21',
    changes: [{ type: 'perf', text: 'Reduced extra re-renders; mini-player scrubber updates stabilised' }],
  },
  {
    version: '1.0.0',
    date: '2022-11-08',
    changes: [
      { type: 'new', text: 'Initial release — Nyan Cat GIF replaces the YouTube progress bar scrubber' },
      { type: 'new', text: 'MutationObserver injection for sidebar and main progress bar' },
      { type: 'new', text: 'Rainbow and night-sky images on the progress track' },
    ],
  },
];

export const CHANGE_TYPE_COLORS: Record<string, string> = {
  new: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  fix: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  improvement: 'bg-[#80deea]/15 text-[#80deea] border-[#80deea]/30',
  perf: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
};
