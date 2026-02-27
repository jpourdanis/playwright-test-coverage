import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTranslation, Trans } from 'react-i18next';

const App = () => {
  const [backgroundColor, setBackgroundColor] = React.useState("#1abc9c")
  const { t, i18n } = useTranslation();

  const handleMakeTurquoise = () => {
    setBackgroundColor("#1abc9c")
  }
  const handleMakeRed = () => {
    setBackgroundColor("#e74c3c")
  }
  const handleMakeYellow = () => {
    setBackgroundColor("#f1c40f")
  }

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <div className="App">
      <main>
        <header className="App-header" style={{ backgroundColor }}>
          <div className="language-selector">
            <select aria-label={t('languageSelector')} value={i18n.resolvedLanguage} onChange={changeLanguage}>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="el">Ελληνικά</option>
            </select>
          </div>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{t('title')}</h1>
          <p>
            <Trans i18nKey="instructions">
              Edit <code>src/App.js</code> and save to reload.
            </Trans>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('learnReact')}
          </a>
          <span>{t('currentColor')} {backgroundColor}</span>
          <div className="btn-group-colors">
            <button onClick={handleMakeTurquoise}>{t('colors.turquoise')}</button>
            <button onClick={handleMakeRed}>{t('colors.red')}</button>
            <button onClick={handleMakeYellow}>{t('colors.yellow')}</button>
          </div>
        </header>
      </main>
    </div>
  );
}

export default App;