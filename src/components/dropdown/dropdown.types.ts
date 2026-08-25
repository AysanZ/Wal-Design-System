import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type {
  DropdownVariantProps,
  DropdownItemVariantProps,
} from './dropdown.styles';

export type DropdownSize = NonNullable<DropdownVariantProps['size']>;
export type DropdownAppearance = NonNullable<
  DropdownVariantProps['appearance']
>;
export type DropdownItemSize = NonNullable<DropdownItemVariantProps['size']>;

export interface DropdownOption {
  value: string;
  label: ReactNode;
  /** Second line — Figma's Large (56) item. */
  description?: ReactNode;
  /**
   * Leading slot. Covers all six Figma Types: a flag for Country, an `<Avatar>`
   * for Avatar, a card mark for Provider, a logo for Brand or Company.
   */
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  disabled?: boolean;
  /** Groups items under a Figma "Caption" heading. */
  group?: string;
}

export interface DropdownProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange' | 'defaultValue' | 'children'
> {
  options: DropdownOption[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string) => void;

  placeholder?: ReactNode;
  size?: DropdownSize;
  itemSize?: DropdownItemSize;
  appearance?: DropdownAppearance;
  disabled?: boolean;
  invalid?: boolean;

  /** Figma misc. item "Search". */
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: ReactNode;

  /** Figma misc. items "Button" / "Button Group", pinned under the list. */
  footer?: ReactNode;

  /** Accessible name for the trigger. */
  label?: string;
  triggerClassName?: string;
  menuClassName?: string;
}
