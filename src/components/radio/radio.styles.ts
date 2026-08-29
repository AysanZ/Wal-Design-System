import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Radio" page.
 *   Radio       → State (Default · Hover · Focused · Disabled) × Active
 *   Radio Label → Active × Description × Flip
 *   Radio Group → Direction (Vertical | Horizontal)
 *
 * State is not a prop — hover, focus and disabled are CSS states. "Flip"
 * becomes `labelPosition`, expressed logically so `start` is left in English
 * and right in Persian.
 */
export const radioControlVariants = cva(
  [
    'peer relative grid size-5 shrink-0 place-items-center',
    'rounded-full border transition-colors duration-150',
    'cursor-pointer appearance-none',
    'border-soft-200 bg-white-0',
    'hover:border-sub-300',
    'checked:border-primary-base checked:bg-white-0',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:cursor-not-allowed disabled:border-soft-200 disabled:bg-weak-50',
    'disabled:checked:border-soft-200',
  ],
  {
    variants: {
      invalid: {
        true: 'border-error-base hover:border-error-base focus-visible:outline-error-base',
        false: '',
      },
    },
    defaultVariants: { invalid: false },
  },
);

/**
 * The dot is drawn over the input, not inside it: a native `<input>` cannot
 * have children. `peer-checked` keeps the two in sync with no JavaScript,
 * which is what lets the control stay a real radio for forms and for
 * assistive technology.
 */
export const radioIndicatorVariants = cva(
  [
    'pointer-events-none absolute inset-0 m-auto size-2 rounded-full',
    'bg-primary-base transition-transform duration-150',
    'scale-0 peer-checked:scale-100',
    'peer-disabled:bg-sub-300',
  ],
  {
    variants: {
      invalid: {
        true: 'bg-error-base',
        false: '',
      },
    },
    defaultVariants: { invalid: false },
  },
);

export const radioRootVariants = cva('inline-flex gap-2', {
  variants: {
    labelPosition: {
      end: 'flex-row',
      start: 'flex-row-reverse justify-between',
    },
    align: {
      center: 'items-center',
      start: 'items-start',
    },
  },
  defaultVariants: { labelPosition: 'end', align: 'center' },
});

export const radioLabelVariants = cva(
  'cursor-pointer select-none text-[14px] font-medium leading-5',
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed text-sub-300',
        false: 'text-strong-950',
      },
    },
    defaultVariants: { disabled: false },
  },
);

export const radioDescriptionVariants = cva(
  'text-[12px] font-normal leading-4',
  {
    variants: {
      disabled: {
        true: 'text-sub-300',
        false: 'text-sub-600',
      },
    },
    defaultVariants: { disabled: false },
  },
);

export const radioGroupVariants = cva('flex', {
  variants: {
    orientation: {
      vertical: 'flex-col gap-3',
      horizontal: 'flex-row flex-wrap items-center gap-4',
    },
  },
  defaultVariants: { orientation: 'vertical' },
});

export type RadioVariantProps = VariantProps<typeof radioRootVariants>;
export type RadioGroupVariantProps = VariantProps<typeof radioGroupVariants>;

/**
 * Figma → `Radio Card [1.0]`. The whole panel is the target, so the border and
 * background carry the state rather than the dot alone.
 */
export const radioCardVariants = cva(
  [
    'relative flex w-full cursor-pointer items-start gap-3 rounded-xl p-4',
    'border bg-white-0 text-start transition-colors duration-150',
    'has-[input:checked]:border-primary-base has-[input:checked]:bg-information-lighter',
    'has-[input:focus-visible]:outline has-[input:focus-visible]:outline-2',
    'has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-primary-base',
    'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:bg-weak-50',
  ],
  {
    variants: {
      invalid: {
        true: 'border-error-base',
        false: 'border-soft-200 hover:border-sub-300',
      },
    },
    defaultVariants: { invalid: false },
  },
);
