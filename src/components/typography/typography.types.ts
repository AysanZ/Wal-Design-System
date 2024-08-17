import { HTMLAttributes, ElementType } from 'react';
import { variantClasses } from './typography.styles';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: keyof typeof variantClasses;
  dir?: 'ltr' | 'rtl';
  as?: ElementType; 
}
