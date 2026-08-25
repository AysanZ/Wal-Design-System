import { forwardRef, type ElementType, type Ref } from 'react';
import { cn } from '../../lib/cn';
import {
  typographyVariants,
  defaultElementForVariant,
  type TypographyVariant,
} from './typography.styles';
import type { TypographyProps } from './typography.types';

function TypographyImpl<TElement extends ElementType = 'p'>(
  { as, variant, className, children, ...rest }: TypographyProps<TElement>,
  ref: Ref<Element>,
) {
  const resolvedVariant = (variant ?? 'paragraph-medium') as TypographyVariant;
  const Component = (as ??
    defaultElementForVariant[resolvedVariant]) as ElementType;

  return (
    <Component
      ref={ref}
      className={cn(typographyVariants({ variant }), className)}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Type scale primitive. Colour comes from the `text-strong-950` semantic
 * token, which swaps under `[data-theme="dark"]` — there is deliberately no
 * `dark:` class here.
 */
export const Typography = forwardRef(TypographyImpl) as <
  TElement extends ElementType = 'p',
>(
  props: TypographyProps<TElement> & { ref?: Ref<Element> },
) => ReturnType<typeof TypographyImpl>;
