import { useId as useReactId } from 'react';

/**
 * Stable id for wiring ARIA relationships (`aria-controls`, `aria-labelledby`).
 * Accepts a caller-supplied id so consumers can override it.
 */
export function useId(providedId?: string): string {
  const generated = useReactId();
  return providedId ?? generated;
}
