import type { ComponentType, ReactNode, SVGProps } from 'react';

/**
 * Shape of an icon component.
 *
 * Deliberately mirrors `@remixicon/react`'s own props: `size` and `color`
 * rather than `width`/`height`/`fill`, and `children?: never`. Widening this
 * to plain `SVGProps` makes every Remix icon fail to type-check, because
 * `children: ReactNode` is not assignable to `children: never`.
 */
export interface IconRenderProps extends Omit<
  SVGProps<SVGSVGElement>,
  'color' | 'children' | 'ref'
> {
  color?: string;
  size?: number | string;
  children?: never;
}

export type IconComponent = ComponentType<IconRenderProps>;

export interface IconProps extends Omit<
  SVGProps<SVGSVGElement>,
  'color' | 'children' | 'ref'
> {
  /** The icon component itself, e.g. `RiAddLine` from `@remixicon/react`. */
  icon?: IconComponent;
  /** Alternative to `icon`: pass an already-created element as a child. */
  children?: ReactNode;
  /** Pixel size, or any CSS length. `'1em'` makes the icon track font size. */
  size?: number | string;
  /** Overrides `currentColor`. Prefer a `text-*` token class instead. */
  color?: string;
  /**
   * Accessible name. Provide this ONLY when the icon carries meaning on its
   * own; otherwise the icon stays `aria-hidden` and the adjacent text speaks.
   */
  label?: string;
  /** Flip horizontally in RTL. Set on directional glyphs (arrows, chevrons). */
  mirrored?: boolean;
}
