import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { SwitchVariantProps } from './switch.styles';

export type SwitchSize = NonNullable<SwitchVariantProps['size']>;

export interface SwitchProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'size' | 'onChange'
> {
  size?: SwitchSize;
  label?: ReactNode;
  /** Secondary line under the label. Figma's "Description" toggle. */
  description?: ReactNode;
  /**
   * Which side the label sits on. Figma calls this "Flip". Logical, so `start`
   * is left in English and right in Persian.
   */
  labelPosition?: 'start' | 'end';
  /**
   * Fires with the new state. The raw `onChange` event is still available as
   * `onInputChange` when the event object is genuinely needed.
   */
  onCheckedChange?: (checked: boolean) => void;
  onInputChange?: ComponentPropsWithoutRef<'input'>['onChange'];
  /** Wrapper class. Use `className` for the control itself. */
  rootClassName?: string;
}
