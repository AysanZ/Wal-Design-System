import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface ToggleProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'value' | 'onChange'
> {
  /**
   * Identifies the segment inside its `ToggleGroup`. Required — a segmented
   * control is a choice between named options, and a segment with no name
   * cannot be the answer.
   */
  value: string;
  /** Figma's "Left Icon". Logical, so it leads in both directions. */
  startIcon?: ReactNode;
  /** Figma's "Only Icon". Requires `aria-label`. */
  iconOnly?: boolean;
}

export interface ToggleGroupProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange' | 'defaultValue'
> {
  /** Selected segment. Controlled. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  /** Accessible name for the set, e.g. `'حالت نمایش'`. */
  label?: string;
}
