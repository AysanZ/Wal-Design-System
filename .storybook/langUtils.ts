export const updateHtmlLang = (locale: string) => {
  document.documentElement.setAttribute('lang', locale);
  document.documentElement.setAttribute('dir', locale === 'fa' ? 'rtl' : 'ltr');
};
