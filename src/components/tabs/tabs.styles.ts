import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Tab Menu" page.
 *   Tab Menu → Type (Line | Segmented | Pill), Quantity 02–05,
 *              Direction (Horizontal | Vertical)
 *   Tab Item → State (Default · Hover · Active · Disabled), Icon = On/Off,
 *              Badge = On/Off
 *
 * Quantity is not a prop — the tab count is however many children you pass, so
 * a six-tab menu is not a special case. State is not one either: hover and
 * disabled are CSS states, and "Active" is the selected value.
 */
export const tabsListVariants = cva('flex', {
  variants: {
    appearance: {
      line: '',
      segmented: 'gap-1 rounded-xl bg-weak-50 p-1',
      pill: 'gap-2',
    },
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col items-stretch',
    },
    /** Tabs share the width instead of hugging their labels. */
    stretch: {
      true: '[&>*]:flex-1',
      false: '',
    },
  },
  compoundVariants: [
    {
      appearance: 'line',
      orientation: 'horizontal',
      class: 'gap-1 border-b border-soft-200',
    },
    {
      appearance: 'line',
      orientation: 'vertical',
      class: 'gap-1 border-e border-soft-200',
    },
  ],
  defaultVariants: {
    appearance: 'line',
    orientation: 'horizontal',
    stretch: false,
  },
});

export const tabsTriggerVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center gap-1.5',
    'font-medium transition-colors duration-150',
    'cursor-pointer whitespace-nowrap',
    'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-base',
    'disabled:pointer-events-none disabled:text-sub-300',
  ],
  {
    variants: {
      appearance: {
        /**
         * The underline is a pseudo-element pinned to the inline box, not a
         * border on the button, so it stays under the label when the row is
         * reversed in RTL and does not shift the text by a pixel when it
         * appears.
         */
        line: 'after:absolute after:rounded-full',
        segmented: 'rounded-lg',
        pill: 'rounded-full',
      },
      orientation: {
        horizontal: '',
        vertical: 'justify-start text-start',
      },
      size: {
        sm: 'px-2.5 py-1.5 text-[12px] leading-4 [&_svg]:size-4',
        md: 'px-3 py-2.5 text-[14px] leading-5 [&_svg]:size-5',
      },
      selected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // ── line ──────────────────────────────────────────────────────────
      {
        appearance: 'line',
        orientation: 'horizontal',
        class: 'after:inset-x-0 after:bottom-0 after:h-0.5',
      },
      {
        appearance: 'line',
        orientation: 'vertical',
        // A logical inset, so the marker sits on the trailing edge of the
        // column in both directions rather than always on the right.
        class: 'after:inset-y-0 after:end-0 after:w-0.5',
      },
      {
        appearance: 'line',
        selected: true,
        class: 'text-strong-950 after:bg-primary-base',
      },
      {
        appearance: 'line',
        selected: false,
        class: 'text-sub-600 hover:text-strong-950 after:bg-transparent',
      },
      // ── segmented ─────────────────────────────────────────────────────
      {
        appearance: 'segmented',
        selected: true,
        class: 'bg-white-0 text-strong-950 shadow-[0_1px_2px_0_#0A0D1408]',
      },
      {
        appearance: 'segmented',
        selected: false,
        class: 'text-sub-600 hover:text-strong-950',
      },
      // ── pill ──────────────────────────────────────────────────────────
      {
        appearance: 'pill',
        selected: true,
        class: 'bg-primary-base text-static-white',
      },
      {
        appearance: 'pill',
        selected: false,
        class: 'text-sub-600 hover:bg-weak-50 hover:text-strong-950',
      },
    ],
    defaultVariants: {
      appearance: 'line',
      orientation: 'horizontal',
      size: 'md',
      selected: false,
    },
  },
);

export const tabsContentVariants = cva(
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
);

export type TabsListVariantProps = VariantProps<typeof tabsListVariants>;
export type TabsTriggerVariantProps = VariantProps<typeof tabsTriggerVariants>;
