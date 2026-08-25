import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

/**
 * Figma → "Empty States" page (node 5613:10789).
 *
 * That page holds **illustrations**, not a variant set: `Empty State / No Data`
 * and its siblings are vector components. Artwork cannot be reconstructed from
 * variant metadata, so this component is the layout around it and the drawings
 * stay in Figma — export them as SVG and pass them to `illustration`, the same
 * way the Flat Avatar set is handled.
 */
export const emptyStateVariants = cva(
  'flex w-full flex-col items-center justify-center text-center',
  {
    variants: {
      size: {
        sm: 'gap-2 py-6',
        md: 'gap-3 py-10',
        lg: 'gap-4 py-16',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

const illustrationVariants = cva('shrink-0 text-soft-400', {
  variants: {
    size: {
      sm: '[&_svg]:size-16 [&_img]:size-16',
      md: '[&_svg]:size-24 [&_img]:size-24',
      lg: '[&_svg]:size-32 [&_img]:size-32',
    },
  },
  defaultVariants: { size: 'md' },
});

const titleVariants = cva('font-medium text-strong-950', {
  variants: {
    size: {
      sm: 'text-[14px] leading-5',
      md: 'text-[16px] leading-6',
      lg: 'text-[18px] leading-6',
    },
  },
  defaultVariants: { size: 'md' },
});

type EmptyStateVariantProps = VariantProps<typeof emptyStateVariants>;
export type EmptyStateSize = NonNullable<EmptyStateVariantProps['size']>;

export interface EmptyStateProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title'
> {
  /** SVG exported from the Figma Empty States page, or any node. */
  illustration?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** One or two buttons. */
  actions?: ReactNode;
  size?: EmptyStateSize;
}

/**
 * Placeholder for a list, table or panel with nothing in it.
 *
 * Renders `role="status"` with a polite live region: an empty state usually
 * appears *after* a search or a filter, and a sighted user sees the list
 * vanish while a screen-reader user gets nothing at all unless it is announced.
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    {
      illustration,
      title,
      description,
      actions,
      size = 'md',
      className,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(emptyStateVariants({ size }), className)}
        {...rest}
      >
        {illustration && (
          <div aria-hidden className={illustrationVariants({ size })}>
            {illustration}
          </div>
        )}

        <div className="flex max-w-sm flex-col gap-1">
          <span className={titleVariants({ size })}>{title}</span>
          {description && (
            <p className="text-[14px] leading-5 text-sub-600">{description}</p>
          )}
        </div>

        {children}

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    );
  },
);
