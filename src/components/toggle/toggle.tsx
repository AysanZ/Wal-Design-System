import { createContext, forwardRef, useContext, useMemo } from 'react';
import { cn } from '../../lib/cn';
import { useControllableState } from '../../hooks/use-controllable-state';
import { toggleVariants, toggleGroupVariants } from './toggle.styles';
import type { ToggleProps, ToggleGroupProps } from './toggle.types';

interface ToggleGroupContextValue {
  isPressed: (value: string) => boolean;
  toggle: (value: string) => void;
  appearance: NonNullable<ToggleGroupProps['appearance']>;
  size: NonNullable<ToggleGroupProps['size']>;
  attached: boolean;
  disabled?: boolean;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

/**
 * A button that stays pressed.
 *
 * ## Why `aria-pressed` and not `role="switch"`
 *
 * A switch is a setting — "notifications: on". A toggle is an *action with
 * memory* — bold is applied, this filter is active, this view is the one you
 * are looking at. Screen readers say "pressed" for the second and "on" for the
 * first, and the two sentences describe genuinely different things. Picking
 * the wrong one is not a styling detail: it tells the user the wrong story
 * about what the control does.
 *
 * If choosing one option hides another panel of content, neither applies —
 * that is `Tabs`.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle(
    {
      appearance,
      size,
      iconOnly = false,
      pressed: pressedProp,
      defaultPressed = false,
      onPressedChange,
      value,
      startIcon,
      endIcon,
      className,
      children,
      type,
      disabled,
      onClick,
      ...rest
    },
    ref,
  ) {
    const group = useContext(ToggleGroupContext);
    const isGrouped = group !== null && value !== undefined;

    const [standalonePressed, setStandalonePressed] =
      useControllableState<boolean>({
        value: pressedProp,
        defaultValue: defaultPressed,
        onChange: onPressedChange,
      });

    const pressed = isGrouped ? group.isPressed(value) : standalonePressed;

    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        aria-pressed={pressed}
        disabled={disabled ?? group?.disabled}
        onClick={(event) => {
          onClick?.(event);
          if (isGrouped) group.toggle(value);
          else setStandalonePressed(!pressed);
        }}
        className={cn(
          toggleVariants({
            appearance: appearance ?? group?.appearance ?? 'stroke',
            size: size ?? group?.size ?? 'md',
            iconOnly,
            pressed,
            attached: group?.attached ?? false,
          }),
          className,
        )}
        {...rest}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    );
  },
);

/**
 * A set of toggles sharing one value.
 *
 * `role="group"` with a name, so the set is announced as one control rather
 * than as loose buttons. Every toggle keeps its own tab stop — unlike `Tabs`,
 * which uses roving focus. That is deliberate: tabs are navigation, and one
 * stop for the whole bar is what keeps them out of the way, while a toolbar of
 * toggles is a set of actions the user reaches for individually.
 */
export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup(
    {
      type = 'single',
      value: valueProp,
      defaultValue,
      onValueChange,
      appearance = 'stroke',
      size = 'md',
      orientation = 'horizontal',
      attached = false,
      collapsible = false,
      disabled,
      label,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const [value, setValue] = useControllableState<string | string[]>({
      value: valueProp,
      defaultValue: defaultValue ?? (type === 'multiple' ? [] : ''),
      onChange: onValueChange as (next: string | string[]) => void,
    });

    const context = useMemo<ToggleGroupContextValue>(
      () => ({
        appearance,
        size,
        attached,
        disabled,
        isPressed: (candidate) =>
          Array.isArray(value)
            ? value.includes(candidate)
            : value === candidate,
        toggle: (candidate) => {
          if (type === 'multiple') {
            const current = Array.isArray(value) ? value : [];
            setValue(
              current.includes(candidate)
                ? current.filter((entry) => entry !== candidate)
                : [...current, candidate],
            );
            return;
          }
          // A view switcher with no view chosen is a state most screens cannot
          // render, so un-pressing is opt-in.
          if (value === candidate && !collapsible) return;
          setValue(value === candidate ? '' : candidate);
        },
      }),
      [
        appearance,
        attached,
        collapsible,
        disabled,
        setValue,
        size,
        type,
        value,
      ],
    );

    return (
      <ToggleGroupContext.Provider value={context}>
        <div
          ref={ref}
          role="group"
          aria-label={label}
          // `data-`, not `aria-orientation`: role="group" does not support the
          // ARIA attribute, and the orientation is a styling fact here.
          data-orientation={orientation}
          className={cn(
            toggleGroupVariants({ attached, orientation }),
            className,
          )}
          {...rest}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  },
);
