import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Tag" page.
 *   Tag → Type (Basic | Left Icon | Avatar | Country | Brand | Company)
 *         × State (Default · Hover · Active · Disabled)
 *         × Style (Stroke | Gray)
 *         × Dismiss Icon = On/Off
 *         || Sublabel
 *
 * ## Axes this file used to invent
 *
 * - **`size` (sm | md)** does not exist. Figma draws one tag.
 * - **`appearance` had three values.** Figma has two: Stroke and Gray.
 *   `light` was made up; `filled` is Gray under another name.
 *
 * `Type` stays a slot rather than an enum, for the reason this codebase already
 * argued for Text Input adornments: as an enum, the six leading kinds are
 * mutually exclusive and a seventh needs a library release. `startAdornment`
 * takes an icon, an `<Avatar>`, a flag or a brand mark with no new API.
 *
 * ## Tag or Badge?
 *
 * They look alike and mean opposite things. A **Badge** is a *status* the
 * system assigns — "active", "3 unread" — and the user cannot remove it. A
 * **Tag** is *user content*: a label they attached, a filter they applied, a
 * recipient they picked, and it is usually removable. That is why dismissal
 * lives here and not there, and why Tag's palette is neutral by default while
 * Badge's carries meaning.
 */
export const tagVariants = cva(
  [
    'inline-flex h-7 max-w-full items-center gap-1 rounded-md ps-2',
    'text-[12px] leading-4 [&_svg]:size-4',
    'font-medium transition-colors duration-150',
  ],
  {
    variants: {
      appearance: {
        stroke: 'border border-soft-200 bg-white-0 text-sub-600',
        gray: 'bg-weak-50 text-strong-950',
      },
      /** No dismiss button, so the trailing edge needs its own padding. */
      dismissible: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'cursor-not-allowed border-soft-200 bg-weak-50 text-sub-300',
        false: '',
      },
      selected: {
        true: 'border-primary-base bg-information-lighter text-primary-base',
        false: '',
      },
    },
    compoundVariants: [
      { dismissible: false, class: 'pe-2' },
      { dismissible: true, class: 'pe-1' },
    ],
    defaultVariants: {
      appearance: 'stroke',
      dismissible: false,
      disabled: false,
      selected: false,
    },
  },
);

/** The label itself, as a button when the tag is selectable. */
export const tagContentVariants = cva(
  [
    'inline-flex min-w-0 items-center gap-1 truncate',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
  ],
  {
    variants: {
      interactive: {
        true: 'cursor-pointer rounded-sm hover:text-strong-950',
        false: '',
      },
    },
    defaultVariants: { interactive: false },
  },
);

export const tagDismissVariants = cva([
  'grid size-5 shrink-0 place-items-center rounded-sm [&_svg]:size-3.5',
  'cursor-pointer text-soft-400 transition-colors duration-150',
  'hover:bg-weak-50 hover:text-strong-950',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-base',
  'disabled:pointer-events-none disabled:text-sub-300',
]);

export const tagGroupVariants = cva('flex flex-wrap items-center gap-1.5');

export type TagVariantProps = VariantProps<typeof tagVariants>;
