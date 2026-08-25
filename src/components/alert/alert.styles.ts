import { cva, type VariantProps } from 'class-variance-authority';

/**
 * The previous version expressed this matrix as a five-deep nested ternary
 * inside `clsx` — ~60 lines where one wrong branch sat undetected: the
 * info + light cell resolved to the `information-dark` token instead of
 * `information-light-dark`. `cva` makes the
 * same matrix declarative, and semantic tokens remove the `dark:` half of it.
 */
export const alertVariants = cva(
  'flex w-full items-start justify-between shrink-0',
  {
    variants: {
      status: {
        error: '',
        warning: '',
        success: '',
        info: '',
        feature: '',
      },
      appearance: {
        filled: 'text-static-white',
        light: 'text-strong-950',
        lighter: 'text-strong-950',
        stroke:
          'bg-white-0 text-strong-950 border border-soft-200 shadow-[0_16px_32px_-12px_#0E121B1A]',
      },
      size: {
        'x-small': 'gap-2 rounded-lg p-2',
        small: 'gap-2 rounded-lg px-2.5 py-2',
        large: 'gap-3 rounded-xl p-3.5 pb-4',
      },
    },
    compoundVariants: [
      { status: 'error', appearance: 'filled', class: 'bg-error-base' },
      { status: 'error', appearance: 'light', class: 'bg-error-light' },
      { status: 'error', appearance: 'lighter', class: 'bg-error-lighter' },

      { status: 'warning', appearance: 'filled', class: 'bg-warning-base' },
      { status: 'warning', appearance: 'light', class: 'bg-warning-light' },
      { status: 'warning', appearance: 'lighter', class: 'bg-warning-lighter' },

      { status: 'success', appearance: 'filled', class: 'bg-success-base' },
      { status: 'success', appearance: 'light', class: 'bg-success-light' },
      { status: 'success', appearance: 'lighter', class: 'bg-success-lighter' },

      { status: 'info', appearance: 'filled', class: 'bg-information-base' },
      { status: 'info', appearance: 'light', class: 'bg-information-light' },
      {
        status: 'info',
        appearance: 'lighter',
        class: 'bg-information-lighter',
      },

      { status: 'feature', appearance: 'filled', class: 'bg-feature-base' },
      { status: 'feature', appearance: 'light', class: 'bg-feature-light' },
      { status: 'feature', appearance: 'lighter', class: 'bg-feature-lighter' },
    ],
    defaultVariants: {
      status: 'info',
      appearance: 'filled',
      size: 'small',
    },
  },
);

export const alertIconVariants = cva('shrink-0 [&>svg]:size-4', {
  variants: {
    status: {
      error: '',
      warning: '',
      success: '',
      info: '',
      feature: '',
    },
    appearance: {
      filled: 'text-static-white',
      light: '',
      lighter: '',
      stroke: '',
    },
  },
  compoundVariants: [
    {
      status: 'error',
      appearance: ['light', 'lighter', 'stroke'],
      class: 'text-error-base',
    },
    {
      status: 'warning',
      appearance: ['light', 'lighter', 'stroke'],
      class: 'text-warning-base',
    },
    {
      status: 'success',
      appearance: ['light', 'lighter', 'stroke'],
      class: 'text-success-base',
    },
    {
      status: 'info',
      appearance: ['light', 'lighter', 'stroke'],
      class: 'text-information-base',
    },
    {
      status: 'feature',
      appearance: ['light', 'lighter', 'stroke'],
      class: 'text-feature-base',
    },
  ],
  defaultVariants: { status: 'info', appearance: 'filled' },
});

export const alertActionVariants = cva(
  [
    'inline-flex items-center rounded-sm underline underline-offset-2',
    'text-[14px] font-medium leading-5',
    'cursor-pointer transition-opacity hover:opacity-80',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  ],
  {
    variants: {
      appearance: {
        filled: 'text-static-white focus-visible:outline-static-white',
        light: 'text-strong-950 focus-visible:outline-primary-base',
        lighter: 'text-strong-950 focus-visible:outline-primary-base',
        stroke: 'text-strong-950 focus-visible:outline-primary-base',
      },
    },
    defaultVariants: { appearance: 'filled' },
  },
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;
