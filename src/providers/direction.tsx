import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';

export type Direction = 'ltr' | 'rtl';

/** Scripts that read right-to-left. Extend as the system grows. */
const RTL_LANGUAGES = new Set(['fa', 'ar', 'he', 'ur', 'ps', 'ckb', 'dv']);

export function directionForLocale(locale: string): Direction {
  const base = locale.toLowerCase().split(/[-_]/)[0];
  return RTL_LANGUAGES.has(base) ? 'rtl' : 'ltr';
}

export interface DirectionContextValue {
  locale: string;
  dir: Direction;
}

const DirectionContext = createContext<DirectionContextValue>({
  locale: 'en',
  dir: 'ltr',
});

export interface DirectionProviderProps {
  children: ReactNode;
  /** BCP-47 tag, e.g. `'fa'`, `'fa-IR'`, `'en'`. */
  locale?: string;
  /** Override the direction inferred from `locale`. Rarely needed. */
  dir?: Direction;
  /** Mirror `lang`/`dir` onto `<html>`. Off when the theme is scoped. */
  attributeTarget?: 'document' | 'self';
}

export function DirectionProvider({
  children,
  locale = 'en',
  dir,
  attributeTarget = 'document',
}: DirectionProviderProps) {
  const resolvedDir = dir ?? directionForLocale(locale);

  useEffect(() => {
    if (attributeTarget !== 'document' || typeof document === 'undefined')
      return;
    document.documentElement.setAttribute('lang', locale);
    document.documentElement.setAttribute('dir', resolvedDir);
  }, [locale, resolvedDir, attributeTarget]);

  const value = useMemo<DirectionContextValue>(
    () => ({ locale, dir: resolvedDir }),
    [locale, resolvedDir],
  );

  return (
    <DirectionContext.Provider value={value}>
      {attributeTarget === 'self' ? (
        <div lang={locale} dir={resolvedDir}>
          {children}
        </div>
      ) : (
        children
      )}
    </DirectionContext.Provider>
  );
}

/**
 * Read the ambient direction. Only reach for this when CSS logical
 * properties genuinely can't express the layout — a JS-computed transform,
 * for instance. Anything expressible with `ms-*`/`me-*`/`start-*`/`end-*`
 * should stay in CSS so it keeps working inside a nested `dir` subtree.
 */
export function useDirection(): DirectionContextValue {
  return useContext(DirectionContext);
}
