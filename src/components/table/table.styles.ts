import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Table" page.
 *   Table       → Type (Default | Bordered | Striped), Size (Medium | Small)
 *   Table Head  → Sortable = On/Off, State (Default · Hover · Sorted)
 *   Table Cell  → Type (Text · Content Label · Badge · Actions · Checkbox)
 *
 * Cell "Types" are content, not variants: a cell holds whatever you put in it,
 * and the five Figma frames are five things to put there. Encoding them as an
 * enum would mean a table that cannot show an avatar *and* a badge in one
 * cell, and a library release for every sixth kind.
 */
export const tableScrollVariants = cva(
  'w-full overflow-x-auto rounded-xl border border-soft-200',
);

export const tableVariants = cva('w-full border-collapse text-start', {
  variants: {
    size: {
      md: 'text-[14px] leading-5',
      sm: 'text-[12px] leading-4',
    },
    appearance: {
      default: '',
      /** Vertical rules as well as horizontal ones. */
      bordered:
        '[&_td]:border-e [&_th]:border-e [&_td]:border-soft-200 [&_th]:border-soft-200 [&_td:last-child]:border-e-0 [&_th:last-child]:border-e-0',
      striped: '[&_tbody_tr:nth-child(even)]:bg-weak-50',
    },
  },
  defaultVariants: { size: 'md', appearance: 'default' },
});

export const tableHeaderVariants = cva('bg-weak-50 text-sub-600', {
  variants: {
    sticky: {
      // The header stays put while the body scrolls. `z-1` keeps it above the
      // rows sliding under it.
      true: '[&_th]:sticky [&_th]:top-0 [&_th]:z-1 [&_th]:bg-weak-50',
      false: '',
    },
  },
  defaultVariants: { sticky: false },
});

export const tableHeadVariants = cva(
  ['border-b border-soft-200 text-start font-medium', 'whitespace-nowrap'],
  {
    variants: {
      size: {
        md: 'h-10 px-3',
        sm: 'h-9 px-2.5',
      },
      align: {
        start: 'text-start',
        center: 'text-center',
        end: 'text-end',
      },
    },
    defaultVariants: { size: 'md', align: 'start' },
  },
);

/** The button inside a sortable header — the whole cell is the target. */
export const tableSortButtonVariants = cva(
  [
    'inline-flex w-full items-center gap-1',
    'cursor-pointer rounded-sm text-inherit transition-colors duration-150',
    'hover:text-strong-950',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
  ],
  {
    variants: {
      align: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
      },
      sorted: {
        true: 'text-strong-950',
        false: '',
      },
    },
    defaultVariants: { align: 'start', sorted: false },
  },
);

export const tableRowVariants = cva(
  'border-b border-soft-200 last:border-b-0',
  {
    variants: {
      interactive: {
        true: 'cursor-pointer transition-colors duration-150 hover:bg-weak-50',
        false: '',
      },
      selected: {
        true: 'bg-information-lighter hover:bg-information-lighter',
        false: '',
      },
    },
    defaultVariants: { interactive: false, selected: false },
  },
);

export const tableCellVariants = cva('text-strong-950', {
  variants: {
    size: {
      md: 'h-14 px-3',
      sm: 'h-11 px-2.5',
    },
    align: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
    },
    /** Numeric columns line up when the digits are the same width. */
    numeric: {
      true: 'tabular-nums',
      false: '',
    },
  },
  defaultVariants: { size: 'md', align: 'start', numeric: false },
});

export const tableCaptionVariants = cva(
  'px-3 py-2 text-start text-[12px] leading-4 text-sub-600',
);

export type TableVariantProps = VariantProps<typeof tableVariants>;
export type TableCellVariantProps = VariantProps<typeof tableCellVariants>;
