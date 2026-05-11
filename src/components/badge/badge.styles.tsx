import clsx from 'clsx';
import { Color, Size, Style } from '.';

export const sizeStyles = 'px-2 py-[2px]';

export const baseStyles =
  'inline-flex items-center justify-center gap-[2px] rounded-full shrink-0';

export const typographyStyles = '!text-inherit';

export const iconContainerSizeMap: Record<Size, string> = {
  medium: 'w-4 h-4',
  small: 'w-3 h-3',
};

export const dotSize = 'w-1 h-1';

// ==================== Color Maps ====================

const filledBgMap: Record<Color, string> = {
  gray: 'bg-faded-base',
  blue: 'bg-information-base',
  orange: 'bg-warning-base',
  red: 'bg-error-base',
  green: 'bg-success-base',
  yellow: 'bg-away-base',
  purple: 'bg-feature-base',
  sky: 'bg-verified-base',
  pink: 'bg-highlighted-base',
  teal: 'bg-stable-base',
};

const lightBgMap: Record<Color, string> = {
  gray: 'bg-faded-light',
  blue: 'bg-information-light',
  orange: 'bg-warning-light',
  red: 'bg-error-light',
  green: 'bg-success-light',
  yellow: 'bg-away-light',
  purple: 'bg-feature-light',
  sky: 'bg-verified-light',
  pink: 'bg-highlighted-light',
  teal: 'bg-stable-light',
};

const lightTextMap: Record<Color, string> = {
  gray: 'text-faded-dark',
  blue: 'text-information-dark',
  orange: 'text-warning-dark',
  red: 'text-error-dark',
  green: 'text-success-dark',
  yellow: 'text-away-dark',
  purple: 'text-feature-dark',
  sky: 'text-verified-dark',
  pink: 'text-highlighted-dark',
  teal: 'text-stable-dark',
};

const lighterBgMap: Record<Color, string> = {
  gray: 'bg-faded-lighter',
  blue: 'bg-information-lighter',
  orange: 'bg-warning-lighter',
  red: 'bg-error-lighter',
  green: 'bg-success-lighter',
  yellow: 'bg-away-lighter',
  purple: 'bg-feature-lighter',
  sky: 'bg-verified-lighter',
  pink: 'bg-highlighted-lighter',
  teal: 'bg-stable-lighter',
};

const strokeBorderMap: Record<Color, string> = {
  gray: 'border-faded-base',
  blue: 'border-information-base',
  orange: 'border-warning-base',
  red: 'border-error-base',
  green: 'border-success-base',
  yellow: 'border-away-base',
  purple: 'border-feature-base',
  sky: 'border-verified-base',
  pink: 'border-highlighted-base',
  teal: 'border-stable-base',
};

const lighterTextMap: Record<Color, string> = {
  gray: 'text-faded-base',
  blue: 'text-information-base',
  orange: 'text-warning-base',
  red: 'text-error-base',
  green: 'text-success-base',
  yellow: 'text-away-base',
  purple: 'text-feature-base',
  sky: 'text-verified-base',
  pink: 'text-highlighted-base',
  teal: 'text-stable-base',
};

const strokeTextMap: Record<Color, string> = {
  gray: 'text-faded-base',
  blue: 'text-information-base',
  orange: 'text-warning-base',
  red: 'text-error-base',
  green: 'text-success-base',
  yellow: 'text-away-base',
  purple: 'text-feature-base',
  sky: 'text-verified-base',
  pink: 'text-highlighted-base',
  teal: 'text-stable-base',
};
// ==================== Main Functions ====================

export const getBadgeStyles = (
  style: Style,
  color: Color,
  disabled: boolean,
) => {
  if (disabled) {
    return 'bg-transparent text-soft-300 border border-soft-200';
  }

  let bg = '';
  let text = '';
  let border = '';

  switch (style) {
    case 'filled':
      bg = filledBgMap[color];
      text = 'text-static-white';
      break;

    case 'light':
      bg = lightBgMap[color];
      text = lightTextMap[color];
      break;

    case 'lighter':
      bg = lighterBgMap[color];
      text = lighterTextMap[color];
      break;

    case 'stroke':
      bg = 'bg-transparent';
      border = `border border-solid ${strokeBorderMap[color]}`;
      text = strokeTextMap[color];
      break;
  }

  return clsx(bg, text, border);
};

export const getDotIconColor = (
  style: Style,
  color: Color,
  disabled: boolean,
) => {
  if (disabled) return 'bg-soft-400';

  switch (style) {
    case 'filled':
      return 'bg-static-white';
    case 'light':
      return lightTextMap[color].replace('text-', 'bg-');
    case 'lighter':
    case 'stroke':
      return lighterTextMap[color].replace('text-', 'bg-');
    default:
      return 'bg-faded-base';
  }
};

// ==================== JSX Helper Classes ====================

export const getIconContainerClass = (size: Size) =>
  clsx('flex items-center justify-center', iconContainerSizeMap[size]);

export const getDotClass = (dotColor: string) =>
  clsx(dotSize, 'rounded-full', dotColor);
