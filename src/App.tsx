import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  return (
    <main
      className={i18n.language === 'fa' ? 'font-farsi' : 'font-english'}
    ></main>
  );
}

export default App;
