import { useState } from 'react';
import clsx from 'clsx';
import { AvatarProps } from './avatar.types';
import { Typography, variantClasses } from '@components/typography';
import { Icon } from '@components/icon';
import {
  avatarContainerStyles,
  avatarContentStyles,
  topStatusStyles,
  bottomStatusStyles,
  textStyle,
  sizeClasses,
} from './avatar.styles';

export const Avatar: React.FC<AvatarProps> = ({
  firstName,
  lastName,
  size,
  imageSrc,
  text,
  icon,
  topStatus = false,
  bottomStatus = false,
  onImageError,
  customIcon,
  companyIcon,
  bgColor,
  className,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    if (onImageError) onImageError();
  };

  const avatarContent = () => {
    if (imageSrc && !imageError) {
      return (
        <img
          src={imageSrc}
          alt={`${firstName} ${lastName}`}
          className={avatarContentStyles.img}
          onError={handleImageError}
        />
      );
    } else if (text) {
      return (
        <Typography
          variant={textStyle(size) as keyof typeof variantClasses}
          className={textStyle(bgColor)}
        >
          {text}
        </Typography>
      );
    } else if (customIcon) {
      return (
        <span className={avatarContentStyles.iconContainer}>{customIcon}</span>
      );
    } else if (icon) {
      return (
        <span className={avatarContentStyles.iconPosition(size)}>
          <Icon name="user-fill" color="white" size={sizeClasses[size]} />
        </span>
      );
    } else {
      return (
        <div
          className={clsx(avatarContentStyles.textFallback, textStyle(bgColor))}
        >
          {firstName || lastName
            ? size === 'xxxsmall' ||
              size === 'xxsmall' ||
              size === 'xsmall' ||
              !lastName
              ? firstName?.charAt(0).toUpperCase()
              : firstName?.charAt(0).toUpperCase() +
                lastName?.charAt(0).toUpperCase()
            : '-'}
        </div>
      );
    }
  };

  return (
    <div className={clsx(avatarContainerStyles(size), className)}>
      <div className={avatarContentStyles.background(bgColor)}>
        {avatarContent()}
      </div>

      {topStatus && (
        <div className={topStatusStyles.container}>
          {topStatusStyles.icon(topStatus)}
        </div>
      )}

      {bottomStatus && (
        <div className={bottomStatusStyles.container}>
          {bottomStatusStyles.icon(bottomStatus, companyIcon)}
        </div>
      )}
    </div>
  );
};
