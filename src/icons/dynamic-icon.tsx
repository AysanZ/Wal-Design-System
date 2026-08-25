import { Icon, type IconProps } from '../components/icon';
import { getIconComponent, isDirectionalIcon } from './registry';
import type { IconName } from './names';

export interface DynamicIconProps extends Omit<IconProps, 'icon' | 'children'> {
  /** Kebab-case Remix icon name, e.g. `'arrow-left-line'`. */
  name: IconName;
}

/**
 * String-addressed icon. Renders nothing for an unknown name rather than
 * throwing, so a bad value in CMS content cannot take a page down.
 *
 * `mirrored` defaults to auto-detection from the name: directional glyphs
 * flip in RTL, everything else stays put.
 */
export function DynamicIcon({ name, mirrored, ...rest }: DynamicIconProps) {
  const Component = getIconComponent(name);
  if (!Component) return null;

  return (
    <Icon
      icon={Component}
      mirrored={mirrored ?? isDirectionalIcon(name)}
      {...rest}
    />
  );
}
