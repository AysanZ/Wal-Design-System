import { forwardRef, useEffect, useRef } from 'react';
import { RiCheckLine, RiSubtractLine } from '@remixicon/react';
import { cn } from '../../lib/cn';
import { useId } from '../../hooks/use-id';
import { Icon } from '../icon';
import {
  checkboxRootVariants,
  checkboxControlVariants,
  checkboxIndicatorVariants,
  checkboxLabelVariants,
  checkboxDescriptionVariants,
} from './checkbox.styles';
import type { CheckboxProps } from './checkbox.types';

/**
 * A real `<input type="checkbox">`, styled.
 *
 * Not a `<div role="checkbox">`: the native element brings form participation,
 * the indeterminate state, `:checked`/`:indeterminate` CSS, and correct
 * announcement — all of which have to be hand-rebuilt otherwise, and usually
 * are not.
 *
 * `indeterminate` is a DOM *property*, not an attribute, so it cannot be
 * expressed in JSX. The component keeps an internal ref and assigns it in an
 * effect, merging with any ref the caller passes.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      description,
      labelPosition = 'end',
      indeterminate = false,
      invalid = false,
      disabled,
      id,
      className,
      rootClassName,
      ...rest
    },
    forwardedRef,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = useId(id);
    const descriptionId = description ? `${inputId}-description` : undefined;

    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const setRefs = (node: HTMLInputElement | null) => {
      (inputRef as { current: HTMLInputElement | null }).current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef)
        (forwardedRef as { current: HTMLInputElement | null }).current = node;
    };

    const control = (
      <span className="relative inline-grid shrink-0">
        <input
          ref={setRefs}
          type="checkbox"
          id={inputId}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={descriptionId}
          className={cn(checkboxControlVariants({ invalid }), className)}
          {...rest}
        />
        <span className={checkboxIndicatorVariants()} aria-hidden>
          <Icon icon={indeterminate ? RiSubtractLine : RiCheckLine} size={14} />
        </span>
      </span>
    );

    if (!label && !description) {
      return control;
    }

    return (
      <div
        className={cn(
          checkboxRootVariants({
            labelPosition,
            align: description ? 'start' : 'center',
          }),
          rootClassName,
        )}
      >
        {control}
        <span className="flex flex-col gap-0.5">
          {label && (
            <label
              htmlFor={inputId}
              className={checkboxLabelVariants({ disabled: Boolean(disabled) })}
            >
              {label}
            </label>
          )}
          {description && (
            <span
              id={descriptionId}
              className={checkboxDescriptionVariants({
                disabled: Boolean(disabled),
              })}
            >
              {description}
            </span>
          )}
        </span>
      </div>
    );
  },
);
