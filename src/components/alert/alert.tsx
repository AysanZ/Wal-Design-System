import { Icon } from '@components/icon';
import { AlertProps } from './alert.types';
import clsx from 'clsx';
import { Typography } from '@components/typography';

const Alert: React.FC<AlertProps> = ({
  status,
  style = 'filled',
  size = 'small',
  icon = false,
  iconName,
  linkButton = false,
  doubleLink = false,
  dismissIcon = false,
  title = 'Insert your alert title here!',
  description = 'Insert the alert description here. It would look better as two lines of text.',
}) => {
  const statusIcons = {
    error: (
      <Icon
        name="error-warning-fill"
        size={16}
        className={clsx(
          style === 'filled'
            ? 'text-white-0 dark:text-white-0'
            : 'text-error-base dark:text-error-base-dark',
        )}
      />
    ),
    warning: (
      <Icon
        name="alert-fill"
        size={16}
        className={clsx(
          style === 'filled'
            ? 'text-white-0 dark:text-white-0'
            : 'text-warning-base dark:text-warning-base-dark',
        )}
      />
    ),
    success: (
      <Icon
        name="checkbox-circle-fill"
        size={16}
        className={clsx(
          style === 'filled'
            ? 'text-white-0 dark:text-white-0'
            : 'text-success-base dark:text-success-base-dark',
        )}
      />
    ),
    info: (
      <Icon
        name="information-fill"
        size={16}
        className={clsx(
          style === 'filled'
            ? 'text-white-0 dark:text-white-0'
            : 'text-information-base dark:text-information-base-dark',
        )}
      />
    ),
    feature: (
      <Icon
        name="magic-fill"
        size={16}
        className={clsx(
          style === 'filled'
            ? 'text-white-0 dark:text-white-0'
            : 'text-faded-base dark:text-faded-base-dark',
        )}
      />
    ),
  };

  return (
    <div
      className={clsx(
        'flex justify-between items-start flex-grow-0 flex-shrink-0',
        size === 'x-small'
          ? 'p-2'
          : size === 'small'
            ? 'px-[10px] py-2'
            : 'p-[14px] pb-4',
        size === 'large' ? 'rounded-xl gap-3' : 'rounded-lg gap-8',
        style === 'stroke' &&
          'bg-white-0 dark:bg-white-0-dark border border-soft-200 dark:border-soft-200-dark shadow-[0px_16px_32px_-12px_#0E121B1A]',
        status === 'error'
          ? style === 'filled'
            ? 'bg-error-base dark:bg-error-base-dark'
            : style === 'light'
              ? 'bg-error-light dark:bg-error-light-dark'
              : style === 'lighter'
                ? 'bg-error-lighter dark:bg-error-lighter-dark'
                : ''
          : status === 'warning'
            ? style === 'filled'
              ? 'bg-warning-base dark:bg-warning-base-dark'
              : style === 'light'
                ? 'bg-warning-light dark:bg-warning-light-dark'
                : style === 'lighter'
                  ? 'bg-warning-lighter dark:bg-warning-lighter-dark'
                  : ''
            : status === 'success'
              ? style === 'filled'
                ? 'bg-success-base dark:bg-success-base-dark'
                : style === 'light'
                  ? 'bg-success-light dark:bg-success-light-dark'
                  : style === 'lighter'
                    ? 'bg-success-lighter dark:bg-success-lighter-dark'
                    : ''
              : status === 'info'
                ? style === 'filled'
                  ? 'bg-information-base dark:bg-information-base-dark'
                  : style === 'light'
                    ? 'bg-information-light dark:bg-information-dark'
                    : style === 'lighter'
                      ? 'bg-information-lighter dark:bg-information-lighter-dark'
                      : ''
                : status === 'feature'
                  ? style === 'filled'
                    ? 'bg-faded-base dark:bg-faded-base-dark'
                    : style === 'light'
                      ? 'bg-faded-light dark:bg-faded-light-dark'
                      : style === 'lighter'
                        ? 'bg-faded-lighter dark:bg-faded-lighter-dark'
                        : ''
                  : '',
      )}
    >
      {icon && (
        <span className="w-4 h-4">
          {iconName ? <Icon name={iconName} /> : statusIcons[status]}
        </span>
      )}
      <div
        className={clsx('flex flex-col justify-start items-start gap-[10px]')}
      >
        <div className="flex flex-col justify-start items-start gap-1">
          <Typography
            as={'header'}
            variant={
              size === 'x-small'
                ? 'paragraph-xsmall'
                : size === 'small'
                  ? 'paragraph-small'
                  : size === 'large'
                    ? 'label-small'
                    : 'paragraph-small'
            }
            className={clsx(
              style === 'filled'
                ? 'text-static-white'
                : 'text-strong-950 dark:text-strong-950-dark',
              'break-words whitespace-normal',
            )}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              as={'p'}
              variant="paragraph-small"
              className={clsx(
                style === 'filled'
                  ? 'text-static-white'
                  : 'text-strong-950 dark:text-strong-950-dark',
                'break-words whitespace-normal',
              )}
            >
              {description}
            </Typography>
          )}
        </div>
        {(description || size === 'large') && (
          <div className="w-full flex justify-start items-start gap-2"></div>
        )}
      </div>
    </div>
  );
};

export default Alert;
