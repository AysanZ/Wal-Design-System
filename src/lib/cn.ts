import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class names with correct precedence.
 *
 * `clsx` alone only concatenates, so a consumer passing `className="bg-red-500"`
 * would end up with BOTH their class and the component's internal `bg-*` class,
 * and whichever appears later in the compiled stylesheet wins — i.e. the
 * override silently fails about half the time. `twMerge` resolves the conflict
 * by dropping the earlier class in the same utility group.
 *
 * Every component in this library composes its classes through `cn`, which is
 * what makes `className` a reliable escape hatch.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
