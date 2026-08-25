import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Date Picker" page (node 29:30).
 *   Day Labels    → the weekday header row
 *   Day Cells     → Type (Basic | Range) × Active × Hover × Disabled × Marked × Empty
 *   Period Range  → the preset shortcuts column
 *   Date Selector → the month/year header, with left/right icons
 *   Date & Range Picker → Type (Date Picker | Range Picker)
 */

export const datePickerVariants = cva(
  'inline-flex flex-col gap-3 rounded-xl border border-soft-200 bg-white-0 p-3',
);

export const dateSelectorVariants = cva(
  'flex items-center justify-between gap-2 px-1',
);

export const dayLabelVariants = cva(
  'grid h-8 place-items-center text-[12px] font-medium leading-4 text-soft-400',
);

/**
 * A day cell.
 *
 * The range background is painted with pseudo-elements pinned to the inline
 * axis (`start`/`end`), so a range highlight flows right-to-left in Persian
 * without a mirrored copy of every rule.
 */
export const dayCellVariants = cva(
  [
    'relative grid size-9 place-items-center rounded-lg',
    'text-[14px] font-medium leading-5',
    'transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-base focus-visible:z-10',
    'disabled:pointer-events-none disabled:text-sub-300',
  ],
  {
    variants: {
      outside: {
        true: 'text-soft-400',
        false: 'text-strong-950',
      },
      selected: {
        true: 'bg-primary-base text-static-white hover:bg-primary-dark',
        false: 'hover:bg-weak-50',
      },
      /** Between the two ends of a range. */
      inRange: {
        true: 'rounded-none bg-information-lighter text-strong-950',
        false: '',
      },
      rangeEdge: {
        start: 'rounded-e-none',
        end: 'rounded-s-none',
        both: '',
        none: '',
      },
      today: {
        true: 'after:absolute after:bottom-1 after:size-1 after:rounded-full after:bg-primary-base',
        false: '',
      },
      /** Figma "Marked" — a dot for days that carry an event. */
      marked: {
        true: 'before:absolute before:top-1 before:size-1 before:rounded-full before:bg-feature-base',
        false: '',
      },
    },
    compoundVariants: [
      // A selected day already inverts its background, so the today dot has to
      // switch to the foreground colour or it disappears.
      { selected: true, today: true, class: 'after:bg-static-white' },
      { selected: true, marked: true, class: 'before:bg-static-white' },
    ],
    defaultVariants: {
      outside: false,
      selected: false,
      inRange: false,
      rangeEdge: 'none',
      today: false,
      marked: false,
    },
  },
);

export const periodRangeVariants = cva(
  'flex flex-col gap-0.5 border-e border-soft-200 pe-3',
);

export const periodRangeItemVariants = cva(
  [
    'rounded-lg px-3 py-2 text-start text-[14px] font-medium leading-5',
    'transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
  ],
  {
    variants: {
      selected: {
        true: 'bg-weak-50 text-strong-950',
        false: 'text-sub-600 hover:bg-weak-50 hover:text-strong-950',
      },
    },
    defaultVariants: { selected: false },
  },
);

export const calendarToggleVariants = cva([
  'inline-flex items-center gap-1 rounded-lg border border-soft-200 p-0.5',
]);

export type DayCellVariantProps = VariantProps<typeof dayCellVariants>;
