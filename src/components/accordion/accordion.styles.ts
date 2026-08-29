import { cva, type VariantProps } from 'class-variance-authority';

export const accordionVariants = cva(
  [
    'w-full rounded-lg border transition-colors duration-200 ease-in',
    'has-[:focus-visible]:outline has-[:focus-visible]:outline-2',
    'has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary-base',
  ],
  {
    variants: {
      open: {
        true: 'border-weak-50 bg-weak-50',
        false: 'border-soft-200 bg-white-0 shadow-xs',
      },
    },
    defaultVariants: { open: false },
  },
);

export const accordionTriggerVariants = cva([
  'group/trigger flex w-full items-start justify-between gap-2.5',
  'rounded-lg p-3.5 text-start',
  'cursor-pointer transition-colors duration-200 ease-in',
  'hover:bg-weak-50',
  // The ring is drawn by the container via :has(), so the button itself
  // shows nothing — otherwise you get two nested focus rings.
  'focus-visible:outline-none',
  'disabled:cursor-not-allowed disabled:opacity-50',
]);

export const accordionIndicatorVariants = cva(
  [
    'relative flex size-5 shrink-0 items-center justify-center',
    'text-soft-400 transition-colors duration-200',
    'group-hover/trigger:text-sub-600',
  ],
  {
    variants: {
      /** `end` is the default; `start` puts the indicator before the title. */
      position: {
        start: 'order-first',
        end: 'order-last',
      },
    },
    defaultVariants: { position: 'end' },
  },
);

/**
 * Height animation without measuring anything in JS.
 *
 * The old implementation read `contentRef.current.scrollHeight` during render
 * and wrote it to inline `maxHeight` — a layout read in the render phase, and
 * one that produced `undefined` on the very first open. `grid-rows-[0fr]` →
 * `grid-rows-[1fr]` animates to the natural content height with pure CSS.
 */
export const accordionContentVariants = cva(
  'grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none',
  {
    variants: {
      open: {
        true: 'grid-rows-[1fr]',
        false: 'grid-rows-[0fr]',
      },
    },
    defaultVariants: { open: false },
  },
);

export type AccordionVariantProps = VariantProps<typeof accordionVariants>;
