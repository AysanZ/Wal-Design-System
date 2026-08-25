import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { withGlobalSettings } from './decorators';

/**
 * The theme toolbar failed silently: the config used the pre-8.3 `globals`
 * key, so `context.globals.theme` arrived as `undefined`, the decorator fell
 * back to 'light', and nothing on screen ever changed. These assertions make
 * that failure loud.
 */
const renderWith = (globals: Record<string, string>) => {
  const Story = () => <span data-testid="story">story</span>;
  return render(<>{withGlobalSettings(Story, { globals } as never)}</>);
};

describe('withGlobalSettings', () => {
  afterEach(cleanup);

  it('puts the theme on <html> and on the story wrapper', () => {
    const { getByTestId } = renderWith({ theme: 'dark', locale: 'en' });
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(getByTestId('story').closest('[data-theme]')).toHaveAttribute(
      'data-theme',
      'dark',
    );
  });

  it('puts direction and language on <html> and on the wrapper', () => {
    const { getByTestId } = renderWith({ theme: 'light', locale: 'fa' });
    expect(document.documentElement).toHaveAttribute('dir', 'rtl');
    expect(document.documentElement).toHaveAttribute('lang', 'fa');

    const wrapper = getByTestId('story').closest('[data-theme]');
    expect(wrapper).toHaveAttribute('dir', 'rtl');
    expect(wrapper).toHaveAttribute('lang', 'fa');
  });

  it('falls back to light and ltr when a global is missing', () => {
    const { getByTestId } = renderWith({});
    expect(getByTestId('story').closest('[data-theme]')).toHaveAttribute(
      'data-theme',
      'light',
    );
    expect(document.documentElement).toHaveAttribute('dir', 'ltr');
  });
});
