import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Text Input" page.
 *   Input → Size (Medium 40 · Small 36 · X-Small 32)
 *           × State (Default · Hover · Focus · Filled · Disabled · Error)
 *           × Leading (Icon | Text | None) × Trailing (Icon | Text | None)
 *
 * State is not a prop. Hover, focus and disabled are CSS states; "Filled" is
 * whether the field has a value, which the input already knows. Only `invalid`
 * survives as a prop, because nothing in the DOM can work it out.
 *
 * Leading and trailing are slots rather than an enum: as an enum, "an icon on
 * one side and a unit on the other" is unreachable, and every new kind of
 * adornment needs a library release.
 */
export const textInputFieldVariants = cva(
  [
    'flex w-full items-center overflow-hidden',
    'rounded-lg border bg-white-0',
    'transition-colors duration-150',
    'shadow-[0_1px_2px_0_#0A0D1408]',
    // The border lives on this wrapper, not on the input, so an adornment
    // sits *inside* the field instead of beside a second box.
    'focus-within:outline focus-within:outline-2 focus-within:outline-offset-2',
    'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:bg-weak-50',
  ],
  {
    variants: {
      size: {
        md: 'h-10 gap-2 text-[14px] leading-5 [&_svg]:size-5',
        sm: 'h-9 gap-2 text-[14px] leading-5 [&_svg]:size-5',
        xs: 'h-8 gap-1.5 text-[12px] leading-4 [&_svg]:size-4',
      },
      invalid: {
        true: 'border-error-base focus-within:outline-error-base',
        false:
          'border-soft-200 hover:border-sub-300 focus-within:border-primary-base focus-within:outline-primary-base',
      },
    },
    defaultVariants: { size: 'md', invalid: false },
  },
);

export const textInputControlVariants = cva(
  [
    'min-w-0 flex-1 bg-transparent text-strong-950',
    'outline-none placeholder:text-soft-400',
    'disabled:cursor-not-allowed disabled:text-sub-300',
  ],
  {
    variants: {
      size: {
        md: 'px-3',
        sm: 'px-2.5',
        xs: 'px-2',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

/** Icon or button sitting inside the field, on either edge. */
export const textInputAdornmentVariants = cva(
  'grid shrink-0 place-items-center text-soft-400',
  {
    variants: {
      side: {
        start: 'ps-3',
        end: 'pe-3',
      },
      size: {
        md: '',
        sm: '',
        xs: '',
      },
    },
    compoundVariants: [
      { side: 'start', size: 'xs', class: 'ps-2' },
      { side: 'end', size: 'xs', class: 'pe-2' },
    ],
    defaultVariants: { side: 'start', size: 'md' },
  },
);

/**
 * Attached text block — `https://`, `.com`, `تومان`. Bordered on its inner
 * edge with a logical property, so the divider lands between the affix and the
 * field in both directions rather than always on the right.
 */
export const textInputAffixVariants = cva(
  'grid h-full shrink-0 place-items-center bg-weak-50 text-sub-600',
  {
    variants: {
      side: {
        start: 'border-e border-soft-200',
        end: 'border-s border-soft-200',
      },
      size: {
        md: 'px-3',
        sm: 'px-2.5',
        xs: 'px-2',
      },
    },
    defaultVariants: { side: 'start', size: 'md' },
  },
);

export type TextInputVariantProps = VariantProps<typeof textInputFieldVariants>;
