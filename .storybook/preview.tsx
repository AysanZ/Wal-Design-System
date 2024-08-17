import type { Preview } from '@storybook/react';
import { withGlobalSettings } from './decorators';
import { GLOBALS } from './globals';
import '@styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globals: {
    locale: 'en',
    theme: 'light',
  },
  globalTypes: GLOBALS,
  tags: ['autodocs'],
  decorators: [withGlobalSettings],
};

export default preview;
