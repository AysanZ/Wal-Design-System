import { TypographyProps } from './typography.types';
import { variantClasses } from './typography.styles';

export const Typography: React.FC<TypographyProps> = ({
  variant = 'paragraph-medium',
  color = 'text-neutral-900',
  align = 'text-left',
  lineHeight,
  children,
  ...props
}) => {
  const variantClass =
    variantClasses[variant] || variantClasses['paragraph-medium'];

  return (
    <div
      className={`${variantClass} ${color} ${align} ${lineHeight ? `leading-[${lineHeight}]` : ''}}`}
      {...props}
    >
      {children}
    </div>
  );
};
