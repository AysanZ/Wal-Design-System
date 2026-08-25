import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

/**
 * Figma → "❖ Badge" page, Status Badge [1.0].
 *   Status = Completed | Pending | Failed | Disabled
 *   Style  = Stroke | Light
 *   With Dot = On | Off
 *
 * Distinct from `Badge`, which is a free-form label with ten arbitrary colours.
 * Here the colour is *derived* from the status, so a "Completed" badge cannot
 * accidentally be rendered in red.
 */
export const statusBadgeVariants = cva(
  [
    'inline-flex items-center justify-center shrink-0 gap-1',
    'rounded-full px-2 py-0.5 align-middle whitespace-nowrap',
    'text-[12px] font-medium leading-4',
  ],
  {
    variants: {
      status: {
        completed: '',
        pending: '',
        failed: '',
        disabled: '',
      },
      appearance: {
        stroke: 'border bg-transparent',
        light: '',
      },
    },
    compoundVariants: [
      {
        status: 'completed',
        appearance: 'stroke',
        class: 'border-soft-200 text-success-base',
      },
      {
        status: 'pending',
        appearance: 'stroke',
        class: 'border-soft-200 text-warning-base',
      },
      {
        status: 'failed',
        appearance: 'stroke',
        class: 'border-soft-200 text-error-base',
      },
      {
        status: 'disabled',
        appearance: 'stroke',
        class: 'border-soft-200 text-sub-600',
      },

      {
        status: 'completed',
        appearance: 'light',
        class: 'bg-success-lighter text-success-dark',
      },
      {
        status: 'pending',
        appearance: 'light',
        class: 'bg-warning-lighter text-warning-dark',
      },
      {
        status: 'failed',
        appearance: 'light',
        class: 'bg-error-lighter text-error-dark',
      },
      {
        status: 'disabled',
        appearance: 'light',
        class: 'bg-faded-lighter text-faded-dark',
      },
    ],
    defaultVariants: { status: 'completed', appearance: 'stroke' },
  },
);

const dotVariants = cva('size-1.5 rounded-full', {
  variants: {
    status: {
      completed: 'bg-success-base',
      pending: 'bg-warning-base',
      failed: 'bg-error-base',
      disabled: 'bg-faded-base',
    },
  },
  defaultVariants: { status: 'completed' },
});

type StatusBadgeVariantProps = VariantProps<typeof statusBadgeVariants>;
export type StatusBadgeStatus = NonNullable<StatusBadgeVariantProps['status']>;
export type StatusBadgeAppearance = NonNullable<
  StatusBadgeVariantProps['appearance']
>;

export interface StatusBadgeProps extends Omit<
  ComponentPropsWithoutRef<'span'>,
  'children'
> {
  status?: StatusBadgeStatus;
  appearance?: StatusBadgeAppearance;
  /** Leading status dot. Decorative — the label carries the meaning. */
  dot?: boolean;
  children?: ReactNode;
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  function StatusBadge(
    {
      status = 'completed',
      appearance = 'stroke',
      dot = false,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <span
        ref={ref}
        data-status={status}
        className={cn(statusBadgeVariants({ status, appearance }), className)}
        {...rest}
      >
        {dot && <span aria-hidden className={dotVariants({ status })} />}
        {children}
      </span>
    );
  },
);
