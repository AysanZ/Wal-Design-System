import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

// Vitest replaces Jest here. Jest needed a second transform pipeline (babel
// or ts-jest) that had to be kept in sync with Vite's by hand; Vitest reuses
// the resolve/alias/plugin config above, so a component that builds also tests.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      css: false,
      include: ['src/**/*.test.{ts,tsx}', '.storybook/**/*.test.{ts,tsx}'],
    },
  }),
);
