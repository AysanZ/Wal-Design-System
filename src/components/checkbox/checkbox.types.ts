import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface CheckboxProps extends Omit<
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
  /**
   * Tri-state. Not a DOM attribute — it has to be assigned to the element,
   * which is why this component always attaches a ref internally.
   */
  indeterminate?: boolean;
  invalid?: boolean;
  /** Wrapper class. Use `className` for the control itself. */
  rootClassName?: string;
}
