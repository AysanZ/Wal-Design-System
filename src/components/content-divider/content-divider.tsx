import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import {
  contentDividerVariants,
  contentDividerRuleVariants,
  contentDividerContentVariants,
  type ContentDividerVariantProps,
} from './content-divider.styles';

export type ContentDividerSpacing = NonNullable<
  ContentDividerVariantProps['spacing']
>;
export type ContentDividerAlign = NonNullable<
  ContentDividerVariantProps['align']
>;
export type ContentDividerOrientation = NonNullable<
  ContentDividerVariantProps['orientation']
>;

export interface ContentDividerProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  /** Text, a Button, a ButtonGroup — anything. Omit for a plain rule. */
  children?: ReactNode;
  spacing?: ContentDividerSpacing;
  align?: ContentDividerAlign;
  orientation?: ContentDividerOrientation;
  /** `solid` is the stronger rule Figma uses for "Solid Text Divider". */
  appearance?: 'subtle' | 'solid';
}

/**
 * A horizontal or vertical rule, optionally with content in the middle.
 *
 * ## Semantics
 *
 * A bare rule is `role="separator"`. One with content is **not**: a separator
 * has no children in the ARIA model, so labelling it would hide the button or
 * text inside from the accessibility tree. In that case the wrapper is a plain
 * `<div>` and the two rule segments are `aria-hidden` — which is correct,
 * because the visible text already conveys the grouping.
 */
export const ContentDivider = forwardRef<HTMLDivElement, ContentDividerProps>(
  function ContentDivider(
    {
      children,
      spacing = 'none',
      align = 'center',
      orientation = 'horizontal',
      appearance = 'subtle',
      className,
      ...rest
    },
    ref,
  ) {
    const isText = typeof children === 'string' || typeof children === 'number';

    if (!children) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={orientation}
          className={cn(
            contentDividerVariants({ spacing, orientation }),
            className,
          )}
          {...rest}
        >
          <span
            className={contentDividerRuleVariants({ orientation, appearance })}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          contentDividerVariants({ spacing, align, orientation }),
          className,
        )}
        {...rest}
      >
        {align !== 'start' && (
          <span
            aria-hidden
            className={contentDividerRuleVariants({ orientation, appearance })}
          />
        )}
        <span
          className={contentDividerContentVariants({
            variant: isText ? 'text' : 'element',
          })}
        >
          {children}
        </span>
        {align !== 'end' && (
          <span
            aria-hidden
            className={contentDividerRuleVariants({ orientation, appearance })}
          />
        )}
      </div>
    );
  },
);
