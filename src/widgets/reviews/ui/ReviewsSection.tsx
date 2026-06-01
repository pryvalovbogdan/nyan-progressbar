import Image from 'next/image';
import type { Review, Props } from './types';

const REVIEWS: Review[] = [
  {
    name: 'vic',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWNAqX8yVAZMeCFX668vsalEEiMRy46Ot8GrNJZN-tGrRzkIxdW=s48-w48-h48',
    rating: 5,
    date: 'May 22, 2026',
    comment: "it's so cute and i love it but it glitches a lot..",
  },
  {
    name: 'REEHAM WAQAR',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXe_AJiV_cRnxt4m9TdWceeTlx6FeZdSPPJYetEL0wkCfphr902=s48-w48-h48',
    rating: 5,
    date: 'May 17, 2026',
    comment: 'its soooooooooooooooooooooooooooooo cuteeeeeeeee',
  },
  {
    name: 'Jodi Huang Shu Chun',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLbP9zno8cgaWW0dJirv7SvIyW1zX5cqDehV9NoWCKW7SBZEA=s48-w48-h48',
    rating: 5,
    date: 'May 17, 2026',
    comment: 'super duper cute :)',
  },
  {
    name: 'Deanjelous Hughes',
    avatar:
      'https://lh3.googleusercontent.com/a-/ALV-UjXOQYjVwIOgaLNY6raP1oy_kIN_v1zhcF2g4FHwUqhfHUtI5lVRyA=s48-w48-h48',
    rating: 5,
    date: 'May 15, 2026',
    comment: 'Ok..this is absolutely marvelous!',
  },
  {
    name: 'lil cock',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUdvRMZdhaemzqRi970K4WSC4M8SG3r0o1DyOKtS-A_EWbApu4=s48-w48-h48',
    rating: 3,
    date: 'May 5, 2026',
    comment: 'YouTube UI updates made extension bug and very distracting',
  },
  {
    name: 'Sophia',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUKkhYOWZmWDvfzgquyGC8z03JzkgqJXp2IGKaIbYQZStPuUMBu=s48-w48-h48',
    rating: 4,
    date: 'Mar 18, 2026',
    comment: 'pretty but glitches on videos with sections like intro/gameplay/outro',
  },
  {
    name: 'Shandi Strutter',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUKkhYOWZmWDvfzgquyGC8z03JzkgqJXp2IGKaIbYQZStPuUMBu=s48-w48-h48',
    rating: 2,
    date: 'Jan 18, 2026',
    comment: "It isn't working :(",
  },
  {
    name: 'first',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLCI7GTzOZ6dK5rLajTybuIGo9QIVp1f_cGj-9iVIyEwfTTZw=s48-w48-h48',
    rating: 1,
    date: 'Dec 26, 2025',
    comment: 'doesnt work',
  },
  {
    name: 'Chóng Trần',
    avatar:
      'https://lh3.googleusercontent.com/a-/ALV-UjWU-X76Dsfrun1WvdPNGI582DjCZ8a40qvybb5FjR-CSGQBzE0T9w=s48-w48-h48',
    rating: 5,
    date: 'Dec 21, 2025',
    comment: 'such a nice app',
  },
  {
    name: 'may',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUT9V51oBQNZlgingXIhIpar8lHR1aNSBr1ZBA4LF7kkpwSwY4=s48-w48-h48',
    rating: 5,
    date: 'Dec 18, 2025',
    comment: 'pretty',
  },
  {
    name: 'James',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWxy0sB2RlYDssOw5_zx_O2zgWnTYjMidkRP7_jAY5mEvDbf8I=s48-w48-h48',
    rating: 5,
    date: 'May 22, 2025',
    comment:
      'vewy cool and I luve the rainybows ( its a cool extension where I love seeing the moving nyan cat at th bottom of my screen)',
  },
  {
    name: 'Secretly Refrigerator',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWNzdgQoomlOgd0MWOGakN-iR7WleU8qCEkaAGYjt9ie7EGnew=s48-w48-h48',
    rating: 5,
    date: 'May 23, 2025',
    comment: 'works great, also when paired with other extensions that change the youtube bar',
  },
  {
    name: 'good- bot',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXr05KQyDj3KRqFrx3EY6WhZkMhIPJQkMgHDSkvgOqWBCPfhj6g=s48-w48-h48',
    rating: 5,
    date: 'May 14, 2025',
    comment: 'love it',
  },
  {
    name: "Matthew O'Neill",
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocI4XnU-ykN2LnXd8MFmdEXsxX9q8yT01KRkudAJSH11QLWkyw=s48-w48-h48',
    rating: 5,
    date: 'May 14, 2025',
    comment:
      'This one is just as good as the old one, wavy rainbow makes the difference. I have had this extension for 5 years!!!!!!!!!',
  },
  {
    name: 'Turtle POD THEminicat',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjV6PKWiksUHJbgasi9_rKa6j-C6MbcOfFBFBLbtk2XyrngRp18=s48-w48-h48',
    rating: 5,
    date: 'Apr 17, 2025',
    comment:
      'This is better than the old Nyan Cat progress bar I had. This one has the rainbows unlike the other one. If the other Nyan Cat progress bar have not ended support on Chrome, I would have never seen this masterpiece. Awesome app!',
  },
  {
    name: 'Black Diva',
    avatar:
      'https://lh3.googleusercontent.com/a-/ALV-UjUqKfc2eiD94l56vtYAUgBA7ic0NqUC938syQhGB3LPk01VfgRtyg=s48-w48-h48',
    rating: 3,
    date: 'Apr 20, 2025',
    comment: 'I miss the other one so badlyy :(   , this one is not as good',
  },
  {
    name: 'Miu Hikari',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjU05lW-XerQQ8JYPVSkH8WvOW7r5S-rZblelLeyKBrFGrRGNH4=s48-w48-h48',
    rating: 5,
    date: 'Mar 14, 2025',
    comment: ':D',
  },
  {
    name: 'Marlo Jimenez',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXFFsDPFluo-M99u41gvh_cIPtqECJS1xqQ_DZsUXPx5Sp5VDux=s48-w48-h48',
    rating: 5,
    date: 'Mar 15, 2025',
    comment: "It's so cute! No complaints! :) 🍓🍰",
  },
  {
    name: 'Emilia Toivonen',
    avatar:
      'https://lh3.googleusercontent.com/a-/ALV-UjXWmof3zGOXhaHFaJBs3q5hrSF0y6TH6X3lR4PyYDLc2AzmEmPu9Q=s48-w48-h48',
    rating: 5,
    date: 'Mar 3, 2025',
    comment: 'Awesome. An old one I had lost support and with this I got my nyan cat and rainbows back',
  },
  {
    name: 'banhammer',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjX6ZAvH5yqspD-1SpmZYIKOwiF_XfYAcN70Jfcl1FVhPTXEe80a=s48-w48-h48',
    rating: 5,
    date: 'Mar 5, 2025',
    comment: 'I love this a lot',
  },
  {
    name: 'TAN SHENG RAY Moe',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVQSjY-gjXQCXDHKRAqmoeL6xp-p6yXpCrbGz7CTncn8Dw3weAx=s48-w48-h48',
    rating: 5,
    date: 'Oct 25, 2024',
    comment: 'YEYYY i cant live without nyan cat progress bar😭',
  },
  {
    name: 'miranagi',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWUWrRU4W-mr7jBiCtGG6Xu6wWz9YsWOM33zKE7Ixh6xoPxjD1W=s48-w48-h48',
    rating: 5,
    date: 'Oct 20, 2024',
    comment: 'The rainbow trail no longer appears on the more popular version but thankfully it still does here',
  },
  {
    name: 'Jada Harper',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVRrjJSO2TuA48IXX_aGONO6t5TiMiucVgTuqh8zgP9eJ1np0V9=s48-w48-h48',
    rating: 5,
    date: 'Oct 18, 2024',
    comment: 'SO CUUTTEEE',
  },
  {
    name: 'Bara',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjU99ke1yuaZIMEzHBEuJJX5aBjbFq1hOD0H1pBXHhmHugvO7ziA=s48-w48-h48',
    rating: 5,
    date: 'Sep 21, 2024',
    comment: 'This is pretty useless but very useful',
  },
  {
    name: 'ホジェイ',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjV_sFH7mnTypaxk9Bt9ARvajaJl1RC1noVBHDxzgmcGe3hmtTMd=s48-w48-h48',
    rating: 5,
    date: 'Sep 24, 2024',
    comment: 'best extension ever',
  },
  {
    name: 'Alistair !!!!',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWNvCFxRsJeDmlZLCn_Mu2n8LpI8IVQqn8OtgwcoGuYoiGB4tLf=s48-w48-h48',
    rating: 5,
    date: 'Jun 10, 2024',
    comment: 'this is possibly the coolest thing ever — 10/10!! no complaints :) it works perfectly',
  },
  {
    name: 'Keymon',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjW7HOG-MiSy5mKFJKLmw1zUDw_g1BHOdFwGGZ-h5fs5plXqXTCx=s48-w48-h48',
    rating: 5,
    date: 'Jun 4, 2024',
    comment: 'nice wish the blue ahead would have little white stars',
  },
  {
    name: 'TANQR III',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocK7LvftRgGQltcBlcSEWgBxy_tLP0c9nZzTsqSBycjTx9ZocA=s48-w48-h48',
    rating: 5,
    date: 'May 31, 2024',
    comment: 'solo GOD',
  },
  {
    name: 'Oleksandr Hrytsenko',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjX9VIiEUx2IncEGKrnBnhAr7oBp1samDrKodqtNiaarCkxWeWJb=s48-w48-h48',
    rating: 5,
    date: 'Feb 5, 2024',
    comment: 'Enjoy using this awesome funny plugin!) recommend!',
  },
  {
    name: 'SnejoK',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXxewQb-pt5xmU3B4XlwzUDzHfOK4ezZojvrCVh6N0eanG64guR=s48-w48-h48',
    rating: 5,
    date: 'Dec 12, 2022',
    comment: 'The best plugin in my life',
  },
];

const STORE_URL =
  'https://chromewebstore.google.com/detail/nyan-cat-extension/oadlabdleegopgjlkcmjjogeaceagbie/reviews';

const TOTAL = 58;
const AVERAGE = 4.7;

// Distribution computed from Chrome Web Store aggregate (4.7 avg × 58 ratings)
const DISTRIBUTION = [
  { star: 5, count: 50 },
  { star: 4, count: 3 },
  { star: 3, count: 2 },
  { star: 2, count: 2 },
  { star: 1, count: 1 },
];

function Stars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-6 h-6' };
  const cls = sizes[size];

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={cls}
          fill={i <= rating ? '#FBBC04' : 'none'}
          stroke="#FBBC04"
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card hover:border-[#80deea]/30 hover:shadow-[0_4px_16px_rgba(128,222,234,0.08)] transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 shrink-0">
          <Image src={review.avatar} alt={review.name} width={40} height={40} className="rounded-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.date}</p>
        </div>
      </div>

      <Stars rating={review.rating} size="sm" />

      <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
    </div>
  );
}

export function ReviewsSection({ labels }: Props) {
  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">{labels.heading}</h2>

        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_4px_20px_rgba(128,222,234,0.35)] active:scale-[0.97] shrink-0"
          style={{
            background: 'linear-gradient(90deg, #ff0000, #ff7700, #ffff00, #00cc44, #0066ff, #8b00ff)',
          }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {labels.rateUs}
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
        <div className="flex flex-col items-center sm:items-start gap-3 sm:min-w-[140px]">
          <div className="text-6xl font-bold text-foreground leading-none">{AVERAGE}</div>
          <Stars rating={Math.round(AVERAGE)} size="md" />
          <p className="text-sm text-muted-foreground">
            {TOTAL} {labels.reviews}
          </p>
        </div>

        <div className="flex flex-col gap-1.5 flex-1 w-full sm:w-auto">
          {DISTRIBUTION.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-4 text-right shrink-0">{star}</span>
              <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0" fill="#FBBC04">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#FBBC04] transition-all duration-500"
                  style={{ width: `${(count / TOTAL) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-4 shrink-0">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REVIEWS.map(review => (
          <ReviewCard key={`${review.name}-${review.date}`} review={review} />
        ))}
      </div>
    </section>
  );
}
