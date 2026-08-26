import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Slider" page.
 *   Slider → Size (Small | Medium), Type (Single | Range),
 *            Value label = On | Off, Ticks = On | Off,
 *            State (Default · Hover · Focused · Disabled)
 *
 * State is not a prop — hover, focus and disabled are CSS states. "Type"
 * is not one either: one thumb or two follows from the shape of `value`
 * (`number` or `[number, number]`), so a range slider cannot be given a single
 * value by accident.
 */
export const sliderRootVariants = cva('flex w-full flex-col', {
  variants: {
    size: {
      sm: 'gap-1.5',
      md: 'gap-2',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-60',
      false: '',
    },
  },
  defaultVariants: { size: 'md', disabled: false },
});

export const sliderTrackVariants = cva(
  ['relative w-full rounded-full bg-soft-200', 'touch-none select-none'],
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-1.5',
      },
      disabled: {
        true: '',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: { size: 'md', disabled: false },
  },
);

/**
 * The filled span. Positioned with `inset-inline-start`, a logical property,
 * so the fill grows from the right inside an RTL subtree instead of running
 * backwards.
 */
export const sliderRangeVariants = cva('absolute inset-y-0 rounded-full', {
  variants: {
    color: {
      primary: 'bg-primary-base',
      success: 'bg-success-base',
      warning: 'bg-warning-base',
      error: 'bg-error-base',
      feature: 'bg-feature-base',
      neutral: 'bg-strong-950',
    },
  },
  defaultVariants: { color: 'primary' },
});

export const sliderThumbVariants = cva(
  [
    'absolute top-1/2 -translate-y-1/2',
    'rounded-full border-2 border-primary-base bg-white-0',
    'shadow-[0_1px_2px_0_#0A0D1408]',
    'transition-[box-shadow,transform] duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:cursor-not-allowed disabled:border-soft-200 disabled:bg-weak-50',
  ],
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-5',
      },
      disabled: {
        true: '',
        false: 'cursor-grab active:cursor-grabbing hover:scale-110',
      },
    },
    defaultVariants: { size: 'md', disabled: false },
  },
);

export const sliderTickVariants = cva(
  'absolute top-1/2 size-1 -translate-y-1/2 rounded-full bg-white-0/70',
);

export const sliderTickLabelVariants = cva(
  'absolute top-0 -translate-x-1/2 whitespace-nowrap tabular-nums text-soft-400 rtl:translate-x-1/2',
  {
    variants: {
      size: {
        sm: 'text-[11px] leading-4',
        md: 'text-[12px] leading-4',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const sliderHeaderVariants = cva(
  'flex items-center justify-between gap-2',
  {
    variants: {
      size: {
        sm: 'text-[12px] leading-4',
        md: 'text-[14px] leading-5',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type SliderVariantProps = VariantProps<typeof sliderRootVariants>;
export type SliderRangeVariantProps = VariantProps<typeof sliderRangeVariants>;
