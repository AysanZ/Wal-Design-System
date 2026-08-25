import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Button" page, Link Button [1.0].
 *   Style = Gray | Black | Primary | Error | Success | Modifiable
 *   Size  = Medium (20) | Small (16)
 *   Underline = On | Off
 *
 * "Modifiable" in Figma means the colour is overridden per instance. In code
 * that is `color="inherit"` — the link takes the surrounding text colour,
 * which is what makes it usable inside a Banner or an Alert.
 */
export const linkButtonVariants = cva(
  [
    'inline-flex items-center gap-1 shrink-0',
    'rounded-xs font-medium',
    'cursor-pointer transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:pointer-events-none disabled:text-sub-300 aria-disabled:pointer-events-none aria-disabled:text-sub-300',
  ],
  {
    variants: {
      color: {
        gray: 'text-sub-600 hover:text-strong-950',
        black: 'text-strong-950 hover:text-sub-600',
        primary: 'text-primary-base hover:text-primary-dark',
        error: 'text-error-base hover:text-error-dark',
        success: 'text-success-base hover:text-success-dark',
        inherit: 'text-inherit hover:opacity-80',
      },
      size: {
        md: 'text-[14px] leading-5 [&_svg]:size-5',
        sm: 'text-[12px] leading-4 [&_svg]:size-4',
      },
      underline: {
        true: 'underline underline-offset-2 [text-underline-position:from-font]',
        false: 'no-underline',
      },
    },
    defaultVariants: { color: 'gray', size: 'md', underline: false },
  },
);

export type LinkButtonVariantProps = VariantProps<typeof linkButtonVariants>;
