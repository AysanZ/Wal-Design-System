import * as RemixIcons from '@remixicon/react';
import React from 'react';

const iconPrefix = 'Ri';

const convertToPascalCase = (kebabCaseName: string): string => {
  return `${iconPrefix}${kebabCaseName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')}`;
};

type RemixIconsType = {
  [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const getIconComponent = (
  iconName: string,
): React.ComponentType<{
  color?: string;
  size?: number;
  className?: string;
}> | null => {
  const componentName = convertToPascalCase(iconName);
  return (RemixIcons as RemixIconsType)[componentName] || null;
};
