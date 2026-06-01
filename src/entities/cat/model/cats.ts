import { CatEntry } from './types';

export const catsData: Record<string, CatEntry> = {
  'black.gif': { src: 'black.gif', styles: { height: '34px', top: '-13px', topHover: '-16px', topMusic: '-1px' } },
  'catty.gif': { src: 'catty.gif', styles: { height: '20px', top: '-5px', topHover: '-8px', topMusic: '5px' } },
  'glitch-cat.gif': {
    src: 'glitch-cat.gif',
    styles: { height: '28px', top: '-13px', topHover: '-18px', topMusic: '-5px' },
  },
  'cute-cat.gif': {
    src: 'cute-cat.gif',
    styles: { height: '45px', top: '-23px', topHover: '-25px', topMusic: '-13px' },
  },
  'cute-kawaii.gif': {
    src: 'cute-kawaii.gif',
    styles: { height: '56px', top: '-42px', topHover: '-48px', topMusic: '-33px' },
  },
  'gatito.gif': { src: 'gatito.gif', styles: { height: '40px', top: '-28px', topHover: '-30px', topMusic: '-18px' } },
  'kitty-wigglez.gif': {
    src: 'kitty-wigglez.gif',
    styles: { height: '32px', top: '-17px', topHover: '-20px', topMusic: '-11px' },
  },
  'orange-cat-orange.gif': {
    src: 'orange-cat-orange.gif',
    styles: { height: '32px', top: '-17px', topHover: '-20px', topMusic: '-5px' },
  },
  'pixel-cat.gif': {
    src: 'pixel-cat.gif',
    styles: { height: '32px', top: '-17px', topHover: '-20px', topMusic: '-7px' },
  },
  'cat-garfield.gif': {
    src: 'cat-garfield.gif',
    styles: { height: '42px', top: '-25px', topHover: '-28px', topMusic: '-14px' },
  },
  'white-cat.gif': {
    src: 'white-cat.gif',
    styles: { height: '37px', top: '-17px', topHover: '-20px', topMusic: '-7px' },
  },
  'orange-cat-dancing.gif': {
    src: 'orange-cat-dancing.gif',
    styles: { height: '40px', top: '-23px', topHover: '-25px', topMusic: '-15px' },
  },
};

export const catsList = Object.values(catsData);
