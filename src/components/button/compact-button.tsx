import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import {
  compactButtonVariants,
  type CompactButtonVariantProps,
} from './compact-button.styles';

export type CompactButtonAppearance = NonNullable<
  CompactButtonVariantProps['appearance']
>;
export type CompactButtonSize = NonNullable<CompactButtonVariantProps['size']>;

export interface CompactButtonProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'color' | 'children'
> {
  appearance?: CompactButtonAppearance;
  size?: CompactButtonSize;
  /** Pill instead of a rounded square. */
  fullRadius?: boolean;
  /** The glyph. Required — this control is always icon-only. */
  children: ReactNode;
  /**
   * Accessible name. Required, not optional: a button whose only content is an
   * SVG has no accessible name at all, so the type system asks for one.
   */
  'aria-label': string;
}

/**
 * Square icon-only control for tight spaces — table row actions, input
 * adornments, toolbar affordances. 24px or 20px.
 */
export const CompactButton = forwardRef<HTMLButtonElement, CompactButtonProps>(
  function CompactButton(
    {
      appearance = 'stroke',
      size = 'lg',
      fullRadius = false,
      className,
      children,
      type,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        className={cn(
          compactButtonVariants({ appearance, size, fullRadius }),
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
