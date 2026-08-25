import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { RiErrorWarningFill, RiInformationLine } from '@remixicon/react';
import { cn } from '../../lib/cn';
import { Icon } from '../icon';

/** Figma → Hint Text [1.0]: State (Default | Error | Disabled). */
export const hintTextVariants = cva(
  'flex items-start gap-1 text-[12px] leading-4 [&_svg]:mt-px [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      status: {
        default: 'text-sub-600',
        error: 'text-error-base',
        disabled: 'text-sub-300',
      },
    },
    defaultVariants: { status: 'default' },
  },
);

export interface HintTextProps
  extends ComponentPropsWithoutRef<'p'>, VariantProps<typeof hintTextVariants> {
  /** `true` shows the default glyph for the status; a node overrides it. */
  icon?: boolean | ReactNode;
}

/**
 * The line under a field.
 *
 * When `status="error"` it becomes a live region: a validation message that
 * appears after a failed submit is silent otherwise, which is the single most
 * common accessibility bug in forms.
 */
export const HintText = forwardRef<HTMLParagraphElement, HintTextProps>(
  function HintText(
    { status = 'default', icon = false, className, children, ...rest },
    ref,
  ) {
    const glyph =
      icon === true ? (
        <Icon
          icon={status === 'error' ? RiErrorWarningFill : RiInformationLine}
          size={16}
        />
      ) : (
        icon || null
      );

    return (
      <p
        ref={ref}
        role={status === 'error' ? 'alert' : undefined}
        className={cn(hintTextVariants({ status }), className)}
        {...rest}
      >
        {glyph}
        {children}
      </p>
    );
  },
);
