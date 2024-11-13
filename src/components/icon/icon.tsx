import React, { Suspense } from 'react';
import { IconProps, getIconComponent } from '.';


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
