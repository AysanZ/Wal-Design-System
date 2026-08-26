import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type {
  ToggleVariantProps,
  ToggleGroupVariantProps,
} from './toggle.styles';

export type ToggleAppearance = NonNullable<ToggleVariantProps['appearance']>;
export type ToggleSize = NonNullable<ToggleVariantProps['size']>;
export type ToggleOrientation = NonNullable<
  ToggleGroupVariantProps['orientation']
>;

export interface ToggleProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'value' | 'onChange'
> {
  appearance?: ToggleAppearance;
  size?: ToggleSize;
  /** Square icon-only button. Requires `aria-label`. */
  iconOnly?: boolean;

  /** Pressed state. Controlled. */
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;

  /** Identifies the toggle inside a `ToggleGroup`. Required there. */
  value?: string;

  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export interface ToggleGroupProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange' | 'defaultValue'
> {
  /**
   * `single` behaves like a segmented choice, `multiple` like a set of
   * independent flags. The value type follows: a string, or an array.
   */
  type?: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string & string[]) => void;

  appearance?: ToggleAppearance;
  size?: ToggleSize;
  orientation?: ToggleOrientation;
  /** Joins the toggles into one bar with shared borders. */
  attached?: boolean;
  disabled?: boolean;
  /**
   * In `single` mode, whether the pressed item can be un-pressed, leaving
   * nothing selected. Off by default — a view switcher with no view chosen is
   * a state most screens cannot render.
   */
  collapsible?: boolean;
  /** Accessible name for the set, e.g. `'حالت نمایش'`. */
  label?: string;
}
