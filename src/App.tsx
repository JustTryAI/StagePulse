import React from 'react';
import Timer from './components/Timer';
import { TimersProvider, useTimers } from './context/TimersContext';
import { AuthProvider } from './context/AuthContext';
import { defaultPresets } from './presets';
import { useTranslation } from 'react-i18next';

const TimersApp: React.FC = () => {
  const { state, dispatch } = useTimers();
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('title')}</h1>
      <div>
        <button onClick={() => i18n.changeLanguage('en')}>{t('language.en')}</button>
        <button onClick={() => i18n.changeLanguage('es')}>{t('language.es')}</button>
      </div>
      <div>
        {defaultPresets.map((p) => {
          const title = t(p.titleKey);
          return (
            <button
              key={p.titleKey}
              onClick={() => dispatch({ type: 'add', payload: { ...p, title } })}
            >
              {t('addPreset', { title })}
            </button>
          );
        })}
      </div>
      {state.timers.map((t) => (
        <Timer key={t.id} config={t} />
      ))}
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <TimersProvider>
      <TimersApp />
    </TimersProvider>
  </AuthProvider>
);

export default App;
