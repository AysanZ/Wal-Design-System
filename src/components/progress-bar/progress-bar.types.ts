import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type {
  ProgressTrackVariantProps,
  ProgressFillVariantProps,
  ProgressCircleVariantProps,
} from './progress-bar.styles';

export type ProgressBarSize = NonNullable<ProgressTrackVariantProps['size']>;
export type ProgressColor = NonNullable<ProgressFillVariantProps['color']>;
export type ProgressCircleSize = NonNullable<
  ProgressCircleVariantProps['size']
>;

interface ProgressCommonProps {
  /** Current value, clamped to `0…max`. Ignored while `indeterminate`. */
  value?: number;
  max?: number;
  color?: ProgressColor;
  /**
   * Unknown duration: drops `aria-valuenow` so assistive tech announces "busy"
   * rather than inventing a percentage.
   */
  indeterminate?: boolean;
  /** Visible label. Also becomes the accessible name. */
  label?: ReactNode;
  /** Shows the percentage. */
  showValue?: boolean;
  /** Overrides the rendered readout — `'۳ از ۱۰ فایل'`, a size, an ETA. */
  valueLabel?: ReactNode;
  /**
   * BCP-47 tag driving the digits (`'fa'` → `۶۳٪`). Defaults to the ambient
   * locale from `WalProvider`.
   */
  locale?: string;
  /**
   * Accessible name when there is no visible `label` — a bare bar in a table
   * cell has nothing to be named by otherwise.
   */
  'aria-label'?: string;
}

export interface ProgressBarProps
  extends
    ProgressCommonProps,
    Omit<ComponentPropsWithoutRef<'div'>, 'color' | 'children'> {
  size?: ProgressBarSize;
}

export interface ProgressCircleProps
  extends
    ProgressCommonProps,
    Omit<ComponentPropsWithoutRef<'div'>, 'color' | 'children'> {
  size?: ProgressCircleSize;
  /** Stroke width in px. */
  thickness?: number;
  /** Content in the middle. Defaults to the percentage when `showValue`. */
  children?: ReactNode;
}
