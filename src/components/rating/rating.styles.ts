import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Rating" page.
 *   Rating      → Size (Small | Medium | Large), Value 0–5, State (Read only | Interactive)
 *   Rating Item → Empty | Half | Filled
 *
 * Value is not a variant. Figma draws each score as its own frame; here the
 * fill comes from `value`, so 3.7 renders as three and a bit — a quantised
 * variant would be a component that cannot show the average it is given.
 */
export const ratingVariants = cva('inline-flex items-center', {
  variants: {
    size: {
      sm: 'gap-0.5 [&_svg]:size-4',
      md: 'gap-1 [&_svg]:size-5',
      lg: 'gap-1 [&_svg]:size-6',
    },
  },
  defaultVariants: { size: 'md' },
});

export const ratingItemVariants = cva(
  [
    'relative inline-grid place-items-center',
    'text-soft-200 transition-colors duration-150',
  ],
  {
    variants: {
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-60',
        false: '',
      },
    },
    defaultVariants: { interactive: false, disabled: false },
  },
);

/**
 * The filled glyph sits on top of the empty one and is clipped with a logical
 * inline size, so a half star fills from the right in Persian without a second
 * icon or a direction read in JavaScript.
 */
export const ratingFillVariants = cva(
  'pointer-events-none absolute inset-0 overflow-hidden',
  {
    variants: {
      color: {
        warning: 'text-warning-base',
        primary: 'text-primary-base',
        success: 'text-success-base',
        error: 'text-error-base',
        neutral: 'text-strong-950',
      },
    },
    defaultVariants: { color: 'warning' },
  },
);

export const ratingValueVariants = cva('tabular-nums text-sub-600', {
  variants: {
    size: {
      sm: 'ms-1 text-[12px] leading-4',
      md: 'ms-1.5 text-[14px] leading-5',
      lg: 'ms-2 text-[16px] leading-6',
    },
  },
  defaultVariants: { size: 'md' },
});

/**
 * The radio that carries the interaction and the semantics. Transparent and
 * stretched over the glyph rather than `display:none` — a hidden input cannot
 * be focused, and the whole point of using radios here is the keyboard
 * behaviour browsers give them for free.
 */
export const ratingInputVariants = cva([
  'peer absolute inset-0 m-0 cursor-pointer appearance-none opacity-0',
  'disabled:cursor-not-allowed',
]);

/** Focus lands on the input; the ring is drawn on the glyph beside it. */
export const ratingGlyphVariants = cva([
  'pointer-events-none relative rounded-sm',
  'peer-focus-visible:outline peer-focus-visible:outline-2',
  'peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-base',
]);

export type RatingVariantProps = VariantProps<typeof ratingVariants>;
export type RatingFillVariantProps = VariantProps<typeof ratingFillVariants>;
