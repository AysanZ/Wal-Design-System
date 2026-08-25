import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "Activity Feed" page (node 1465:6475).
 *   Header    → Type (Default)
 *   Tab Menu  → Quantity 02–04
 *   Items     → Type (Basic · Button · File · Message) × State (Default · Hover)
 *
 * Quantity is not a prop on the tab menu, and State is not a prop on the item:
 * the tab count is however many children you pass, and hover is a CSS state.
 */
export const activityFeedVariants = cva(
  'flex w-full flex-col rounded-xl border border-soft-200 bg-white-0',
);

export const activityFeedHeaderVariants = cva(
  'flex items-center justify-between gap-3 border-b border-soft-200 px-4 py-3',
);

export const activityFeedTabsVariants = cva(
  'flex items-center gap-1 border-b border-soft-200 px-2',
);

export const activityFeedTabVariants = cva(
  [
    'relative inline-flex items-center gap-1.5 shrink-0',
    'px-3 py-2.5 text-[14px] font-medium leading-5',
    'cursor-pointer transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
    'disabled:pointer-events-none disabled:text-sub-300',
    // The active underline is drawn with a pseudo-element pinned to the
    // inline box, so it stays put when the tab row is reversed in RTL.
    'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-t-full',
  ],
  {
    variants: {
      selected: {
        true: 'text-strong-950 after:bg-primary-base',
        false: 'text-sub-600 hover:text-strong-950 after:bg-transparent',
      },
    },
    defaultVariants: { selected: false },
  },
);

export const activityFeedItemVariants = cva(
  [
    'group/item relative flex w-full items-start gap-3 px-4 py-3',
    'text-start transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-base',
  ],
  {
    variants: {
      interactive: {
        true: 'cursor-pointer hover:bg-weak-50',
        false: '',
      },
      unread: {
        // A logical inset so the unread marker sits on the leading edge in
        // both directions.
        true: 'before:absolute before:start-0 before:top-4 before:h-2 before:w-0.5 before:rounded-e-full before:bg-primary-base',
        false: '',
      },
    },
    defaultVariants: { interactive: false, unread: false },
  },
);

export const activityFeedAttachmentVariants = cva(
  'flex items-center gap-2 rounded-lg border border-soft-200 bg-white-0 px-3 py-2',
);

export type ActivityFeedItemVariantProps = VariantProps<
  typeof activityFeedItemVariants
>;
