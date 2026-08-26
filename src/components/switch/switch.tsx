import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import { useId } from '../../hooks/use-id';
import {
  switchRootVariants,
  switchControlVariants,
  switchThumbVariants,
  switchLabelVariants,
  switchDescriptionVariants,
} from './switch.styles';
import type { SwitchProps } from './switch.types';

/**
 * A real `<input type="checkbox">` with `role="switch"`, styled.
 *
 * ## Why a checkbox and not a button
 *
 * `role="switch"` on a checkbox keeps form participation, `:checked` in CSS,
 * Space to toggle and the label association — and changes only the
 * announcement, from "checked" to "on". A `<button aria-pressed>` gives up the
 * form and has to rebuild the rest by hand.
 *
 * ## Switch or checkbox?
 *
 * A switch takes effect **immediately**; a checkbox states an intention that a
 * submit button later applies. A switch inside a form with a Save button is
 * the most common misuse of this control: the user flips it, walks away, and
 * nothing happened. If there is a Save button, it is a checkbox.
 *
 * ## No internal state
 *
 * The native input already handles uncontrolled use through `defaultChecked`,
 * so there is nothing here to mirror into React state — which is exactly the
 * bug `useControllableState` exists to prevent elsewhere. `onCheckedChange`
 * is a convenience over `onChange`, not a second source of truth.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    size = 'md',
    label,
    description,
    labelPosition = 'end',
    onCheckedChange,
    onInputChange,
    disabled,
    id,
    className,
    rootClassName,
    ...rest
  },
  ref,
) {
  const inputId = useId(id);
  const descriptionId = description ? `${inputId}-description` : undefined;

  const control = (
    <span className="relative inline-flex shrink-0">
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        id={inputId}
        disabled={disabled}
        aria-describedby={descriptionId}
        onChange={(event) => {
          onInputChange?.(event);
          onCheckedChange?.(event.target.checked);
        }}
        className={cn(switchControlVariants({ size }), className)}
        {...rest}
      />
      <span aria-hidden className={switchThumbVariants({ size })} />
    </span>
  );

  if (!label && !description) return control;

  return (
    <div
      className={cn(
        switchRootVariants({
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
            className={switchLabelVariants({ disabled: Boolean(disabled) })}
          >
            {label}
          </label>
        )}
        {description && (
          <span
            id={descriptionId}
            className={switchDescriptionVariants({
              disabled: Boolean(disabled),
            })}
          >
            {description}
          </span>
        )}
      </span>
    </div>
  );
});
