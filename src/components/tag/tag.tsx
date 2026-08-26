import { forwardRef } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { cn } from '../../lib/cn';
import { Icon } from '../icon';
import {
  tagVariants,
  tagContentVariants,
  tagDismissVariants,
  tagGroupVariants,
} from './tag.styles';
import type { TagProps, TagGroupProps } from './tag.types';

/**
 * A removable label: something the user attached, applied or picked.
 *
 * ## Two buttons, never nested
 *
 * A selectable tag with a remove button is two controls side by side, not a
 * button inside a button. Nesting is invalid HTML and browsers resolve it by
 * dropping the inner element, so the remove target silently stops working —
 * the same trap `FilterChip` documents. Here the wrapper is a plain `<span>`
 * and the label and the ✕ are siblings inside it.
 *
 * ## The remove button needs a name
 *
 * `dismissLabel` is not optional decoration. An ✕ glyph has no accessible
 * name, so without it a screen-reader user hears "button" and has no idea
 * which of the eight tags on screen it belongs to. Name it after the tag:
 * "Remove design".
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    appearance = 'stroke',
    size = 'md',
    disabled = false,
    selected = false,
    startAdornment,
    onSelect,
    onDismiss,
    dismissLabel,
    className,
    children,
    ...rest
  },
  ref,
) {
  const label = (
    <>
      {startAdornment != null && (
        <span aria-hidden className="grid shrink-0 place-items-center">
          {startAdornment}
        </span>
      )}
      <span className="truncate">{children}</span>
    </>
  );

  return (
    <span
      ref={ref}
      className={cn(
        tagVariants({
          appearance,
          size,
          dismissible: Boolean(onDismiss),
          disabled,
          selected,
        }),
        className,
      )}
      {...rest}
    >
      {onSelect ? (
        <button
          type="button"
          onClick={onSelect}
          disabled={disabled}
          aria-pressed={selected}
          className={tagContentVariants({ interactive: true })}
        >
          {label}
        </button>
      ) : (
        <span className={tagContentVariants()}>{label}</span>
      )}

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          disabled={disabled}
          aria-label={dismissLabel ?? 'Remove'}
          className={tagDismissVariants({ size })}
        >
          <Icon icon={RiCloseLine} />
        </button>
      )}
    </span>
  );
});

/**
 * A set of tags.
 *
 * `role="group"` with a name rather than a list, matching `FilterBar`: a
 * screen-reader user hears "Labels, group" and then the tags, instead of
 * "list, 5 items" — which promises content to read through when these are
 * mostly controls to act on.
 */
export const TagGroup = forwardRef<HTMLDivElement, TagGroupProps>(
  function TagGroup({ label, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        className={cn(tagGroupVariants(), className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
