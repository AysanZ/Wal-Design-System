import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Tooltip" page.
 *   Tooltip → Side (Top | Bottom | Left | Right) × Align (Start | Center | End)
 *             × Size (Small | Medium) × Arrow = On/Off
 *
 * Figma's Left and Right become `start` and `end`: a tooltip pinned to the
 * "left" of its trigger in Persian is on the wrong side of it, and the whole
 * point of a side is which way it points relative to the reading flow.
 */
export const tooltipVariants = cva(
  [
    'absolute z-50 w-max max-w-[16rem]',
    'rounded-lg bg-strong-950 text-static-white',
    'shadow-[0_16px_32px_-12px_rgba(14,18,27,0.10)]',
    'transition-opacity duration-150 motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        sm: 'px-2 py-1 text-[11px] leading-4',
        md: 'px-2.5 py-1.5 text-[12px] leading-4',
      },
      side: {
        top: 'bottom-full mb-2',
        bottom: 'top-full mt-2',
        /**
         * Logical: `start` is left in English and right in Persian, so the
         * tooltip stays on the side the trigger's label runs *from*.
         */
        start: 'end-full me-2 top-1/2 -translate-y-1/2',
        end: 'start-full ms-2 top-1/2 -translate-y-1/2',
      },
      align: {
        start: '',
        center: '',
        end: '',
      },
    },
    compoundVariants: [
      { side: 'top', align: 'start', class: 'start-0' },
      {
        side: 'top',
        align: 'center',
        class: 'start-1/2 -translate-x-1/2 rtl:translate-x-1/2',
      },
      { side: 'top', align: 'end', class: 'end-0' },
      { side: 'bottom', align: 'start', class: 'start-0' },
      {
        side: 'bottom',
        align: 'center',
        class: 'start-1/2 -translate-x-1/2 rtl:translate-x-1/2',
      },
      { side: 'bottom', align: 'end', class: 'end-0' },
    ],
    defaultVariants: { size: 'md', side: 'top', align: 'center' },
  },
);

/** A rotated square peeking out from under the bubble. */
export const tooltipArrowVariants = cva(
  'absolute size-2 rotate-45 bg-strong-950',
  {
    variants: {
      side: {
        top: 'bottom-[-3px] start-1/2 -ms-1',
        bottom: 'top-[-3px] start-1/2 -ms-1',
        start: 'end-[-3px] top-1/2 -mt-1',
        end: 'start-[-3px] top-1/2 -mt-1',
      },
    },
    defaultVariants: { side: 'top' },
  },
);

export type TooltipVariantProps = VariantProps<typeof tooltipVariants>;
