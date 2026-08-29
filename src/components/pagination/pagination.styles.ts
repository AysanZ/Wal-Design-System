import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Pagination" page.
 *
 *   Pagination Cells → State (Default | Hover | Selected | Disabled)
 *                      × Full Radius = On/Off
 *   Pagination Group → Device Mode (Desktop | Mobile)
 *                      × Type (Basic | Full Radius | Group)
 *                      || First / Last, Next / Previous, Advanced
 *
 * ## Axes this file used to invent
 *
 * - **`size` (sm | md)** does not exist. Figma draws one cell height.
 * - **`appearance` (ghost | stroke)** does not exist either. What Figma
 *   actually varies is `Full Radius` — pill cells versus rounded-rect ones.
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
    align: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      /** Arrows pinned to the edges, summary in the middle — the mobile row. */
      between: 'w-full justify-between',
    },
  },
  defaultVariants: { align: 'center' },
});

export const paginationItemVariants = cva(
  [
    'inline-flex size-9 shrink-0 items-center justify-center',
    'text-[14px] leading-5 font-medium tabular-nums',
    'cursor-pointer transition-colors duration-150',
    'text-sub-600 hover:bg-weak-50 hover:text-strong-950',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:pointer-events-none disabled:border-soft-200 disabled:bg-transparent disabled:text-sub-300',
    'aria-disabled:pointer-events-none aria-disabled:text-sub-300',
  ],
  {
    variants: {
      /** Figma's `Full Radius`: pill cells instead of rounded rectangles. */
      fullRadius: {
        true: 'rounded-full',
        false: 'rounded-lg',
      },
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
    defaultVariants: { fullRadius: false, active: false },
  },
);

/**
 * Figma's `Group` type: the cells share one bordered track instead of floating
 * as separate targets.
 */
export const paginationGroupVariants = cva(
  'inline-flex items-center overflow-hidden rounded-lg border border-soft-200 shadow-xs [&>*]:rounded-none',
);

export const paginationEllipsisVariants = cva(
  'inline-flex size-9 shrink-0 select-none items-center justify-center text-soft-400',
);

export const paginationSummaryVariants = cva(
  'select-none whitespace-nowrap text-[14px] leading-5 tabular-nums text-sub-600',
);

export type PaginationVariantProps = VariantProps<typeof paginationVariants>;
export type PaginationItemVariantProps = VariantProps<
  typeof paginationItemVariants
>;
