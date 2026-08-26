import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Pagination" page.
 *
 *   Pagination      → Type = Number | Number & Arrow | Arrow, Size = Small | Medium
 *   Pagination Item → State = Default | Hover | Active | Disabled
 *
 * **Quantity is not a variant.** Figma draws a fixed number of page cells; a
 * real pagination has to render whatever `count` it is given, so the visible
 * window is computed (`getPaginationRange`) rather than enumerated.
 *
 * **State is not a prop either** — hover and disabled are CSS states, and
 * "Active" is `active`, which is a fact about the data (the page you are on),
 * not a look. See the component API conventions in the README.
 */
export const paginationVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'gap-1',
      md: 'gap-1.5',
    },
    align: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      /** Arrows pinned to the edges, summary in the middle — the mobile row. */
      between: 'w-full justify-between',
    },
  },
  defaultVariants: { size: 'md', align: 'center' },
});

export const paginationItemVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center',
    'rounded-lg font-medium tabular-nums',
    'cursor-pointer transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:pointer-events-none disabled:border-soft-200 disabled:bg-transparent disabled:text-sub-300',
    'aria-disabled:pointer-events-none aria-disabled:text-sub-300',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 min-w-8 px-2 text-[12px] leading-4 [&_svg]:size-4',
        md: 'h-9 min-w-9 px-2.5 text-[14px] leading-5 [&_svg]:size-5',
      },
      appearance: {
        ghost:
          'bg-transparent text-sub-600 hover:bg-weak-50 hover:text-strong-950',
        stroke:
          'border border-soft-200 bg-white-0 text-sub-600 shadow-[0_1px_2px_0_#0A0D1408] hover:bg-weak-50 hover:text-strong-950',
      },
      /** The page you are on. Renders `aria-current="page"`, not a link. */
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        active: true,
        class:
          'bg-weak-50 text-strong-950 hover:bg-weak-50 hover:text-strong-950',
      },
    ],
    defaultVariants: { size: 'md', appearance: 'ghost', active: false },
  },
);

export const paginationEllipsisVariants = cva(
  'inline-flex shrink-0 select-none items-center justify-center text-soft-400',
  {
    variants: {
      size: {
        sm: 'h-8 min-w-8 [&_svg]:size-4',
        md: 'h-9 min-w-9 [&_svg]:size-5',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const paginationSummaryVariants = cva(
  'select-none whitespace-nowrap tabular-nums text-sub-600',
  {
    variants: {
      size: {
        sm: 'px-1 text-[12px] leading-4',
        md: 'px-1.5 text-[14px] leading-5',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type PaginationVariantProps = VariantProps<typeof paginationVariants>;
export type PaginationItemVariantProps = VariantProps<
  typeof paginationItemVariants
>;
