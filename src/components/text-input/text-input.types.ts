import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { TextInputVariantProps } from './text-input.styles';

export type TextInputSize = NonNullable<TextInputVariantProps['size']>;

export interface TextInputProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'size'
> {
  size?: TextInputSize;
  /** Rendered above the field and tied to it. */
  label?: ReactNode;
  /** The line under the field. Becomes the error message when `error` is set. */
  hint?: ReactNode;
  /**
   * Validation message. Its presence is what marks the field invalid, so the
   * two can never disagree — a red border with no message, or a message with
   * a field that still looks fine.
   */
  error?: ReactNode;

  /** Icon inside the field, on the leading edge. */
  startIcon?: ReactNode;
  /** Icon or control inside the field, on the trailing edge. */
  endIcon?: ReactNode;
  /** Attached block before the field — `https://`, a currency. */
  startAffix?: ReactNode;
  /** Attached block after the field — `.com`, a unit. */
  endAffix?: ReactNode;

  /**
   * Pins the field to left-to-right regardless of the ambient direction.
   *
   * Email addresses, URLs, IBANs, card numbers and version strings are Latin
   * even in a Persian UI: rendered RTL, a URL's slashes and dots migrate to
   * the wrong end and the value becomes unreadable while staying technically
   * correct in the DOM.
   */
  latin?: boolean;

  /** Wrapper class. Use `className` for the `<input>` itself. */
  rootClassName?: string;
  /** Class for the bordered field box. */
  fieldClassName?: string;
}
