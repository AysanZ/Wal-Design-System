export const GLOBALS = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'circlehollow',
      dynamicTitle: true,
      items: [
        { value: 'light', title: 'Light Mode' },
        { value: 'dark', title: 'Dark Mode' },
      ],
    },
  },
  locale: {
    name: 'Locale',
    description: 'Global locale for components',
    toolbar: {
      icon: 'globe',
      dynamicTitle: true,
      items: [
        { value: 'en', title: 'English' },
        { value: 'fa', title: 'Farsi' },
      ],
    },
  },
};
