/**
 * Wal Design System — public API.
 *
 * Deep imports (`wal-ui/dist/components/badge/badge`) are NOT supported and
 * will break without a major version. Import from here, or from the two
 * documented subpaths:
 *
 *   wal-ui           components, providers, hooks, cn
 *   wal-ui/icons     runtime string→icon lookup (pulls the full icon set)
 *   wal-ui/styles.css   the stylesheet
 */

/* ── components ── */
export * from './components/accordion';
export * from './components/alert';
export * from './components/avatar';
export * from './components/badge';
export * from './components/banner';
export * from './components/button';
export * from './components/icon';
export * from './components/typography';

/* ── runtime ── */
export * from './providers';
export * from './hooks';
export { cn } from './lib/cn';
export { Slot } from './lib/slot';
export type { PolymorphicProps } from './lib/polymorphic';
export {
  toPersianDigits,
  toLatinDigits,
  formatNumber,
  parseLocalizedNumber,
} from './lib/numerals';
