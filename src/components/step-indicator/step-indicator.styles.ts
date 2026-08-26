import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Step Indicator" page.
 *   Step Indicator → Direction (Horizontal | Vertical), Type (Number | Dot | Bar)
 *   Step           → State (Complete | Current | Upcoming | Error),
 *                    Label = On/Off, Description = On/Off
 *
 * Quantity is not a prop — the step count is however many children you pass.
 * State *is* a prop here, unlike hover or focus elsewhere in this system: a
 * step's state is a fact about where the user is in the flow, not a pointer
 * interaction, and it is derived from `value` unless a step overrides it (an
 * `error` step, for instance).
 */
export const stepIndicatorVariants = cva('flex w-full', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-start',
      vertical: 'flex-col',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const stepItemVariants = cva('group/step flex min-w-0', {
  variants: {
    orientation: {
      horizontal: 'flex-1 flex-col items-center gap-2 text-center',
      vertical: 'flex-row items-stretch gap-3 text-start',
    },
    interactive: {
      true: '',
      false: '',
    },
  },
  defaultVariants: { orientation: 'horizontal', interactive: false },
});

/** The numbered circle, the dot, or the bar segment. */
export const stepMarkerVariants = cva(
  [
    'grid shrink-0 place-items-center rounded-full',
    'font-medium tabular-nums transition-colors duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      type: {
        number: '',
        dot: '',
        bar: 'w-full rounded-full',
      },
      size: {
        sm: 'text-[11px] leading-4',
        md: 'text-[12px] leading-4',
      },
      status: {
        complete: 'bg-primary-base text-static-white',
        current: 'bg-primary-base text-static-white',
        upcoming: 'bg-weak-50 text-sub-600',
        error: 'bg-error-base text-static-white',
      },
    },
    compoundVariants: [
      { type: 'number', size: 'sm', class: 'size-6 [&_svg]:size-3.5' },
      { type: 'number', size: 'md', class: 'size-8 [&_svg]:size-4' },
      { type: 'dot', size: 'sm', class: 'size-2.5' },
      { type: 'dot', size: 'md', class: 'size-3' },
      { type: 'bar', size: 'sm', class: 'h-1' },
      { type: 'bar', size: 'md', class: 'h-1.5' },
      // A ring makes the current step readable without relying on colour
      // alone, which fails for the same users twice: colour-blind and
      // high-contrast.
      {
        status: 'current',
        class: 'ring-4 ring-primary-alpha-16',
      },
      { status: 'error', class: 'ring-4 ring-error-lighter' },
    ],
    defaultVariants: { type: 'number', size: 'md', status: 'upcoming' },
  },
);

/**
 * The line between two steps. Sized with logical properties, so a horizontal
 * connector grows from the right in Persian and a vertical one is unaffected.
 */
export const stepConnectorVariants = cva('shrink-0 rounded-full', {
  variants: {
    orientation: {
      horizontal: 'h-0.5 flex-1',
      vertical: 'w-0.5 flex-1',
    },
    complete: {
      true: 'bg-primary-base',
      false: 'bg-soft-200',
    },
  },
  defaultVariants: { orientation: 'horizontal', complete: false },
});

export const stepLabelVariants = cva('truncate font-medium', {
  variants: {
    size: {
      sm: 'text-[12px] leading-4',
      md: 'text-[14px] leading-5',
    },
    status: {
      complete: 'text-strong-950',
      current: 'text-strong-950',
      upcoming: 'text-sub-600',
      error: 'text-error-base',
    },
  },
  defaultVariants: { size: 'md', status: 'upcoming' },
});

export const stepDescriptionVariants = cva(
  'text-[12px] leading-4 text-sub-600',
);

export type StepIndicatorVariantProps = VariantProps<
  typeof stepIndicatorVariants
>;
export type StepMarkerVariantProps = VariantProps<typeof stepMarkerVariants>;
