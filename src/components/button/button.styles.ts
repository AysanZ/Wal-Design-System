import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Matrix taken from Figma → "❖ Button" page:
 *   Type   = Primary | Neutral | Error | Success | Basic
 *   Style  = Filled | Stroke | Lighter | Ghost
 *   Size   = Medium (40) | Small (36) | X-Small (32) | 2X-Small (28)
 *   Only Icon = On | Off
 *
 * Figma's "State" axis (Default/Hover/Focus/Disabled) is deliberately NOT a
 * prop. States belong to the browser: `:hover`, `:focus-visible`, `:disabled`.
 * Exposing them as props is how design systems end up with buttons that look
 * focused but aren't.
 */
export const buttonVariants = cva(
  [
    'relative inline-flex items-center justify-center shrink-0',
    'font-medium whitespace-nowrap select-none',
    'transition-colors duration-150 ease-out motion-reduce:transition-none',
    'cursor-pointer',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    'focus-visible:outline-primary-base',
    'disabled:pointer-events-none disabled:bg-disabled-300 disabled:text-sub-300',
    'disabled:border-transparent disabled:shadow-none',
  ],
  {
    variants: {
      color: {
        primary: '',
        neutral: '',
        error: '',
        success: '',
        basic: '',
      },
      appearance: {
        filled: '',
        stroke: 'border bg-transparent',
        lighter: '',
        ghost: 'bg-transparent',
      },
      size: {
        md: 'h-10 gap-1.5 rounded-lg px-3.5 text-[14px] leading-5 [&_svg]:size-5',
        sm: 'h-9 gap-1.5 rounded-lg px-3 text-[14px] leading-5 [&_svg]:size-5',
        xs: 'h-8 gap-1 rounded-md px-2.5 text-[12px] leading-4 [&_svg]:size-4',
        '2xs': 'h-7 gap-1 rounded-md px-2 text-[12px] leading-4 [&_svg]:size-4',
      },
      iconOnly: {
        true: 'px-0 aspect-square',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      // ── filled ────────────────────────────────────────────────────────
      {
        appearance: 'filled',
        color: 'primary',
        class: 'bg-primary-base text-static-white hover:bg-primary-dark',
      },
      {
        appearance: 'filled',
        color: 'neutral',
        class: 'bg-surface-800 text-static-white hover:bg-strong-950',
      },
      {
        appearance: 'filled',
        color: 'error',
        class: 'bg-error-base text-static-white hover:bg-error-dark',
      },
      {
        appearance: 'filled',
        color: 'success',
        class: 'bg-success-base text-static-white hover:bg-success-dark',
      },
      {
        appearance: 'filled',
        color: 'basic',
        class:
          'bg-white-0 text-sub-600 border border-soft-200 hover:bg-weak-50 shadow-xs',
      },

      // ── stroke ────────────────────────────────────────────────────────
      {
        appearance: 'stroke',
        color: 'primary',
        class:
          'border-primary-base text-primary-base hover:bg-information-lighter',
      },
      {
        appearance: 'stroke',
        color: 'neutral',
        class: 'border-soft-200 text-sub-600 hover:bg-weak-50',
      },
      {
        appearance: 'stroke',
        color: 'error',
        class: 'border-error-base text-error-base hover:bg-error-lighter',
      },
      {
        appearance: 'stroke',
        color: 'success',
        class: 'border-success-base text-success-base hover:bg-success-lighter',
      },
      {
        appearance: 'stroke',
        color: 'basic',
        class: 'border-soft-200 text-sub-600 hover:bg-weak-50',
      },

      // ── lighter ───────────────────────────────────────────────────────
      {
        appearance: 'lighter',
        color: 'primary',
        class:
          'bg-information-lighter text-primary-base hover:bg-information-light',
      },
      {
        appearance: 'lighter',
        color: 'neutral',
        class: 'bg-weak-50 text-sub-600 hover:bg-soft-200',
      },
      {
        appearance: 'lighter',
        color: 'error',
        class: 'bg-error-lighter text-error-base hover:bg-error-light',
      },
      {
        appearance: 'lighter',
        color: 'success',
        class: 'bg-success-lighter text-success-base hover:bg-success-light',
      },
      {
        appearance: 'lighter',
        color: 'basic',
        class: 'bg-weak-50 text-sub-600 hover:bg-soft-200',
      },

      // ── ghost ─────────────────────────────────────────────────────────
      {
        appearance: 'ghost',
        color: 'primary',
        class: 'text-primary-base hover:bg-information-lighter',
      },
      {
        appearance: 'ghost',
        color: 'neutral',
        class: 'text-sub-600 hover:bg-weak-50',
      },
      {
        appearance: 'ghost',
        color: 'error',
        class: 'text-error-base hover:bg-error-lighter',
      },
      {
        appearance: 'ghost',
        color: 'success',
        class: 'text-success-base hover:bg-success-lighter',
      },
      {
        appearance: 'ghost',
        color: 'basic',
        class: 'text-sub-600 hover:bg-weak-50',
      },
    ],
    defaultVariants: {
      color: 'primary',
      appearance: 'filled',
      size: 'md',
      iconOnly: false,
      fullWidth: false,
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
