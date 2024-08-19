import { IconName } from '@components/icon';

export interface AccordionProps {
  flipIcon?: boolean;
  title?: string | React.ReactNode;
  content?: string | React.ReactNode;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
  customExpandIcon?: IconName;
  customCollapseIcon?: IconName;
  hasIcon?: boolean;
  icon?: React.ReactNode;
}
