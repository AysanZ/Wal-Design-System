import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface SwitchProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'size' | 'onChange'
> {
  label?: ReactNode;
  /** Secondary line under the label. Figma's "Description" toggle. */
  description?: ReactNode;
  /** Muted text inline after the label — Figma's "Sublabel". */
  sublabel?: ReactNode;
  /** Trailing slot on the label row — Figma's "Badge". */
  badge?: ReactNode;
  /** Action under the description — Figma's "Link Button". */
  linkButton?: ReactNode;
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
