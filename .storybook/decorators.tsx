import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n/i18n';
import { updateHtmlLang } from './langUtils';
import type { Decorator } from '@storybook/react';
import '@styles/globals.css';

export const withGlobalSettings: Decorator = (Story, context) => {
  const locale = context.globals.locale || 'en';
  const theme = context.globals.theme || 'light';

  document.body.className =
    theme === 'dark' ? 'storybook-dark' : 'storybook-light';

  i18n.changeLanguage(locale);
  updateHtmlLang(locale);

  return (
    <I18nextProvider i18n={i18n}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div
          className={theme === 'dark' ? 'storybook-dark' : 'storybook-light'}
        >
          <Story />
        </div>
      </div>
    </I18nextProvider>
  );
};
