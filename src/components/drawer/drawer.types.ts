import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { DrawerVariantProps } from './drawer.styles';

export type DrawerSide = NonNullable<DrawerVariantProps['side']>;
export type DrawerSize = NonNullable<DrawerVariantProps['size']>;

export interface DrawerProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title' | 'children'
> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Logical: `end` is right in English, left in Persian. */
  side?: DrawerSide;
  size?: DrawerSize;

  title?: ReactNode;
  description?: ReactNode;
  /** Figma header "Left Icon" — leading slot before the title. */
  icon?: ReactNode;
  /** Header density: Figma's Small / Large. */
  headerSize?: 'sm' | 'lg';

  children?: ReactNode;
  footer?: ReactNode;
  /** Figma footer "Stretch": actions fill the width. */
  stretchFooter?: boolean;

  showClose?: boolean;
  closeLabel?: string;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  /** Where to portal the drawer. Defaults to `document.body`. */
  container?: HTMLElement | null;
}
