import clsx from 'clsx';
import { Size } from '@components/avatar';

export const avatarGroupContainerStyles = clsx(
  'flex justify-center items-center',
);

export const avatarStyles = clsx(
  'border-2 border-white-0 dark:border-white-0-dark',
);

export const showMoreStyles = clsx(
  'border-2 border-white-0 dark:border-white-0-dark rounded-full bg-weak-50 dark:bg-weak-50-dark flex justify-center items-center',
);

export const typographyVariant = (size: Size) => {
  switch (size) {
    case 'xxxlarge':
    case 'xxlarge':
      return 'h5';
    case 'xlarge':
      return 'h6';
    case 'large':
      return 'label-large';
    case 'medium':
      return 'label-medium';
    default:
      return 'label-xsmall';
  }
};

export const typographyStyles = 'text-sub-600 dark:text-sub-600-dark';

export const avatarTransform = (index: number, direction: string) => {
  return {
    transform: `translateX(${direction === 'rtl' ? '' : '-'}${index * 20}%)`,
  };
};

export const showMoreTransform = (avatarCount: number, direction: string) => {
  return {
    transform: `translateX(${direction === 'rtl' ? '' : '-'}${avatarCount * 20}%)`,
  };
};
