import { IconName } from '@components/icon';

export type AlertStatus = 'error' | 'warning' | 'success' | 'info' | 'feature';
export type AlertStyle = 'filled' | 'stroke' | 'light' | 'lighter';
export type AlertSize = 'x-small' | 'small' | 'large';

export interface AlertProps {
  status: AlertStatus;
  style?: AlertStyle;
  size?: AlertSize;
  icon?: boolean;
  iconName?: IconName;
  linkButton?: boolean;
  doubleLink?: boolean;
  dismissIcon?: boolean;
  title?: string;
  description?: string;
}
