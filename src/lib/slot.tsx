import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from 'react';

function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(node);
      else if (ref && typeof ref === 'object')
        (ref as { current: T | null }).current = node;
    });
  };
}

/**
 * Merges the parent's props onto its single child element instead of rendering
 * a wrapper. This is what makes `asChild` work:
 *
 * ```tsx
 * <Button asChild><a href="/docs">Docs</a></Button>
 * ```
 *
 * renders a single `<a>` carrying every Button class, event handler and ARIA
 * attribute — no nested `<button><a>`, which is invalid HTML and a real
 * keyboard trap. This is the seam that makes the library composable enough to
 * call itself headless: consumers keep the behaviour and swap the element.
 */
export const Slot = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function Slot({ children, ...slotProps }, ref) {
    if (!isValidElement(children)) {
      return null;
    }

    const child = Children.only(children) as ReactElement<
      HTMLAttributes<HTMLElement> & {
        ref?: Ref<HTMLElement>;
        className?: string;
      }
    >;
    const childProps = child.props;

    // Child props win for values; handlers and className compose.
    const merged: Record<string, unknown> = { ...slotProps, ...childProps };

    for (const key of Object.keys(slotProps)) {
      if (!/^on[A-Z]/.test(key)) continue;
      const slotHandler = (slotProps as Record<string, unknown>)[key];
      const childHandler = (childProps as Record<string, unknown>)[key];
      if (
        typeof slotHandler === 'function' &&
        typeof childHandler === 'function'
      ) {
        merged[key] = (...args: unknown[]) => {
          (childHandler as (...a: unknown[]) => void)(...args);
          (slotHandler as (...a: unknown[]) => void)(...args);
        };
      }
    }

    if (slotProps.className || childProps.className) {
      merged.className = [slotProps.className, childProps.className]
        .filter(Boolean)
        .join(' ');
    }

    return cloneElement(child, {
      ...merged,
      ref: mergeRefs(ref, (child as { ref?: Ref<HTMLElement> }).ref),
    } as never);
  },
);
