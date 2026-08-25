import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "Filter" page (node 2868:15964).
 *   Horizontal Filter    → Type (Calendar | Table)
 *   Vertical Filter Items→ State (Default | Hover | Active)
 *
 * "Calendar" and "Table" describe the *surface* being filtered, not a visual
 * difference — both render a row of filter controls. So they are not a variant:
 * `FilterBar` is the row, and what you put in it is your business.
 */

export const filterBarVariants = cva(
  'flex w-full flex-wrap items-center gap-2',
  {
    variants: {
      surface: {
        plain: '',
        /** Boxed, for a filter bar pinned above a table. */
        panel: 'rounded-xl border border-soft-200 bg-white-0 p-2',
      },
    },
    defaultVariants: { surface: 'plain' },
  },
);

export const filterChipVariants = cva(
  [
    'inline-flex shrink-0 items-center gap-1.5 rounded-lg border',
    'text-[14px] font-medium leading-5',
    'transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:pointer-events-none disabled:bg-weak-50 disabled:text-sub-300',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 [&_svg]:size-4',
        md: 'h-9 px-3 [&_svg]:size-5',
      },
      active: {
        true: 'border-primary-base bg-information-lighter text-primary-base',
        false:
          'border-soft-200 bg-white-0 text-sub-600 hover:bg-weak-50 hover:text-strong-950',
      },
      /** A dashed chip reads as "add a filter" rather than "a filter is set". */
      placeholder: {
        true: 'border-dashed',
        false: '',
      },
    },
    defaultVariants: { size: 'sm', active: false, placeholder: false },
  },
);

export const filterListVariants = cva('flex w-full flex-col gap-0.5');

export const filterListItemVariants = cva(
  [
    'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-start',
    'text-[14px] leading-5 transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:pointer-events-none disabled:text-sub-300',
  ],
  {
    variants: {
      active: {
        true: 'bg-weak-50 font-medium text-strong-950',
        false: 'text-sub-600 hover:bg-weak-50 hover:text-strong-950',
      },
    },
    defaultVariants: { active: false },
  },
);

export type FilterChipVariantProps = VariantProps<typeof filterChipVariants>;
