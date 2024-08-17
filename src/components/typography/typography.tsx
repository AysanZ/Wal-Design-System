import { TypographyProps } from './typography.types';
import { defaultTextColor, variantClasses } from './typography.styles';
import clsx from 'clsx';

export const Typography: React.FC<TypographyProps> = ({
  variant = 'paragraph-medium',
  children,
  className,
  as: Component = 'div',
  ...props
}) => {
  const variantClass =
    variantClasses[variant] || variantClasses['paragraph-medium'];

  return (
    <Component
      className={clsx(defaultTextColor, variantClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
};
