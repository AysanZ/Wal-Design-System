import clsx from 'clsx';
import { BottomStatus, Size, TopStatus } from './avatar.types';
import { Icon } from '@components/icon';

export const sizeClasses: Record<Size, number> = {
  xxxlarge: 80,
  xxlarge: 72,
  xlarge: 64,
  large: 56,
  medium: 48,
  small: 40,
  xsmall: 32,
  xxsmall: 24,
  xxxsmall: 20,
};

export const sizeMap: Record<Size, string> = {
  xxxlarge: 'w-20 h-20',
  xxlarge: 'w-[72px] h-[72px]',
  xlarge: 'w-16 h-16',
  large: 'w-14 h-14',
  medium: 'w-12 h-12',
  small: 'w-10 h-10',
  xsmall: 'w-8 h-8',
  xxsmall: 'w-6 h-6',
  xxxsmall: 'w-5 h-5',
};

export const avatarContainerStyles = (size: Size) =>
  clsx('relative', sizeMap[size]);

export const backgroundColors = {
  soft: 'bg-soft-200 dark:bg-soft-200-dark',
  yellow: 'bg-yellow-200',
  blue: 'bg-blue-200',
  green: 'bg-sky-200',
  purple: 'bg-purple-200',
  red: 'bg-red-200',
};

export const avatarContentStyles = {
  img: 'object-cover w-full h-full rounded-full',
  iconContainer:
    'rounded-full h-full w-full flex justify-center items-center overflow-hidden',
  iconPosition: (size: Size) =>
    size.endsWith('large')
      ? 'translate-y-3'
      : size.endsWith('small')
        ? 'translate-y-1'
        : 'translate-y-2',
  textFallback:
    'rounded-full h-full w-full flex justify-center items-center overflow-hidden',
  background: (bgColor?: string) =>
    clsx(
      'relative rounded-full overflow-hidden w-full h-full flex justify-center items-center',
      backgroundColors[bgColor as keyof typeof backgroundColors] ??
        backgroundColors['soft'],
    ),
};

const textColors = {
  soft: 'text-static-black',
  yellow: 'text-yellow-950',
  blue: 'text-blue-950',
  green: 'text-sky-950',
  purple: 'text-purple-950',
  red: 'text-red-950',
};

export const textStyle = (value: string | Size | undefined) => {
  const sizeMap = {
    xxxlarge: 'h5',
    xxlarge: 'h5',
    xlarge: 'h5',
    large: 'label-large',
    medium: 'label-large',
    small: 'label-medium',
    xsmall: 'label-small',
    xxsmall: 'label-xsmall',
    xxxsmall: 'label-xsmall',
  };

  return (
    textColors[value as keyof typeof textColors] ||
    sizeMap[value as keyof typeof sizeMap]
  );
};

const statusStyles = {
  top: {
    container:
      'absolute top-0 end-0 flex justify-center items-center transform translate-x-[6px] w-8 h-8',
    icon: (status: TopStatus) => {
      const iconStyles = {
        verified: (
          <Icon
            name="verified-badge-fill"
            className="text-verified-base"
            size={24}
          />
        ),
        pin: (
          <div className="bg-feature-base rounded-full flex justify-center items-center border-2 border-white-0 dark:border-white-0 w-6 h-6">
            <Icon name="pushpin-fill" color="white" size={14} />
          </div>
        ),
        favorite: (
          <div className="bg-success-base rounded-full flex justify-center items-center border-2 border-white-0 dark:border-white-0 w-6 h-6">
            <Icon name="star-fill" color="white" size={14} />
          </div>
        ),
        add: (
          <div className="bg-faded-base rounded-full flex justify-center items-center border-2 border-white-0 dark:border-white-0 w-6 h-6">
            <Icon name="add-line" color="white" size={14} />
          </div>
        ),
        remove: (
          <div className="bg-error-base rounded-full flex justify-center items-center border-2 border-white-0 dark:border-white-0 w-6 h-6">
            <Icon name="close-line" color="white" size={14} />
          </div>
        ),
        notification: (
          <div className="bg-error-base rounded-full flex justify-center items-center border-2 border-white-0 dark:border-white-0 w-3 h-3" />
        ),
      };
      return iconStyles[status] || null;
    },
  },
  bottom: {
    container:
      'absolute bottom-0 end-0 flex justify-center items-center transform translate-x-[6px] w-8 h-8',
    icon: (status: BottomStatus, companyIcon?: React.ReactNode) => {
      const statusMap = {
        online: (
          <span className="bg-white-0 dark:bg-white-0-dark flex justify-center items-center w-5 h-5 rounded-full shadow-[0_2px_4px_0_#1B1C1D0A]">
            <span className="w-3 h-3 rounded-full bg-success-base dark:bg-success-base-dark"></span>
          </span>
        ),
        offline: (
          <span className="bg-white-0 dark:bg-white-0-dark flex justify-center items-center w-5 h-5 rounded-full shadow-[0_2px_4px_0_#1B1C1D0A]">
            <span className="w-3 h-3 rounded-full bg-faded-base dark:bg-faded-base-dark"></span>
          </span>
        ),
        busy: (
          <span className="bg-white-0 dark:bg-white-0-dark flex justify-center items-center w-5 h-5 rounded-full shadow-[0_2px_4px_0_#1B1C1D0A]">
            <span className="w-3 h-3 rounded-full bg-error-base dark:bg-error-base-dark"></span>
          </span>
        ),
        away: (
          <span className="bg-white-0 dark:bg-white-0-dark flex justify-center items-center w-5 h-5 rounded-full shadow-[0_2px_4px_0_#1B1C1D0A]">
            <span className="w-3 h-3 rounded-full bg-feature-base dark:bg-feature-base-dark"></span>
          </span>
        ),
        company: companyIcon,
      };
      return statusMap[status] || null;
    },
  },
};

export const topStatusStyles = statusStyles.top;
export const bottomStatusStyles = statusStyles.bottom;
