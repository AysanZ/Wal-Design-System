import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Progress Bar" page.
 *
 *   Progress Bar    → Size = XSmall | Small | Medium, Color, Label = On | Off
 *   Progress Circle → Size = Small | Medium | Large
 *
 * Figma draws percentages as discrete frames (0 / 25 / 50 / 75 / 100). In code
 * the fill is `value / max`, so anything in between renders correctly — a
 * quantised variant would be a component that cannot show 63%.
 */
export const progressTrackVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-soft-200',
  {
    variants: {
      size: {
        xs: 'h-1',
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const progressFillVariants = cva(
  'h-full rounded-full transition-[inline-size] duration-300 ease-out motion-reduce:transition-none',
  {
    variants: {
      color: {
        primary: 'bg-primary-base',
        success: 'bg-success-base',
        warning: 'bg-warning-base',
        error: 'bg-error-base',
        feature: 'bg-feature-base',
        neutral: 'bg-strong-950',
      },
      /**
       * Unknown duration. The stripe travels along `inset-inline-start`, a
       * logical property, so it runs right-to-left in Persian without a second
       * keyframe or a direction read in JavaScript.
       */
      indeterminate: {
        true: 'absolute top-0 w-2/5 animate-[wal-progress-indeterminate_1.4s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:w-full',
        false: '',
      },
    },
    defaultVariants: { color: 'primary', indeterminate: false },
  },
);

export const progressLabelVariants = cva(
  'flex items-center justify-between gap-2',
  {
    variants: {
      size: {
        xs: 'text-[12px] leading-4',
        sm: 'text-[12px] leading-4',
        md: 'text-[14px] leading-5',
        lg: 'text-[14px] leading-5',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

/** Radial readout — same value, for tiles and cards where width is scarce. */
export const progressCircleVariants = cva(
  'relative inline-grid place-items-center',
  {
    variants: {
      size: {
        sm: 'size-10 text-[11px] leading-4',
        md: 'size-16 text-[14px] leading-5',
        lg: 'size-24 text-[18px] leading-6',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const progressCircleStrokeVariants = cva(
  'transition-[stroke-dashoffset] duration-300 ease-out motion-reduce:transition-none',
  {
    variants: {
      color: {
        primary: 'stroke-primary-base',
        success: 'stroke-success-base',
        warning: 'stroke-warning-base',
        error: 'stroke-error-base',
        feature: 'stroke-feature-base',
        neutral: 'stroke-strong-950',
      },
    },
    defaultVariants: { color: 'primary' },
  },
);

export type ProgressTrackVariantProps = VariantProps<
  typeof progressTrackVariants
>;
export type ProgressFillVariantProps = VariantProps<
  typeof progressFillVariants
>;
export type ProgressCircleVariantProps = VariantProps<
  typeof progressCircleVariants
>;
