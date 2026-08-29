import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { cn } from '../../lib/cn';
import { useId } from '../../hooks/use-id';
import { useControllableState } from '../../hooks/use-controllable-state';
import { useDirection } from '../../providers/direction';
import {
  tabsListVariants,
  tabsTriggerVariants,
  tabsDividerVariants,
  tabsContentVariants,
} from './tabs.styles';
import type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsDividerProps,
  TabsAppearance,
  TabsOrientation,
  TabsActivationMode,
} from './tabs.types';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
  appearance: TabsAppearance;
  orientation: TabsOrientation;
  activationMode: TabsActivationMode;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(component: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`<${component}> must be rendered inside <Tabs>.`);
  }
  return context;
}

/**
 * Tabbed navigation.
 *
 * ## Why the whole ARIA pattern, and not just styled buttons
 *
 * A row of buttons that swap a `<div>` is a tab menu to a sighted user and
 * nothing at all to anyone else. The pattern that makes it real is small but
 * has to be complete: `role="tablist"`, `aria-selected`, each tab pointing at
 * its panel through `aria-controls` and each panel back through
 * `aria-labelledby`, and **roving focus** — one Tab stop for the whole set,
 * arrow keys to move between tabs. Without the last part a keyboard user has
 * to press Tab five times to walk past a tab menu to reach the content it
 * describes.
 *
 * ## RTL
 *
 * Arrow keys follow the reading direction: `ArrowRight` moves to the *next*
 * tab in English and to the *previous* one in Persian, which is what a
 * Persian user's hand expects. Vertical tabs use Up and Down, which never
 * mirror.
 *
 * ## Activation
 *
 * `activationMode="automatic"` selects as focus arrives, per WAI-ARIA.
 * Switch to `manual` when a panel fetches: arrowing past four tabs should not
 * fire four requests.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    value: valueProp,
    defaultValue = '',
    onValueChange,
    appearance = 'list',
    orientation = 'horizontal',
    activationMode = 'automatic',
    className,
    children,
    ...rest
  },
  ref,
) {
  const baseId = useId();
  const [value, setValue] = useControllableState<string>({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const context = useMemo<TabsContextValue>(
    () => ({
      value,
      setValue,
      baseId,
      appearance,
      orientation,
      activationMode,
    }),
    [value, setValue, baseId, appearance, orientation, activationMode],
  );

  return (
    <TabsContext.Provider value={context}>
      <div
        ref={ref}
        data-orientation={orientation}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-col gap-4' : 'flex-row gap-4',
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

/**
 * The row (or column) of tabs.
 *
 * Purely presentational: the keyboard work lives on the triggers, because a
 * `tablist` must not be focusable — focus belongs on the tabs inside it, one
 * stop for the whole set.
 */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList(
    { label, stretch = false, className, children, ...rest },
    ref,
  ) {
    const { appearance, orientation } = useTabs('TabsList');

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label={label}
        aria-orientation={orientation}
        className={cn(
          tabsListVariants({ appearance, orientation, stretch }),
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/** One tab. */
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger(
    {
      value,
      startIcon,
      endIcon,
      badge,
      className,
      children,
      type,
      disabled,
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    const {
      value: selectedValue,
      setValue,
      baseId,
      appearance,
      orientation,
      activationMode,
    } = useTabs('TabsTrigger');
    const { dir } = useDirection();
    const selected = selectedValue === value;

    /**
     * Movement reads the tabs out of the DOM rather than keeping a registry:
     * a registry has to be kept in sync with conditional children, and going
     * stale is silent.
     */
    const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);

      const list = event.currentTarget.closest('[role="tablist"]');
      if (!list) return;
      const tabs = Array.from(
        list.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]:not([disabled])',
        ),
      );
      const currentIndex = tabs.indexOf(event.currentTarget);
      if (currentIndex === -1) return;

      // In RTL the visual "next" tab is to the left, so the horizontal keys
      // swap meaning. Vertical keys never mirror.
      const forward = dir === 'rtl' ? -1 : 1;
      const deltas: Record<string, number | undefined> =
        orientation === 'vertical'
          ? { ArrowDown: 1, ArrowUp: -1 }
          : { ArrowRight: forward, ArrowLeft: -forward };

      let nextIndex: number | undefined;
      if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else {
        const delta = deltas[event.key];
        if (delta !== undefined) {
          nextIndex = (currentIndex + delta + tabs.length) % tabs.length;
        }
      }

      if (nextIndex === undefined) return;
      event.preventDefault();

      const next = tabs[nextIndex];
      next.focus();
      if (activationMode === 'automatic') {
        setValue(next.getAttribute('data-value') ?? '');
      }
    };

    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        role="tab"
        id={`${baseId}-tab-${value}`}
        data-value={value}
        aria-selected={selected}
        aria-controls={`${baseId}-panel-${value}`}
        // Roving focus: one Tab stop for the whole set, arrows to move within
        // it. Otherwise a keyboard user presses Tab once per tab just to reach
        // the panel the tabs describe.
        tabIndex={selected ? 0 : -1}
        disabled={disabled}
        onClick={() => setValue(value)}
        onKeyDown={handleKeyDown}
        className={cn(
          tabsTriggerVariants({ appearance, orientation, selected }),
          className,
        )}
        {...rest}
      >
        {startIcon}
        {children}
        {badge}
        {endIcon}
      </button>
    );
  },
);

/** The panel for one tab. */
export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent(
    { value, keepMounted = false, className, children, ...rest },
    ref,
  ) {
    const { value: selectedValue, baseId } = useTabs('TabsContent');
    const selected = selectedValue === value;

    if (!selected && !keepMounted) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${baseId}-panel-${value}`}
        aria-labelledby={`${baseId}-tab-${value}`}
        hidden={!selected}
        // The panel takes focus when there is nothing focusable inside it, so
        // Tab from the selected tab lands on the content rather than skipping
        // past it. WAI-ARIA asks for exactly this.
        tabIndex={0}
        className={cn(tabsContentVariants(), className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/**
 * Figma's vertical `Divider` — a rule between groups of tabs.
 *
 * `role="separator"` inside a `tablist` is a legal, non-focusable child, so it
 * is announced as a group break rather than skipped or mistaken for a tab.
 */
export const TabsDivider = forwardRef<HTMLDivElement, TabsDividerProps>(
  function TabsDivider({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(tabsDividerVariants(), className)}
        {...rest}
      />
    );
  },
);
