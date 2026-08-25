import type { ElementType } from 'react';
import type { PolymorphicProps } from '../../lib/polymorphic';
import type { TypographyVariantProps } from './typography.styles';

export interface TypographyOwnProps extends TypographyVariantProps {
  /**
   * Override the rendered element. Defaults to a semantically sensible tag
   * for the variant (`h1` renders `<h1>`, `paragraph-*` renders `<p>`) so
   * document outline and screen-reader navigation stay correct by default.
   */
  as?: ElementType;
  className?: string;
}

export type TypographyProps<TElement extends ElementType = 'p'> =
  PolymorphicProps<TElement, TypographyOwnProps>;
