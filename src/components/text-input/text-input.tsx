import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import { useId } from '../../hooks/use-id';
import { Label } from '../key-components/label';
import { HintText } from '../key-components/hint-text';
import {
  textInputFieldVariants,
  textInputControlVariants,
  textInputAdornmentVariants,
  textInputAffixVariants,
} from './text-input.styles';
import type { TextInputProps } from './text-input.types';

/**
 * A single-line field: label, box, adornments and message, wired together.
 *
 * ## Why the whole field and not just a styled `<input>`
 *
 * The parts that get skipped when each app assembles its own are the ones
 * that matter: `htmlFor` on the label, `aria-describedby` on the input,
 * `aria-invalid` when it fails, and `role="alert"` on the message so a
 * validation error that appears after submit is actually announced. That last
 * one is the single most common accessibility bug in forms, and it is a
 * property of the *field*, not of the input.
 *
 * `error` is what marks the field invalid, so a red border with no message —
 * or a message beside a field that still looks fine — cannot happen.
 *
 * ## Adornments are slots
 *
 * Figma models Leading and Trailing as enums of Icon | Text | None. As props
 * that would make "an icon on one side and a unit on the other" unreachable,
 * so there are four slots instead: two inside the box (`startIcon`, `endIcon`)
 * and two attached to it (`startAffix`, `endAffix`).
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      size = 'md',
      label,
      hint,
      error,
      required,
      startIcon,
      endIcon,
      startAffix,
      endAffix,
      latin = false,
      disabled,
      id,
      className,
      rootClassName,
      fieldClassName,
      dir,
      ...rest
    },
    ref,
  ) {
    const inputId = useId(id);
    const messageId = error || hint ? `${inputId}-message` : undefined;
    const invalid = Boolean(error);

    return (
      <div className={cn('flex w-full flex-col gap-1', rootClassName)}>
        {label != null && (
          <Label
            htmlFor={inputId}
            required={required}
            disabled={Boolean(disabled)}
          >
            {label}
          </Label>
        )}

        <div
          className={cn(
            textInputFieldVariants({ size, invalid }),
            fieldClassName,
          )}
        >
          {startAffix != null && (
            <span className={textInputAffixVariants({ side: 'start', size })}>
              {startAffix}
            </span>
          )}
          {startIcon != null && (
            <span
              className={textInputAdornmentVariants({ side: 'start', size })}
            >
              {startIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={messageId}
            // Latin values stay LTR even in a Persian UI: rendered RTL, a URL's
            // slashes and dots migrate to the wrong end.
            dir={dir ?? (latin ? 'ltr' : undefined)}
            className={cn(textInputControlVariants({ size }), className)}
            {...rest}
          />

          {endIcon != null && (
            <span className={textInputAdornmentVariants({ side: 'end', size })}>
              {endIcon}
            </span>
          )}
          {endAffix != null && (
            <span className={textInputAffixVariants({ side: 'end', size })}>
              {endAffix}
            </span>
          )}
        </div>

        {(error || hint) && (
          <HintText
            id={messageId}
            status={invalid ? 'error' : disabled ? 'disabled' : 'default'}
            icon={invalid}
          >
            {error ?? hint}
          </HintText>
        )}
      </div>
    );
  },
);
