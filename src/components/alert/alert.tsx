import { forwardRef, isValidElement } from 'react';
import {
  RiErrorWarningFill,
  RiAlertFill,
  RiCheckboxCircleFill,
  RiInformationFill,
  RiMagicFill,
  RiCloseLine,
} from '@remixicon/react';
import { cn } from '../../lib/cn';
import { Icon, type IconComponent } from '../icon';
import { Typography } from '../typography';
import {
  alertVariants,
  alertIconVariants,
  alertActionVariants,
} from './alert.styles';
import type { AlertProps, AlertStatus } from './alert.types';

/** Named imports, so only the five glyphs actually used get bundled. */
const STATUS_ICON: Record<AlertStatus, IconComponent> = {
  error: RiErrorWarningFill,
  warning: RiAlertFill,
  success: RiCheckboxCircleFill,
  info: RiInformationFill,
  feature: RiMagicFill,
};

const DEFAULT_URGENCY: Record<AlertStatus, 'assertive' | 'polite'> = {
  error: 'assertive',
  warning: 'assertive',
  success: 'polite',
  info: 'polite',
  feature: 'polite',
};

/**
 * Inline status message.
 *
 * ## Accessibility
 *
 * The previous version rendered a plain `<div>`, so an alert appearing after
 * a failed form submit was silent for screen-reader users — the single most
 * consequential thing an alert has to get right. It also rendered the title
 * inside `<header>`, which put a landmark in the middle of a form.
 *
 * This version sets `role="alert"` / `role="status"` and a matching
 * `aria-live` based on `status`, overridable via `urgency`. Set
 * `urgency="off"` for alerts that are present on first paint.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    status = 'info',
    appearance = 'filled',
    size = 'small',
    title,
    description,
    children,
    icon = true,
    actions,
    dismissible = false,
    onDismiss,
    dismissLabel = 'Dismiss',
    urgency,
    className,
    ...rest
  },
  ref,
) {
  const resolvedUrgency = urgency ?? DEFAULT_URGENCY[status];
  const titleVariant =
    size === 'x-small'
      ? 'paragraph-xsmall'
      : size === 'large'
        ? 'label-small'
        : 'paragraph-small';

  const renderIcon = () => {
    if (icon === false) return null;
    if (isValidElement(icon)) {
      return (
        <span className={alertIconVariants({ status, appearance })} aria-hidden>
          {icon}
        </span>
      );
    }
    return (
      <Icon
        icon={STATUS_ICON[status]}
        size={16}
        className={alertIconVariants({ status, appearance })}
      />
    );
  };

  return (
    <div
      ref={ref}
      role={resolvedUrgency === 'assertive' ? 'alert' : 'status'}
      aria-live={resolvedUrgency}
      data-status={status}
      className={cn(alertVariants({ status, appearance, size }), className)}
      {...rest}
    >
      <div className="flex flex-1 items-start gap-2">
        {renderIcon()}

        <div className="flex min-w-0 flex-1 flex-col items-start gap-2.5">
          <div className="flex flex-col items-start gap-1">
            <Typography
              as="span"
              variant={titleVariant}
              className="break-words text-inherit"
            >
              {title}
            </Typography>

            {description && (
              <Typography
                variant="paragraph-small"
                className="break-words text-inherit"
              >
                {description}
              </Typography>
            )}
          </div>

          {children}

          {actions && actions.length > 0 && (
            <div className="flex items-center gap-4">
              {actions.slice(0, 2).map((action) =>
                action.href ? (
                  <a
                    key={action.label}
                    href={action.href}
                    className={alertActionVariants({ appearance })}
                  >
                    {action.label}
                  </a>
                ) : (
                  <button
                    key={action.label}
                    type="button"
                    onClick={action.onClick}
                    className={alertActionVariants({ appearance })}
                  >
                    {action.label}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className={cn(
            'shrink-0 rounded-sm p-0.5 opacity-70 transition-opacity',
            'hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
            appearance === 'filled'
              ? 'focus-visible:outline-static-white'
              : 'focus-visible:outline-primary-base',
          )}
        >
          <Icon icon={RiCloseLine} size={16} />
        </button>
      )}
    </div>
  );
});
