import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type {
  TabsListVariantProps,
  TabsTriggerVariantProps,
} from './tabs.styles';

export type TabsAppearance = NonNullable<TabsListVariantProps['appearance']>;
export type TabsOrientation = NonNullable<TabsListVariantProps['orientation']>;
export type TabsSize = NonNullable<TabsTriggerVariantProps['size']>;

/**
 * `automatic` selects a tab as focus reaches it — the WAI-ARIA default, and
 * right when the panels are cheap. `manual` waits for Enter or Space, which is
 * what you want when a tab loads data: arrowing past four tabs should not fire
 * four requests.
 */
export type TabsActivationMode = 'automatic' | 'manual';

export interface TabsProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange' | 'defaultValue'
> {
  /** Selected tab. Controlled. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;

  appearance?: TabsAppearance;
  orientation?: TabsOrientation;
  size?: TabsSize;
  activationMode?: TabsActivationMode;
}

export interface TabsListProps extends ComponentPropsWithoutRef<'div'> {
  /** Accessible name for the tab set, e.g. `'تنظیمات حساب'`. */
  label?: string;
  /** Tabs share the width instead of hugging their labels. */
  stretch?: boolean;
}

export interface TabsTriggerProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'value'
> {
  /** Ties the tab to its panel. Must be unique within one `Tabs`. */
  value: string;
  startIcon?: ReactNode;
  /** Trailing node — a count, a `<Badge>`, a dot. */
  badge?: ReactNode;
}

export interface TabsContentProps extends ComponentPropsWithoutRef<'div'> {
  value: string;
  /**
   * Keep the panel mounted while hidden. Off by default: an unmounted panel
   * cannot run effects or hold stale data. Turn it on to preserve scroll
   * position, form state or a chart that is expensive to rebuild.
   */
  keepMounted?: boolean;
}
