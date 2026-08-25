import type { ElementType, ComponentPropsWithoutRef } from 'react';

/**
 * Props for a component that can render as a different element via `as`.
 * Keeps the element's own props type-safe: `<Typography as="a" href="…" />`
 * type-checks, `<Typography as="div" href="…" />` does not.
 */
export type PolymorphicProps<
  TElement extends ElementType,
  TOwnProps = object,
> = TOwnProps &
  Omit<ComponentPropsWithoutRef<TElement>, keyof TOwnProps | 'as'> & {
    as?: TElement;
  };
