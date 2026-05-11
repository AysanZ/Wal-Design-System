import { ReactNode } from 'react';

export interface BadgeProps {
  type: Type;
  style: Style;
  color: Color;
  size: Size;
  number?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  label?: string;           // made optional when number=true
  number_label?: number;
  className?: string;
  // style prop from your raw file removed (we use Tailwind classes)
}

export type Type = 'basic' | 'start-icon' | 'end-icon' | 'with-dot';

export type Style = 'filled' | 'light' | 'lighter' | 'stroke';

export type Size = 'medium' | 'small';

export type Color =
  | 'gray'
  | 'red'
  | 'blue'
  | 'orange'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'sky'
  | 'pink'
  | 'teal';