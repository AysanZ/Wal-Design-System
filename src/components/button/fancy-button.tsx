import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import { Slot } from '../../lib/slot';
import {
  fancyButtonVariants,
  type FancyButtonVariantProps,
} from './fancy-button.styles';

export type FancyButtonColor = NonNullable<FancyButtonVariantProps['color']>;
export type FancyButtonSize = NonNullable<FancyButtonVariantProps['size']>;

export interface FancyButtonProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'color'
> {
  color?: FancyButtonColor;
  size?: FancyButtonSize;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  asChild?: boolean;
}

/**
 * Raised variant of Button: a white sheen gradient, a 12%-white inner
 * hairline, and a coloured 1px ring plus a soft drop shadow.
 *
 * Reserve it for the single most important action on a screen. Its whole job
 * is to outrank a normal filled Button, which it cannot do if there are three
 * of them on the page.
 */
export const FancyButton = forwardRef<HTMLButtonElement, FancyButtonProps>(
  function FancyButton(
    {
      color = 'primary',
      size = 'md',
      fullWidth = false,
      startIcon,
      endIcon,
      asChild = false,
      className,
      children,
      type,
      disabled,
      ...rest
    },
    ref,
  ) {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        ref={ref as never}
        {...(asChild
          ? { 'aria-disabled': disabled || undefined }
          : { type: type ?? 'button', disabled })}
        className={cn(
          fancyButtonVariants({ color, size, fullWidth }),
          className,
        )}
        {...rest}
      >
        {startIcon}
        <span className="px-1">{children}</span>
        {endIcon}
      </Component>
    );
  },
);
