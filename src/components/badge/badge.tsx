import { useMemo } from 'react';
import clsx from 'clsx';
import { Typography } from '@components/typography';
import {
  baseStyles,
  sizeStyles,
  getBadgeStyles,
  getDotIconColor,
  getIconContainerClass,
  getDotClass,
  typographyStyles,
} from './badge.styles';
import { BadgeProps } from './badge.types';

export const Badge: React.FC<BadgeProps> = ({
  type = 'basic',
  style = 'filled',
  color = 'gray',
  size = 'medium',
  number = false,
  disabled = false,
  icon,
  label,
  number_label,
  className,
}) => {
  const badgeClass = useMemo(
    () => getBadgeStyles(style, color, disabled),
    [style, color, disabled],
  );

  const dotIconClass = useMemo(
    () => getDotIconColor(style, color, disabled),
    [style, color, disabled],
  );

  const content = number ? number_label : label;

  return (
    <div className={clsx(baseStyles, sizeStyles, badgeClass, className)}>
      {/* Start Icon or Dot */}
      {(type === 'start-icon' || type === 'with-dot') && (
        <span className={getIconContainerClass(size)}>
          {type === 'with-dot' ? (
            <div className={getDotClass(dotIconClass)} />
          ) : (
            icon && <span className="text-inherit">{icon}</span>
          )}
        </span>
      )}

      {/* Text Content */}
      {content !== undefined && (
        <Typography
          variant={size === 'medium' ? 'label-xsmall' : 'subheading-2xsmall'}
          className={clsx(typographyStyles)}
        >
          {content}
        </Typography>
      )}

      {/* End Icon */}
      {type === 'end-icon' && icon && (
        <span className={getIconContainerClass(size)}>{icon}</span>
      )}
    </div>
  );
};
