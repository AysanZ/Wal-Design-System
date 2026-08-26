import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type {
  RatingVariantProps,
  RatingFillVariantProps,
} from './rating.styles';

export type RatingSize = NonNullable<RatingVariantProps['size']>;
export type RatingColor = NonNullable<RatingFillVariantProps['color']>;

export interface RatingLabels {
  /** Accessible name for the whole control. */
  root?: string;
  /** Name of one option, e.g. `` (score) => `${score} ستاره` ``. */
  item?: (score: string) => string;
  /**
   * How a read-only rating is announced, e.g. `'۴٫۵ از ۵'`. Read-only ratings
   * are a single `role="img"`, so this is the one string a screen reader gets.
   */
  summary?: (value: string, max: string) => string;
}

export interface RatingProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange' | 'defaultValue' | 'color'
> {
  /** Current score. Controlled. */
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;

  /** Number of items. */
  max?: number;
  size?: RatingSize;
  color?: RatingColor;

  /**
   * Display only — an average, a review score. Renders a single `role="img"`
   * instead of a set of radios, and accepts fractional values.
   */
  readOnly?: boolean;
  disabled?: boolean;

  /** Replaces the star. Any node; sized by the `size` variant. */
  icon?: ReactNode;
  /** Empty-state glyph, when it is not simply the outline of `icon`. */
  emptyIcon?: ReactNode;

  /** Shows the numeric score beside the items. */
  showValue?: boolean;
  /** Replaces the readout — `'۴٫۵ (۱۲۸ نظر)'`, a count, anything. */
  valueLabel?: ReactNode;

  /** `name` for the underlying radios, when the form is submitted natively. */
  name?: string;
  /**
   * BCP-47 tag driving the digits (`'fa'` → `۴٫۵`). Defaults to the ambient
   * locale from `WalProvider`.
   */
  locale?: string;
  labels?: RatingLabels;
}
