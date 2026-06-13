import type { ITrendingSection } from './types';

export const TRENDING_SECTIONS: ITrendingSection[] = [
  {
    id: 'popular',
    styles: [
      { id: 'nyan-classic', imageSrc: '/cats/catty.gif', badges: ['hot'], tagKeys: ['nyan', 'classic', 'rainbow'] },
      { id: 'cute-cat', imageSrc: '/cats/cute-cat.gif', badges: ['hot'], tagKeys: ['cute', 'pink'] },
      { id: 'glitch-cat', imageSrc: '/cats/glitch-cat.gif', badges: ['hot'], tagKeys: ['glitch', 'pixel'] },
      { id: 'pixel-cat', imageSrc: '/cats/pixel-cat.gif', badges: [], tagKeys: ['pixel', 'retro'] },
      { id: 'cute-kawaii', imageSrc: '/cats/cute-kawaii.gif', badges: [], tagKeys: ['kawaii', 'cute', 'pink'] },
      { id: 'gatito', imageSrc: '/cats/gatito.gif', badges: [], tagKeys: ['cute', 'orange'] },
    ],
  },
  {
    id: 'trending',
    styles: [
      { id: 'garfield', imageSrc: '/cats/cat-garfield.gif', badges: ['hot'], tagKeys: ['orange', 'classic'] },
      {
        id: 'cute-bunny',
        imageSrc: '/trending/cute-bunny.gif',
        badges: ['hot', 'custom'],
        tagKeys: ['bunny', 'cute'],
      },
      {
        id: 'pixel-tiger',
        imageSrc: '/trending/pixel-tiger (1).gif',
        badges: ['hot', 'custom'],
        tagKeys: ['tiger', 'pixel', 'retro'],
      },
      {
        id: 'cute-dog',
        imageSrc: '/trending/cute-dog.gif',
        badges: ['hot', 'custom'],
        tagKeys: ['dog', 'cute'],
      },
      {
        id: 'anatroll',
        imageSrc: '/trending/anatroll.gif',
        badges: ['custom'],
        tagKeys: ['creature', 'cute'],
      },
      {
        id: 'pixel-dogs',
        imageSrc: '/trending/pixel-dogs (2).gif',
        badges: ['custom'],
        tagKeys: ['dog', 'pixel', 'retro'],
      },
    ],
  },
  {
    id: 'new',
    paginated: true,
    styles: [
      {
        id: 'cartoon-cat',
        imageSrc: '/trending/cute-cat-cartoon.gif',
        badges: ['new', 'custom'],
        tagKeys: ['cartoon', 'cute'],
      },
      {
        id: 'parrot-pixel',
        imageSrc: '/trending/parrot-pixel.gif',
        badges: ['new', 'custom'],
        tagKeys: ['bird', 'pixel', 'retro'],
      },
      {
        id: 'fawn',
        imageSrc: '/trending/fawn-run-transparent.gif',
        badges: ['new', 'custom'],
        tagKeys: ['deer', 'minimal'],
      },
      {
        id: 'osito',
        imageSrc: '/trending/milk-and-mocha.gif',
        badges: ['new', 'custom'],
        tagKeys: ['bear', 'cute'],
      },
      {
        id: 'japan-creature',
        imageSrc: '/trending/cute-japan-creature.gif',
        badges: ['new', 'custom'],
        tagKeys: ['creature', 'kawaii'],
      },
      {
        id: 'purple-bat',
        imageSrc: '/trending/purple-bat.gif',
        badges: ['new', 'custom'],
        tagKeys: ['bat', 'minimal'],
      },
      {
        id: 'cute-bunny',
        imageSrc: '/trending/cute-bunny.gif',
        badges: ['new', 'custom'],
        tagKeys: ['bunny', 'cute'],
      },
      {
        id: 'pixel-tiger',
        imageSrc: '/trending/pixel-tiger (1).gif',
        badges: ['new', 'custom'],
        tagKeys: ['tiger', 'pixel', 'retro'],
      },
      {
        id: 'cute-dog',
        imageSrc: '/trending/cute-dog.gif',
        badges: ['new', 'custom'],
        tagKeys: ['dog', 'cute'],
      },
      {
        id: 'anatroll',
        imageSrc: '/trending/anatroll.gif',
        badges: ['new', 'custom'],
        tagKeys: ['creature', 'cute'],
      },
      {
        id: 'pixel-dogs',
        imageSrc: '/trending/pixel-dogs (2).gif',
        badges: ['new', 'custom'],
        tagKeys: ['dog', 'pixel', 'retro'],
      },
    ],
  },
  {
    id: 'collections',
    collections: [
      { id: 'classic', coverImageSrc: '/cats/catty.gif', itemCount: 4 },
      { id: 'pixel', coverImageSrc: '/cats/pixel-cat.gif', itemCount: 3 },
      { id: 'kawaii', coverImageSrc: '/cats/cute-kawaii.gif', itemCount: 4 },
      { id: 'dance', coverImageSrc: '/cats/orange-cat-dancing.gif', itemCount: 3 },
      { id: 'monochrome', coverImageSrc: '/cats/black.gif', itemCount: 2 },
      { id: 'orange', coverImageSrc: '/cats/cat-garfield.gif', itemCount: 4 },
    ],
  },
];
