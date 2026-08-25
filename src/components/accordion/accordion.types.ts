import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface AccordionProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title' | 'content' | 'onToggle'
> {
  title: ReactNode;
  children?: ReactNode;
  /** Alias for `children`, kept for call sites that pass content as a prop. */
  content?: ReactNode;

  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean;
  /** Uncontrolled initial state. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  disabled?: boolean;
  /** Where the expand/collapse indicator sits. Follows reading direction. */
  indicatorPosition?: 'start' | 'end';
  /** Replaces the default ＋ / － indicator entirely. */
  indicator?: ReactNode;
  /** Decorative element shown before the title (e.g. a category icon). */
  startAdornment?: ReactNode;

  /** Override the generated ids used to wire `aria-controls`/`aria-labelledby`. */
  id?: string;
}

export interface AccordionGroupProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'onChange'
> {
  /** `'single'` closes the others on open; `'multiple'` leaves them alone. */
  type?: 'single' | 'multiple';
  /** In `'single'` mode, allow closing the open item by clicking it again. */
  collapsible?: boolean;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  children?: ReactNode;
}
