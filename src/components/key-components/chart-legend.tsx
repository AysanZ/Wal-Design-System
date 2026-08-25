import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

/**
 * Figma → Chart Legend Dots [1.0] and Chart Legends [1.0].
 *   Colors = 11 values (+ Disabled on the legend), Size = Medium 20 | Small 16.
 */
export const chartLegendDotVariants = cva('shrink-0 rounded-full', {
  variants: {
    color: {
      gray: 'bg-faded-base',
      'light-gray': 'bg-soft-400',
      blue: 'bg-information-base',
      orange: 'bg-warning-base',
      red: 'bg-error-base',
      green: 'bg-success-base',
      yellow: 'bg-away-base',
      purple: 'bg-feature-base',
      sky: 'bg-verified-base',
      pink: 'bg-highlighted-base',
      teal: 'bg-stable-base',
      disabled: 'bg-soft-200',
    },
    size: {
      md: 'size-2.5',
      sm: 'size-2',
    },
  },
  defaultVariants: { color: 'blue', size: 'md' },
});

export const chartLegendVariants = cva(
  'inline-flex items-center gap-1.5 text-[12px] leading-4',
  {
    variants: {
      disabled: {
        true: 'text-sub-300',
        false: 'text-sub-600',
      },
      interactive: {
        true: 'cursor-pointer rounded-sm hover:text-strong-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
        false: '',
      },
    },
    defaultVariants: { disabled: false, interactive: false },
  },
);

type DotVariantProps = VariantProps<typeof chartLegendDotVariants>;
export type ChartLegendColor = NonNullable<DotVariantProps['color']>;
export type ChartLegendSize = NonNullable<DotVariantProps['size']>;

export interface ChartLegendDotProps extends Omit<
  ComponentPropsWithoutRef<'span'>,
  'color'
> {
  color?: ChartLegendColor;
  size?: ChartLegendSize;
}

export const ChartLegendDot = forwardRef<HTMLSpanElement, ChartLegendDotProps>(
  function ChartLegendDot(
    { color = 'blue', size = 'md', className, ...rest },
    ref,
  ) {
    return (
      <span
        ref={ref}
        aria-hidden
        className={cn(chartLegendDotVariants({ color, size }), className)}
        {...rest}
      />
    );
  },
);

export interface ChartLegendProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'color' | 'disabled' | 'value'
> {
  color?: ChartLegendColor;
  size?: ChartLegendSize;
  /** Trailing figure — pre-formatted, since numerals are a locale decision. */
  value?: ReactNode;
  /** Series is hidden. Renders `aria-pressed` so the state is announced. */
  hidden?: boolean;
  /** Clicking toggles the series. Without it, renders as plain text. */
  onToggle?: () => void;
}

/**
 * One legend entry.
 *
 * When `onToggle` is given it becomes a `<button>` with `aria-pressed`, because
 * a chart legend that hides series on click is a control — the colour swatch
 * alone communicates nothing to a screen reader, and dimmed grey text is not a
 * state anyone can perceive reliably.
 */
export const ChartLegend = forwardRef<HTMLButtonElement, ChartLegendProps>(
  function ChartLegend(
    {
      color = 'blue',
      size = 'md',
      value,
      hidden = false,
      onToggle,
      className,
      children,
      type,
      ...rest
    },
    ref,
  ) {
    const content = (
      <>
        <ChartLegendDot color={hidden ? 'disabled' : color} size={size} />
        <span>{children}</span>
        {value != null && (
          <span className="font-medium text-strong-950">{value}</span>
        )}
      </>
    );

    if (!onToggle) {
      return (
        <span
          className={cn(chartLegendVariants({ disabled: hidden }), className)}
        >
          {content}
        </span>
      );
    }

    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        aria-pressed={!hidden}
        onClick={onToggle}
        className={cn(
          chartLegendVariants({ disabled: hidden, interactive: true }),
          className,
        )}
        {...rest}
      >
        {content}
      </button>
    );
  },
);
