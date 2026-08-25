import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Button Group" page (node 29:27).
 *   Group → Quantity 02–06, Size = Small (36) | X-Small (32) | 2X-Small (24)
 *   Item  → State, Size, Only Icon, Left Icon, Right Icon
 *
 * Quantity is not a prop — the count is however many children you pass.
 * The segmented look comes from collapsing the shared borders, which is a
 * `:first-child`/`:last-child` concern, not a per-item variant.
 */
export const buttonGroupVariants = cva('inline-flex isolate', {
  variants: {
    orientation: {
      // -ms-px collapses the doubled border between neighbours. Logical, so
      // the seam lands on the correct side in RTL.
      horizontal: 'flex-row [&>*:not(:first-child)]:-ms-px',
      vertical: 'flex-col [&>*:not(:first-child)]:-mt-px',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const buttonGroupItemVariants = cva(
  [
    'relative inline-flex items-center justify-center shrink-0',
    'gap-1 border border-soft-200 bg-white-0 text-sub-600',
    'font-medium whitespace-nowrap',
    'cursor-pointer transition-colors duration-150',
    'hover:bg-weak-50 hover:text-strong-950',
    // Raise the focused and selected segments so their border wins over the
    // neighbour it is overlapping.
    'focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:pointer-events-none disabled:bg-weak-50 disabled:text-sub-300',
  ],
  {
    variants: {
      size: {
        sm: 'h-9 px-3 text-[14px] leading-5 [&_svg]:size-5',
        xs: 'h-8 px-2.5 text-[12px] leading-4 [&_svg]:size-4',
        '2xs': 'h-6 px-2 text-[12px] leading-4 [&_svg]:size-4',
      },
      selected: {
        true: 'z-10 bg-weak-50 text-strong-950',
        false: '',
      },
      iconOnly: { true: 'px-0 aspect-square', false: '' },
      orientation: {
        // Only the outer edges are rounded, so the row reads as one control.
        horizontal:
          'first:rounded-s-lg last:rounded-e-lg [&:not(:first-child):not(:last-child)]:rounded-none',
        vertical:
          'first:rounded-t-lg last:rounded-b-lg [&:not(:first-child):not(:last-child)]:rounded-none',
      },
    },
    defaultVariants: {
      size: 'sm',
      selected: false,
      iconOnly: false,
      orientation: 'horizontal',
    },
  },
);

export type ButtonGroupVariantProps = VariantProps<
  typeof buttonGroupItemVariants
>;
