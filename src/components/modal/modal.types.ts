import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { ModalVariantProps } from './modal.styles';

export type ModalSize = NonNullable<ModalVariantProps['size']>;
export type ModalStatus = 'error' | 'warning' | 'success' | 'info';

export interface ModalProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title' | 'children'
> {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: ReactNode;
  description?: ReactNode;
  /** Figma header "Right Icon" — a free leading slot. Wins over `status`. */
  icon?: ReactNode;
  /** Picks the default KeyIcon and its colour. */
  status?: ModalStatus;
  /** Figma header Medium (80) / Small (56). */
  headerSize?: 'sm' | 'md';
  /** Figma Status Modal alignment. `vertical` centres icon, title and text. */
  alignment?: 'horizontal' | 'vertical';

  size?: ModalSize;
  children?: ReactNode;
  footer?: ReactNode;
  stretchFooter?: boolean;

  showClose?: boolean;
  closeLabel?: string;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  container?: HTMLElement | null;
}

export interface StatusModalProps extends Omit<
  ModalProps,
  'alignment' | 'status'
> {
  status: ModalStatus;
  alignment?: 'horizontal' | 'vertical';
}
