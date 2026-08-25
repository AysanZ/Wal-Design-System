import { describe, it, expect } from 'vitest';
import preview from './preview';
import { GLOBALS } from './globals';

/**
 * Storybook 8.3 renamed `globals` to `initialGlobals` and dropped
 * `globalTypes[].defaultValue`. Both old spellings are ignored without any
 * warning — the toolbar still renders, it just never seeds a value, so every
 * decorator reads `undefined` and silently falls back. Pin the current API.
 */
describe('preview config', () => {
  it('seeds globals through initialGlobals', () => {
    expect(preview.initialGlobals).toEqual({ locale: 'en', theme: 'light' });
    expect(preview).not.toHaveProperty('globals');
  });

  it('declares a toolbar for every seeded global', () => {
    for (const key of Object.keys(preview.initialGlobals ?? {})) {
      expect(GLOBALS).toHaveProperty(key);
      const entry = GLOBALS[key as keyof typeof GLOBALS];
      expect(entry.toolbar.items.length).toBeGreaterThan(1);
    }
  });

  it('does not rely on the removed defaultValue key', () => {
    for (const entry of Object.values(GLOBALS)) {
      expect(entry).not.toHaveProperty('defaultValue');
    }
  });
});
