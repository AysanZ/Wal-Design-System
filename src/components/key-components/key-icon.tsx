import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

/**
 * Figma → Key Icons [1.0]:
 *   Style = Stroke | Lighter, Color = 10 values, Size = 64/56/48/40/32.
 *
 * The large framed icon that opens a modal, an empty state or a feature card.
 */
export const keyIconVariants = cva(
  'grid shrink-0 place-items-center rounded-full',
  {
    variants: {
      appearance: {
        stroke: 'border bg-white-0',
        lighter: '',
      },
      color: {
        primary: '',
        gray: '',
        blue: '',
        orange: '',
        red: '',
        green: '',
        yellow: '',
        purple: '',
        pink: '',
        sky: '',
      },
      size: {
        '2xl': 'size-16 [&_svg]:size-8',
        xl: 'size-14 [&_svg]:size-7',
        lg: 'size-12 [&_svg]:size-6',
        md: 'size-10 [&_svg]:size-5',
        sm: 'size-8 [&_svg]:size-4',
      },
    },
    compoundVariants: [
      {
        appearance: 'stroke',
        color: 'primary',
        class: 'border-soft-200 text-primary-base',
      },
      {
        appearance: 'stroke',
        color: 'gray',
        class: 'border-soft-200 text-faded-base',
      },
      {
        appearance: 'stroke',
        color: 'blue',
        class: 'border-soft-200 text-information-base',
      },
      {
        appearance: 'stroke',
        color: 'orange',
        class: 'border-soft-200 text-warning-base',
      },
      {
        appearance: 'stroke',
        color: 'red',
        class: 'border-soft-200 text-error-base',
      },
      {
        appearance: 'stroke',
        color: 'green',
        class: 'border-soft-200 text-success-base',
      },
      {
        appearance: 'stroke',
        color: 'yellow',
        class: 'border-soft-200 text-away-base',
      },
      {
        appearance: 'stroke',
        color: 'purple',
        class: 'border-soft-200 text-feature-base',
      },
      {
        appearance: 'stroke',
        color: 'pink',
        class: 'border-soft-200 text-highlighted-base',
      },
      {
        appearance: 'stroke',
        color: 'sky',
        class: 'border-soft-200 text-verified-base',
      },

      {
        appearance: 'lighter',
        color: 'primary',
        class: 'bg-information-lighter text-primary-base',
      },
      {
        appearance: 'lighter',
        color: 'gray',
        class: 'bg-faded-lighter text-faded-base',
      },
      {
        appearance: 'lighter',
        color: 'blue',
        class: 'bg-information-lighter text-information-base',
      },
      {
        appearance: 'lighter',
        color: 'orange',
        class: 'bg-warning-lighter text-warning-base',
      },
      {
        appearance: 'lighter',
        color: 'red',
        class: 'bg-error-lighter text-error-base',
      },
      {
        appearance: 'lighter',
        color: 'green',
        class: 'bg-success-lighter text-success-base',
      },
      {
        appearance: 'lighter',
        color: 'yellow',
        class: 'bg-away-lighter text-away-base',
      },
      {
        appearance: 'lighter',
        color: 'purple',
        class: 'bg-feature-lighter text-feature-base',
      },
      {
        appearance: 'lighter',
        color: 'pink',
        class: 'bg-highlighted-lighter text-highlighted-base',
      },
      {
        appearance: 'lighter',
        color: 'sky',
        class: 'bg-verified-lighter text-verified-base',
      },
    ],
    defaultVariants: { appearance: 'lighter', color: 'primary', size: 'lg' },
  },
);

type KeyIconVariantProps = VariantProps<typeof keyIconVariants>;
export type KeyIconColor = NonNullable<KeyIconVariantProps['color']>;
export type KeyIconSize = NonNullable<KeyIconVariantProps['size']>;
export type KeyIconAppearance = NonNullable<KeyIconVariantProps['appearance']>;

export interface KeyIconProps extends Omit<
  ComponentPropsWithoutRef<'span'>,
  'color'
> {
  appearance?: KeyIconAppearance;
  color?: KeyIconColor;
  size?: KeyIconSize;
  children: ReactNode;
  /** Provide only when the icon carries meaning alone. Usually it does not. */
  label?: string;
}

export const KeyIcon = forwardRef<HTMLSpanElement, KeyIconProps>(
  function KeyIcon(
    {
      appearance = 'lighter',
      color = 'primary',
      size = 'lg',
      label,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <span
        ref={ref}
        {...(label
          ? { role: 'img', 'aria-label': label }
          : { 'aria-hidden': true })}
        className={cn(keyIconVariants({ appearance, color, size }), className)}
        {...rest}
      >
        {children}
      </span>
    );
  },
);
