import { useEffect, useRef, type RefObject } from 'react';

export interface UseDismissableOptions {
  open: boolean;
  onDismiss: () => void;
  /** Escape closes it. Off for nested layers that handle their own key. */
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  /** Trap Tab inside the container and restore focus on close. */
  trapFocus?: boolean;
  /** Prevent background scroll. Right for a modal drawer, wrong for a menu. */
  lockScroll?: boolean;
  /** Elements that should not count as "outside" — typically the trigger. */
  ignoreRefs?: Array<RefObject<HTMLElement | null>>;
}

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * The four behaviours every overlay needs, in one place.
 *
 * Written out rather than pulled from Radix because this library has no
 * runtime dependencies, but the trade is worth stating plainly: a production
 * focus trap also has to handle iframes, shadow DOM, and browser chrome, and
 * this one does not. If the system grows a Modal, a Popover and a Combobox,
 * moving these primitives onto Radix or Base UI is the right call — the
 * component APIs here would not have to change.
 */
export function useDismissable(
  containerRef: RefObject<HTMLElement | null>,
  {
    open,
    onDismiss,
    closeOnEscape = true,
    closeOnOutsideClick = true,
    trapFocus = false,
    lockScroll = false,
    ignoreRefs = [],
  }: UseDismissableOptions,
) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        event.stopPropagation();
        onDismiss();
        return;
      }

      if (!trapFocus || event.key !== 'Tab') return;
      const container = containerRef.current;
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!closeOnOutsideClick) return;
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (ignoreRefs.some((ref) => ref.current?.contains(target))) return;
      onDismiss();
    };

    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('pointerdown', onPointerDown, true);
      // Returning focus is the half everyone forgets: without it, closing an
      // overlay drops the user back at the top of the document.
      previouslyFocused.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, closeOnEscape, closeOnOutsideClick, trapFocus, onDismiss]);

  useEffect(() => {
    if (!open || !lockScroll || typeof document === 'undefined') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, lockScroll]);

  useEffect(() => {
    if (!open || !trapFocus) return;
    const container = containerRef.current;
    if (!container) return;
    const first = container.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? container).focus?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, trapFocus]);
}
