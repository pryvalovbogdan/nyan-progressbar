import sortImports from '@trivago/prettier-plugin-sort-imports';

/** @type {import('prettier').Config} */
export default {
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  endOfLine: 'lf',
  arrowParens: 'avoid',
  importOrder: ['<THIRD_PARTY_MODULES>', '^@(shared|entities|features|widgets|views)/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [sortImports],
};
