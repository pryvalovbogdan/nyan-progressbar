import type { IGifSource } from './types';

export const GIF_SOURCES: IGifSource[] = [
  {
    name: 'GIPHY',
    description: "The world's largest GIF library — millions of animated cats to choose from.",
    url: 'https://giphy.com/search/pixel-cats',
    previews: [
      { src: '/cats/GIHPY_ARTpixel nyan cat GIF by Pusheen.gif', alt: 'Catty' },
      { src: '/cats/GIHPY_Art Running GIF by Ota Jaider.gif', alt: 'Pixel cat' },
      { src: '/cats/GIHPY_Artpixel pastel GIF.gif', alt: 'Glitch cat' },
    ],
  },
  {
    name: 'Tenor',
    description: "Google's GIF search — fast, searchable, and constantly updated.",
    url: 'https://tenor.com/search/pixel-art-gifs',
    previews: [
      { src: '/cats/TENOR_white-kitty-kitty.gif', alt: 'Orange cat dancing' },
      { src: '/cats/TENOR_jjk.gif', alt: 'Cute kawaii cat' },
      { src: '/cats/TENOR_cute-cat-white.gif', alt: 'Kitty wigglez' },
    ],
  },
  {
    name: 'Imgur',
    description: 'Community-uploaded GIFs — great for pixel art and classic cat animations.',
    url: 'https://imgur.com/t/cats',
    previews: [
      { src: '/cats/1 - Imgur.gif', alt: 'Cute cat' },
      { src: '/cats/2 - Imgur (1).gif', alt: 'Gatito' },
      { src: '/cats/white-cat.gif', alt: 'White cat' },
    ],
  },
];
