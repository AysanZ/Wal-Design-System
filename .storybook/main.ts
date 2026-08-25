import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Serves public/ at the web root so /fonts/* resolves. The @font-face rules
  // pointed at /public/fonts/*, which 404s — Vite serves publicDir from /.
  staticDirs: ['../public'],
};
export default config;
