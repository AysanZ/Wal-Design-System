import React, { Suspense } from 'react';
import { IconProps, getIconComponent } from '.';

/**
 * Icons are crucial to visual communication, utilizing simple symbols to quickly convey
 * ideas that transcend language. In any design system, icons serve as essential components
 * for intuitive user interfaces.
 *
 * Our design system integrates RemixIcon—a robust collection of over 2700 icons crafted by
 * Jimmy Cheung and Wendy Gao. These icons are neatly categorized for easy access, and come
 * in two styles: line and filled, allowing flexibility to suit your design needs.
 *
 * Icons streamline complex ideas, enabling communication without the need for lengthy text.
 * The RemixIcon set, under the Apache License, offers free use for both commercial and
 * non-commercial projects.
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  className = '',
  ...props
}) => {
  const IconComponent = getIconComponent(name);
  if (!IconComponent) {
    return <div></div>;
  }
  return (
    <Suspense fallback={<div>Loading icon...</div>}>
      <IconComponent
        {...props}
        color={color}
        size={size}
        className={className}
      />
    </Suspense>
  );
};
