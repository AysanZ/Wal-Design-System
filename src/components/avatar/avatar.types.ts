export interface AvatarProps {
  firstName: string;
  lastName: string;
  size: Size;
  imageSrc?: string;
  text?: string;
  icon?: boolean;
  customIcon?: React.ReactNode;
  topStatus?: TopStatus | false;
  bottomStatus?: BottomStatus | false;
  companyIcon?: React.ReactNode;
  onImageError?: () => void;
  bgColor?: string;
  className?: string;
}

export type Size =
  | 'xlarge'
  | 'large'
  | 'medium'
  | 'small'
  | 'xsmall'
  | 'xxsmall'
  | 'xxlarge'
  | 'xxxlarge'
  | 'xxxsmall';

export type TopStatus =
  | 'verified'
  | 'pin'
  | 'favorite'
  | 'add'
  | 'remove'
  | 'notification';

export type BottomStatus = 'online' | 'offline' | 'busy' | 'away' | 'company';
