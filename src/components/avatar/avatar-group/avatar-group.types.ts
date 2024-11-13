import { Size } from '@components/avatar';

interface AvatarData {
  firstName: string;
  lastName: string;
  imageSrc?: string;
  icon?: boolean;
  customIcon?: React.ReactNode;
  onImageError?: () => void;
  bgColor?: string;
}

export interface AvatarGroupProps {
  size: Size;
  showMore?: boolean;
  editNumber?: number;
  avatarData: AvatarData[];
  className?: string;
}
