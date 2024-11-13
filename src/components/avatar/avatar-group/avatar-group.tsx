import { Avatar, avatarContainerStyles } from '@components/avatar';
import { Typography } from '@components/typography';
import {
  avatarGroupContainerStyles,
  avatarStyles,
  avatarTransform,
  showMoreStyles,
  showMoreTransform,
  typographyStyles,
  typographyVariant,
  AvatarGroupProps,
} from '.';
import clsx from 'clsx';

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  size,
  editNumber,
  showMore,
  avatarData,
  className,
}) => {
  // TODO: Add tooltip for each avatar

  return (
    <div className={avatarGroupContainerStyles}>
      {avatarData.map((item, index) => (
        <Avatar
          key={index}
          firstName={item.firstName}
          lastName={item.lastName}
          size={size}
          bgColor={item.bgColor}
          imageSrc={item.imageSrc}
          icon={item.icon}
          customIcon={item.customIcon}
          onImageError={item.onImageError}
          className={clsx(avatarStyles, className)}
          style={avatarTransform(index, document.dir)}
        />
      ))}
      {showMore && (
        <div
          className={clsx(
            avatarContainerStyles(size),
            showMoreStyles,
            className,
          )}
          style={showMoreTransform(avatarData.length, document.dir)}
        >
          <Typography
            className={typographyStyles}
            variant={typographyVariant(size)}
          >
            +{editNumber}
          </Typography>
        </div>
      )}
    </div>
  );
};
