import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { TagVariantProps } from './tag.styles';

export type TagAppearance = NonNullable<TagVariantProps['appearance']>;
export type TagSize = NonNullable<TagVariantProps['size']>;

export interface TagProps extends Omit<
  ComponentPropsWithoutRef<'span'>,
  'onSelect'
> {
  appearance?: TagAppearance;
  size?: TagSize;
  disabled?: boolean;
  /** The tag is currently applied — adds `aria-pressed` when selectable. */
  selected?: boolean;

  /** Leading slot: an icon, an avatar, a coloured dot. */
  startAdornment?: ReactNode;

  /** Makes the label a button — a filter chip you can toggle. */
  onSelect?: () => void;
  /** Shows the remove button. */
  onDismiss?: () => void;
  /**
   * Accessible name for the remove button. Required alongside `onDismiss`: an
   * ✕ has no accessible name, and "button" is all a screen reader would get.
   */
  dismissLabel?: string;
}

export interface TagGroupProps extends ComponentPropsWithoutRef<'div'> {
  /** Accessible name for the set, e.g. `'برچسب‌ها'`. */
  label?: string;
}
