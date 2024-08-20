import { TypographyProps } from './typography.types';
import { defaultTextColor, variantClasses } from './typography.styles';
import clsx from 'clsx';

/**
 * Typography is a vital component of any design system. It’s the art of arranging text
 * in a visually appealing and communicative way, forming a consistent visual identity
 * across all elements.
 *
 * At WalUI, we prioritize typography to enhance the user experience. We’ve chosen Roboto
 * for English and Dana for Farsi—both selected for their balance between readability and
 * aesthetics. These fonts make your text clear, elegant, and comfortable to read.
 *
 * Our typography guidelines emphasize consistency and legibility across devices and
 * platforms, ensuring that your content remains easy to understand while presenting a
 * cohesive visual identity.
 */
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
