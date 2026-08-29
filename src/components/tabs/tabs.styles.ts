import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Tab Menu" page.
 *   Tab Menu Horizontal       → Quantity (02…06)          || Button
 *   Tab Menu Horizontal Items → State (Default · Hover · Active)
 *                               || Left Icon, Right Icon, Number
 *   Tab Menu Vertical         → Style (Card | List), Quantity (02…08) || Divider
 *   Tab Menu Vertical Items   → State (Default · Hover · Active)
 *                               || Left Icon, Right Icon, Number
 *
 * ## Axes this file used to invent
 *
 * - **`appearance` (line | segmented | pill)** does not exist. Figma draws
 *   horizontal tabs one way — an underline — and the only style axis in the
 *   file is `Style (Card | List)`, which is **vertical-only**. The segmented
 *   form that used to live here is a different component entirely: Figma's
 *   "Switch Toggle", in `components/toggle`.
 * - **`size` (sm | md)** does not exist on either orientation.
 *
 * Quantity is not a prop — the tab count is however many children you pass.
 * State is not one either: hover is a CSS state and "Active" is the selected
 * value.
 */
export const tabsListVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-center gap-1 border-b border-soft-200',
      vertical: 'flex-col items-stretch',
    },
    /** Figma's vertical `Style`. Ignored when horizontal — Figma has no such axis there. */
    appearance: {
      card: '',
      list: '',
    },
    /** Tabs share the width instead of hugging their labels. */
    stretch: {
      true: '[&>*]:flex-1',
      false: '',
    },
  },
  compoundVariants: [
    {
      orientation: 'vertical',
      appearance: 'card',
      class: 'gap-1 rounded-xl border border-soft-200 bg-white-0 p-1 shadow-xs',
    },
    { orientation: 'vertical', appearance: 'list', class: 'gap-0.5' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    appearance: 'list',
    stretch: false,
  },
});

export const tabsTriggerVariants = cva(
  [
    'relative inline-flex shrink-0 items-center gap-1.5',
    'px-3 py-2.5 text-[14px] font-medium leading-5 [&_svg]:size-5',
    'cursor-pointer whitespace-nowrap transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-base',
    'disabled:pointer-events-none disabled:text-sub-300',
  ],
  {
    variants: {
      orientation: {
        /**
         * The underline is a pseudo-element pinned to the inline box, not a
         * border on the button, so it stays under the label when the row is
         * reversed in RTL and does not shift the text by a pixel when it
         * appears.
         */
        horizontal:
          'justify-center after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full',
        vertical: 'justify-start rounded-lg text-start',
      },
      appearance: {
        card: '',
        list: '',
      },
      selected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        orientation: 'horizontal',
        selected: true,
        class: 'text-strong-950 after:bg-primary-base',
      },
      {
        orientation: 'horizontal',
        selected: false,
        class: 'text-sub-600 hover:text-strong-950 after:bg-transparent',
      },
      {
        orientation: 'vertical',
        selected: true,
        class: 'bg-weak-50 text-strong-950',
      },
      {
        orientation: 'vertical',
        selected: false,
        class: 'text-sub-600 hover:bg-weak-50 hover:text-strong-950',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      appearance: 'list',
      selected: false,
    },
  },
);

/** Figma's vertical `Divider` — a rule between groups of tabs. */
export const tabsDividerVariants = cva('my-1 h-px shrink-0 bg-soft-200');

export const tabsContentVariants = cva(
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
);

export type TabsListVariantProps = VariantProps<typeof tabsListVariants>;
export type TabsTriggerVariantProps = VariantProps<typeof tabsTriggerVariants>;
