import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/cn';
import { Avatar } from '../avatar';
import type { AvatarGroupItem } from '../avatar.types';

/**
 * Figma → "❖ Avatar" page, Compact Avatar Group [1.0].
 *   Style = Default | Stroke
 *   Size  = 40 | 32 | 24
 *
 * A denser stack than `AvatarGroup`: tighter overlap, a smaller size range, and
 * a bordered container in the Stroke style. Meant for table rows and list
 * items, where `AvatarGroup`'s spacing is too generous.
 */
const compactAvatarGroupVariants = cva('inline-flex items-center', {
  variants: {
    appearance: {
      default: '',
      stroke: 'rounded-full border border-soft-200 bg-white-0 p-0.5',
    },
    size: {
      sm: '[&>*:not(:first-child)]:-ms-2.5',
      xs: '[&>*:not(:first-child)]:-ms-2',
      '2xs': '[&>*:not(:first-child)]:-ms-1.5',
    },
  },
  defaultVariants: { appearance: 'default', size: 'sm' },
});

type CompactAvatarGroupVariantProps = VariantProps<
  typeof compactAvatarGroupVariants
>;

export type CompactAvatarGroupSize = NonNullable<
  CompactAvatarGroupVariantProps['size']
>;
export type CompactAvatarGroupAppearance = NonNullable<
  CompactAvatarGroupVariantProps['appearance']
>;

export interface CompactAvatarGroupProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  items: AvatarGroupItem[];
  /** 40px, 32px or 24px — the three sizes the design defines here. */
  size?: CompactAvatarGroupSize;
  appearance?: CompactAvatarGroupAppearance;
  max?: number;
  label?: string;
}

export const CompactAvatarGroup = forwardRef<
  HTMLDivElement,
  CompactAvatarGroupProps
>(function CompactAvatarGroup(
  {
    items,
    size = 'sm',
    appearance = 'default',
    max,
    label,
    className,
    ...rest
  },
  ref,
) {
  const visible = typeof max === 'number' ? items.slice(0, max) : items;
  const overflow = Math.max(items.length - visible.length, 0);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={cn(
        compactAvatarGroupVariants({ appearance, size }),
        className,
      )}
      {...rest}
    >
      {visible.map((item, index) => (
        <Avatar
          key={item.id ?? `${item.name}-${index}`}
          size={size}
          name={item.name}
          src={item.src}
          initials={item.initials}
          tone={item.tone}
          className="border-2 border-white-0"
        />
      ))}
      {overflow > 0 && (
        <Avatar
          size={size}
          name=""
          initials={`+${overflow}`}
          tone="soft"
          className="border-2 border-white-0"
        />
      )}
    </div>
  );
});
