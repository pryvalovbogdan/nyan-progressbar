import { catsList } from '@/data/cats';
import { ScrubberCard } from './ScrubberCard';

export function ScrubberGallery() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {catsList.map((cat) => (
        <ScrubberCard key={cat.src} cat={cat} />
      ))}
    </div>
  );
}
