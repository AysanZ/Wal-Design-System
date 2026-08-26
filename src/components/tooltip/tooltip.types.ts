import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { TooltipVariantProps } from './tooltip.styles';

export type TooltipSide = NonNullable<TooltipVariantProps['side']>;
export type TooltipAlign = NonNullable<TooltipVariantProps['align']>;
export type TooltipSize = NonNullable<TooltipVariantProps['size']>;

export interface TooltipProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'content'
> {
  /**
   * The trigger. A single element, which receives the hover, focus and
   * `aria-describedby` wiring — so it must be able to take focus. Wrap plain
   * text in a `<button>` or a focusable element; a tooltip on a `<span>` is
   * invisible to keyboard users.
   */
  children: ReactNode;
  /**
   * Tooltip text. Keep it to a phrase and keep it non-essential: a tooltip is
   * unreachable on touch and can be missed entirely, so anything the user
   * *must* read belongs in the page.
   */
  content: ReactNode;

  side?: TooltipSide;
  align?: TooltipAlign;
  size?: TooltipSize;
  arrow?: boolean;

  /** Controlled visibility. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  /** Milliseconds before it appears on hover. Focus opens it immediately. */
  delay?: number;
  /** Turns the tooltip off without unmounting the trigger. */
  disabled?: boolean;

  /** Class for the bubble. Use `className` for the wrapper. */
  contentClassName?: string;
}
