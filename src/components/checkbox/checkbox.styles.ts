import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Checkbox" page (node 29:28).
 *   Checkbox       → State (Default · Hover · Focused · Disabled) × Active × Indeterminate
 *   Checkbox Label → Active × Description × Flip
 *
 * State is not a prop: hover, focus and disabled are CSS states. `Flip` becomes
 * `labelPosition`, expressed with logical properties so it follows the reading
 * direction instead of hardcoding a side.
 */
export const checkboxControlVariants = cva(
  [
    'peer relative grid size-5 shrink-0 place-items-center',
    'rounded-sm border transition-colors duration-150',
    'cursor-pointer appearance-none',
    'border-soft-200 bg-white-0',
    'hover:border-sub-300',
    'checked:border-primary-base checked:bg-primary-base',
    'indeterminate:border-primary-base indeterminate:bg-primary-base',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:cursor-not-allowed disabled:border-soft-200 disabled:bg-weak-50',
    'disabled:checked:border-soft-200 disabled:checked:bg-sub-300',
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
 * The glyph is drawn on top of the input rather than inside it, because a
 * native `<input type="checkbox">` cannot have children. `peer-checked`
 * keeps the two in sync without a single line of JavaScript, which is what
 * lets the control stay a real checkbox for forms and assistive tech.
 */
export const checkboxIndicatorVariants = cva([
  'pointer-events-none absolute inset-0 grid place-items-center',
  'text-static-white opacity-0 transition-opacity duration-150',
  'peer-checked:opacity-100 peer-indeterminate:opacity-100',
]);

export const checkboxRootVariants = cva('inline-flex gap-2', {
  variants: {
    labelPosition: {
      // `flex-row-reverse` on top of logical properties: the control moves to
      // the opposite edge in both LTR and RTL, which is what Figma's "Flip" is.
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

export const checkboxLabelVariants = cva(
  'text-[14px] font-medium leading-5 cursor-pointer select-none',
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

export const checkboxDescriptionVariants = cva(
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

export type CheckboxVariantProps = VariantProps<typeof checkboxRootVariants>;
