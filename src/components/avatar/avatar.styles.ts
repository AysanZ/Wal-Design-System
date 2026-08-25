import { cva, type VariantProps } from 'class-variance-authority';

export const avatarVariants = cva('relative shrink-0 rounded-full', {
  variants: {
    size: {
      '3xl': 'size-20',
      '2xl': 'size-[72px]',
      xl: 'size-16',
      lg: 'size-14',
      md: 'size-12',
      sm: 'size-10',
      xs: 'size-8',
      '2xs': 'size-6',
      '3xs': 'size-5',
    },
  },
  defaultVariants: { size: 'md' },
});

export const avatarSurfaceVariants = cva(
  'relative flex size-full items-center justify-center overflow-hidden rounded-full',
  {
    variants: {
      tone: {
        soft: 'bg-soft-200 text-static-black',
        yellow: 'bg-yellow-200 text-yellow-950',
        blue: 'bg-blue-200 text-blue-950',
        green: 'bg-sky-200 text-sky-950',
        purple: 'bg-purple-200 text-purple-950',
        red: 'bg-red-200 text-red-950',
      },
    },
    defaultVariants: { tone: 'soft' },
  },
);

export type AvatarSize = NonNullable<
  VariantProps<typeof avatarVariants>['size']
>;
export type AvatarTone = NonNullable<
  VariantProps<typeof avatarSurfaceVariants>['tone']
>;

/** Pixel size per token — needed for `<img sizes>` and intrinsic icon sizing. */
export const avatarPixelSize: Record<AvatarSize, number> = {
  '3xl': 80,
  '2xl': 72,
  xl: 64,
  lg: 56,
  md: 48,
  sm: 40,
  xs: 32,
  '2xs': 24,
  '3xs': 20,
};

export const avatarTextVariant: Record<
  AvatarSize,
  'h5' | 'label-large' | 'label-medium' | 'label-small' | 'label-xsmall'
> = {
  '3xl': 'h5',
  '2xl': 'h5',
  xl: 'h5',
  lg: 'label-large',
  md: 'label-large',
  sm: 'label-medium',
  xs: 'label-small',
  '2xs': 'label-xsmall',
  '3xs': 'label-xsmall',
};

/** Below `lg` there is not enough room to render a status marker legibly. */
export const avatarSupportsStatus = (size: AvatarSize): boolean =>
  (['lg', 'xl', '2xl', '3xl'] as AvatarSize[]).includes(size);

/**
 * Deprecated size names kept so existing call sites keep compiling.
 * `xxxsmall`/`xxsmall`/… were ambiguous at a glance; `3xs`/`2xs`/… match the
 * naming already used by the Figma library and by Tailwind itself.
 */
export const legacyAvatarSize: Record<string, AvatarSize> = {
  xxxlarge: '3xl',
  xxlarge: '2xl',
  xlarge: 'xl',
  large: 'lg',
  medium: 'md',
  small: 'sm',
  xsmall: 'xs',
  xxsmall: '2xs',
  xxxsmall: '3xs',
};
