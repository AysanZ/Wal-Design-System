import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Toggle" page.
 *   Toggle       → Appearance (Stroke | Ghost | Filled) × Size (Small | Medium)
 *                  × State (Default · Hover · Pressed · Disabled)
 *   Toggle Group → Attached = On/Off, Selection (Single | Multiple)
 *
 * ## Toggle, Switch or Tabs?
 *
 * Three controls that all "turn something on", and the difference is what the
 * user is doing:
 *
 * - **Switch** — a *setting* that applies immediately. On or off, one thing.
 * - **Toggle** — a *button that stays pressed*. Bold in a toolbar, a view mode,
 *   a filter that is currently applied. It is an action with memory, which is
 *   why it announces `aria-pressed` and not "on".
 * - **Tabs** — *navigation* between panels of content. If picking one hides
 *   the other's content, it is tabs, not a toggle group.
 */
export const toggleVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-1.5',
    'font-medium whitespace-nowrap',
    'cursor-pointer transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:pointer-events-none disabled:bg-weak-50 disabled:text-sub-300',
  ],
  {
    variants: {
      appearance: {
        stroke:
          'border border-soft-200 bg-white-0 shadow-[0_1px_2px_0_#0A0D1408]',
        ghost: 'bg-transparent',
        filled: 'bg-weak-50',
      },
      size: {
        sm: 'h-8 gap-1 px-2.5 text-[12px] leading-4 [&_svg]:size-4',
        md: 'h-9 px-3 text-[14px] leading-5 [&_svg]:size-5',
      },
      /** Square, for a toolbar of icon-only toggles. Requires `aria-label`. */
      iconOnly: {
        true: 'aspect-square px-0',
        false: '',
      },
      pressed: {
        true: '',
        false: '',
      },
      /** Set by ToggleGroup: square inner corners so the row reads as one. */
      attached: {
        true: 'rounded-none first:rounded-s-lg last:rounded-e-lg -ms-px first:ms-0',
        false: 'rounded-lg',
      },
    },
    compoundVariants: [
      {
        pressed: false,
        class: 'text-sub-600 hover:bg-weak-50 hover:text-strong-950',
      },
      {
        pressed: true,
        appearance: 'stroke',
        class: 'border-primary-base bg-information-lighter text-primary-base',
      },
      {
        pressed: true,
        appearance: 'ghost',
        class: 'bg-weak-50 text-strong-950',
      },
      {
        pressed: true,
        appearance: 'filled',
        class: 'bg-primary-base text-static-white hover:bg-primary-dark',
      },
    ],
    defaultVariants: {
      appearance: 'stroke',
      size: 'md',
      iconOnly: false,
      pressed: false,
      attached: false,
    },
  },
);

export const toggleGroupVariants = cva('inline-flex items-center', {
  variants: {
    attached: {
      /**
       * Joined into one bar. The negative inline margin collapses the shared
       * border, and `z-1` on the pressed item keeps its coloured border on top
       * of its neighbour's.
       */
      true: 'isolate [&>[aria-pressed="true"]]:z-1',
      false: 'gap-2',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-stretch',
    },
  },
  defaultVariants: { attached: false, orientation: 'horizontal' },
});

export type ToggleVariantProps = VariantProps<typeof toggleVariants>;
export type ToggleGroupVariantProps = VariantProps<typeof toggleGroupVariants>;
