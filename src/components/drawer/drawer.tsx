import { forwardRef, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { RiCloseLine } from '@remixicon/react';
import { cn } from '../../lib/cn';
import { useId } from '../../hooks/use-id';
import { useDismissable } from '../../hooks/use-dismissable';
import { Icon } from '../icon';
import { CompactButton } from '../button';
import {
  drawerOverlayVariants,
  drawerPanelVariants,
  drawerHeaderVariants,
  drawerBodyVariants,
  drawerFooterVariants,
} from './drawer.styles';
import type { DrawerProps } from './drawer.types';

/**
 * Panel that slides in from an edge.
 *
 * ## Accessibility
 *
 * `role="dialog"` + `aria-modal`, labelled by its own title, with focus trapped
 * inside and returned to the trigger on close. Background scroll is locked —
 * without it the page behind scrolls under the panel on mobile, which reads as
 * a broken app.
 *
 * ## RTL
 *
 * `side` is logical. `end` resolves to the right edge in English and the left
 * edge in Persian, and the enter/exit transform flips with it — a drawer that
 * slides in from the correct side but exits to the wrong one is worse than one
 * that never animates.
 *
 * ## Rendering
 *
 * Portalled to `document.body` so the panel escapes any ancestor with
 * `overflow: hidden` or a stacking context. It stays mounted while closing so
 * the exit transition can run, then unmounts.
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    open,
    onOpenChange,
    side = 'end',
    size = 'md',
    title,
    description,
    icon,
    headerSize = 'sm',
    children,
    footer,
    stretchFooter = false,
    showClose = true,
    closeLabel = 'Close',
    closeOnOutsideClick = true,
    closeOnEscape = true,
    container,
    className,
    ...rest
  },
  ref,
) {
  const panelRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;

  // Keep the panel mounted for the exit transition, then drop it so the
  // trapped focus and scroll lock are genuinely released.
  const [mounted, setMounted] = useState(open);
  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    const timer = window.setTimeout(() => setMounted(false), 200);
    return () => window.clearTimeout(timer);
  }, [open]);

  useDismissable(panelRef, {
    open,
    onDismiss: () => onOpenChange(false),
    closeOnEscape,
    closeOnOutsideClick,
    trapFocus: true,
    lockScroll: true,
  });

  if (!mounted || typeof document === 'undefined') return null;

  const state = open ? 'open' : 'closed';

  return createPortal(
    <>
      <div data-state={state} className={drawerOverlayVariants()} aria-hidden />
      <div
        ref={(node) => {
          (panelRef as { current: HTMLDivElement | null }).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref)
            (ref as { current: HTMLDivElement | null }).current = node;
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        data-state={state}
        tabIndex={-1}
        className={cn(drawerPanelVariants({ side, size }), className)}
        {...rest}
      >
        {(title || showClose) && (
          <header className={drawerHeaderVariants({ size: headerSize })}>
            {icon && <span className="shrink-0 pt-0.5">{icon}</span>}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              {title && (
                <h2
                  id={titleId}
                  className={cn(
                    'font-medium text-strong-950',
                    headerSize === 'lg'
                      ? 'text-[18px] leading-6'
                      : 'text-[16px] leading-6',
                  )}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id={descriptionId}
                  className="text-[14px] leading-5 text-sub-600"
                >
                  {description}
                </p>
              )}
            </div>
            {showClose && (
              <CompactButton
                appearance="ghost"
                aria-label={closeLabel}
                onClick={() => onOpenChange(false)}
              >
                <Icon icon={RiCloseLine} />
              </CompactButton>
            )}
          </header>
        )}

        <div className={drawerBodyVariants({ size: headerSize })}>
          {children}
        </div>

        {footer && (
          <footer className={drawerFooterVariants({ stretch: stretchFooter })}>
            {footer}
          </footer>
        )}
      </div>
    </>,
    container ?? document.body,
  );
});
