import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { RadioGroupVariantProps } from './radio.styles';

export type RadioOrientation = NonNullable<
  RadioGroupVariantProps['orientation']
>;

export interface RadioProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'size'
> {
  label?: ReactNode;
  /** Secondary line under the label. Figma's "Description" toggle. */
  description?: ReactNode;
  /**
   * Which side the label sits on. Figma calls this "Flip". Logical, so `start`
   * is left in English and right in Persian.
   */
  labelPosition?: 'start' | 'end';
  invalid?: boolean;
  /** Wrapper class. Use `className` for the control itself. */
  rootClassName?: string;
}

export interface RadioGroupProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange' | 'defaultValue' | 'title'
> {
  /** Selected value. Controlled. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /**
   * Shared `name`. Generated when omitted — without one the browser will not
   * treat the inputs as a single group, and arrow keys stop moving between
   * them.
   */
  name?: string;
  orientation?: RadioOrientation;
  /** Disables every radio in the group. */
  disabled?: boolean;
  /** Accessible name for the group, e.g. `'روش پرداخت'`. */
  label?: string;
  /** Visible heading. Also names the group. */
  title?: ReactNode;
  /** Marks the whole group invalid, e.g. an unanswered required question. */
  invalid?: boolean;
}
