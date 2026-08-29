import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Text Area" page.
 *   Text Area         → State (Default · Hover · Focus · Filled · Disabled · Error)
 *                        || Label, Counter, Hint Text
 *   Character Counter → State (Default | Error | Disabled) || Number, Resize
 *
 * Same finding as Text Input: hover, focus and disabled are CSS states and
 * "Filled" is whether the field has a value, so only `invalid` survives as a
 * prop.
 *
 * **There is no Size axis.** An earlier version of this file carried
 * `md`/`sm`; Figma draws one text area.
 */
export const textAreaFieldVariants = cva(
  [
    'flex w-full flex-col overflow-hidden',
    'rounded-lg border bg-white-0',
    'transition-colors duration-150',
    'shadow-xs',
    'focus-within:outline focus-within:outline-2 focus-within:outline-offset-2',
    'has-[textarea:disabled]:cursor-not-allowed has-[textarea:disabled]:bg-weak-50',
  ],
  {
    variants: {
      invalid: {
        true: 'border-error-base focus-within:outline-error-base',
        false:
          'border-soft-200 hover:border-sub-300 focus-within:border-primary-base focus-within:outline-primary-base',
      },
    },
    defaultVariants: { invalid: false },
  },
);

export const textAreaControlVariants = cva(
  [
    'w-full flex-1 bg-transparent px-3 py-2.5 text-[14px] leading-5 text-strong-950',
    'outline-none placeholder:text-soft-400',
    'disabled:cursor-not-allowed disabled:text-sub-300',
  ],
  {
    variants: {
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        both: 'resize',
      },
    },
    defaultVariants: { resize: 'vertical' },
  },
);

/** The counter row, sitting inside the box under the text. */
export const textAreaFooterVariants = cva(
  'flex items-center justify-end gap-2 border-t border-soft-200 bg-weak-50 px-3 py-1.5',
);

export const textAreaCounterVariants = cva('tabular-nums', {
  variants: {
    over: {
      true: 'font-medium text-error-base',
      false: 'text-sub-600',
    },
  },
  defaultVariants: { over: false },
});

export type TextAreaVariantProps = VariantProps<typeof textAreaFieldVariants>;
export type TextAreaControlVariantProps = VariantProps<
  typeof textAreaControlVariants
>;
