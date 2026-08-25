import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

/**
 * Figma → "Key Components" page, Label [1.0]: State (Normal | Disabled).
 *
 * These seven primitives share one folder because Figma groups them and
 * because each is a handful of lines that exists to be composed *into* other
 * components — a Label alone is not a feature. They are still separate
 * exports with their own types.
 */
export const labelVariants = cva(
  'inline-flex items-center gap-1 text-[14px] font-medium leading-5',
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed text-sub-300',
        false: 'text-strong-950',
      },
    },
    defaultVariants: { disabled: false },
  },
);

export interface LabelProps
  extends
    ComponentPropsWithoutRef<'label'>,
    VariantProps<typeof labelVariants> {
  /** Adds an asterisk and, crucially, keeps it out of the accessible name. */
  required?: boolean;
  /** Trailing slot — a tooltip trigger, a counter. */
  hint?: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required = false, hint, disabled = false, className, children, ...rest },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn(labelVariants({ disabled }), className)}
      {...rest}
    >
      {children}
      {required && (
        // aria-hidden: the asterisk is a visual convention. Requiredness is
        // communicated by the input's own `required` attribute, and reading
        // "Email star" out loud helps nobody.
        <span aria-hidden className="text-error-base">
          *
        </span>
      )}
      {hint && <span className="ms-auto font-normal text-sub-600">{hint}</span>}
    </label>
  );
});
