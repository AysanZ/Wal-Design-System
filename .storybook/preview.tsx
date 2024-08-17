import type { Preview } from '@storybook/react';
import { withGlobalSettings } from './decorators';
import { GLOBALS } from './globals';
import '@styles/globals.css';

const preview: Preview = {
  parameters: {
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
  decorators: [withGlobalSettings],
};

export default preview;
