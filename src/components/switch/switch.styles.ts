import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Switch" page.
 *   Switch       → Size (Small | Medium), State (Default · Hover · Focused · Disabled) × Active
 *   Switch Label → Active × Description × Flip
 *
 * State is not a prop — hover, focus and disabled are CSS states, and a
 * `state="focused"` prop produces a control that looks focused but is not.
 */
export const switchControlVariants = cva(
  [
    'peer relative shrink-0 appearance-none rounded-full',
    'cursor-pointer transition-colors duration-200 motion-reduce:transition-none',
    'bg-soft-200 hover:bg-sub-300',
    'checked:bg-primary-base checked:hover:bg-primary-dark',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:cursor-not-allowed disabled:bg-weak-50 disabled:hover:bg-weak-50',
    'disabled:checked:bg-sub-300',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-7',
        md: 'h-5 w-9',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

/**
 * The knob is drawn over the input, because a native `<input>` cannot have
 * children. `peer-checked` keeps the two in sync with no JavaScript, which is
 * what lets the control stay a real checkbox for forms and assistive tech.
 *
 * The travel is mirrored under `rtl:`, since `translate-x` is physical: an
 * unmirrored knob would slide *out of* the track in Persian.
 */
export const switchThumbVariants = cva(
  [
    'pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-white-0',
    'shadow-[0_1px_2px_0_#0A0D1408] transition-transform duration-200',
    'motion-reduce:transition-none',
    'peer-disabled:bg-weak-50',
  ],
  {
    variants: {
      size: {
        sm: 'start-0.5 size-3 peer-checked:translate-x-3 peer-checked:rtl:-translate-x-3',
        md: 'start-0.5 size-4 peer-checked:translate-x-4 peer-checked:rtl:-translate-x-4',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const switchRootVariants = cva('inline-flex gap-2', {
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

export const switchLabelVariants = cva(
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

export const switchDescriptionVariants = cva(
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

export type SwitchVariantProps = VariantProps<typeof switchControlVariants>;
