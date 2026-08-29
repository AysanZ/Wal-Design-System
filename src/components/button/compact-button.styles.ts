import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Button" page, Compact Button [1.0].
 *   Style = Stroke | Ghost | White | Error | Modifiable
 *   Size  = Large (24) | Medium (20)
 *   Full Radius = On | Off
 *
 * Square icon-only control for tight spaces — table row actions, input
 * adornments, toolbar affordances. Always icon-only, so `aria-label` is
 * required rather than optional.
 */
export const compactButtonVariants = cva(
  [
    'inline-flex items-center justify-center shrink-0 aspect-square',
    'cursor-pointer transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:pointer-events-none disabled:bg-transparent disabled:text-sub-300 disabled:border-soft-200',
  ],
  {
    variants: {
      appearance: {
        stroke:
          'border border-soft-200 bg-white-0 text-sub-600 hover:bg-weak-50 hover:text-strong-950 shadow-xs',
        ghost:
          'bg-transparent text-sub-600 hover:bg-weak-50 hover:text-strong-950',
        white:
          'bg-white-0 text-sub-600 hover:text-strong-950 shadow-xs',
        error: 'bg-transparent text-error-base hover:bg-error-lighter',
        inherit: 'bg-transparent text-inherit hover:opacity-80',
      },
      size: {
        lg: 'size-6 [&_svg]:size-5',
        md: 'size-5 [&_svg]:size-4',
      },
      fullRadius: {
        true: 'rounded-full',
        false: 'rounded-xs',
      },
    },
    defaultVariants: { appearance: 'stroke', size: 'lg', fullRadius: false },
  },
);

export type CompactButtonVariantProps = VariantProps<
  typeof compactButtonVariants
>;
