import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type {
  SliderVariantProps,
  SliderRangeVariantProps,
} from './slider.styles';

export type SliderSize = NonNullable<SliderVariantProps['size']>;
export type SliderColor = NonNullable<SliderRangeVariantProps['color']>;

/** One thumb (`number`) or two (`[number, number]`). */
export type SliderValue = number | [number, number];

export interface SliderMark {
  value: number;
  /** Text under the tick. Omit for a bare tick. */
  label?: ReactNode;
}

export interface SliderProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange' | 'defaultValue' | 'color'
> {
  /**
   * Controlled value. A `number` renders one thumb, a `[number, number]`
   * renders a range — the shape of the value *is* Figma's "Type", so a range
   * slider cannot be handed a single number by accident.
   */
  value?: SliderValue;
  defaultValue?: SliderValue;
  /** Fires on every step while dragging. */
  onValueChange?: (value: SliderValue) => void;
  /**
   * Fires once, when the pointer or key is released. Use this for anything
   * expensive — a request per pixel of drag is the usual way a slider takes a
   * server down.
   */
  onValueCommit?: (value: SliderValue) => void;

  min?: number;
  max?: number;
  step?: number;
  /** Smallest allowed gap between the two thumbs of a range. */
  minStepsBetweenThumbs?: number;

  size?: SliderSize;
  color?: SliderColor;
  disabled?: boolean;

  /** Visible label above the track. Also names the thumbs. */
  label?: ReactNode;
  /** Shows the current value beside the label. */
  showValue?: boolean;
  /** Ticks under the track. `true` derives them from `step`. */
  marks?: boolean | SliderMark[];

  /**
   * Formats every number the user sees or hears. Defaults to localized digits.
   */
  formatValue?: (value: number) => string;
  /**
   * BCP-47 tag driving the digits (`'fa'` → `۴۲`). Defaults to the ambient
   * locale from `WalProvider`.
   */
  locale?: string;
  /** Accessible names for the thumbs, when there is no visible `label`. */
  thumbLabels?: [string, string?];
  /** `name` for the hidden inputs, when the form is submitted natively. */
  name?: string;
}
