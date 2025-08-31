import React from 'react';
import { TimersProvider, useTimers } from './context/TimersContext';
import { AuthProvider } from './context/AuthContext';
import { MessagesProvider } from './context/MessagesContext';
import Messages from './components/Messages';
import { defaultPresets } from './presets';
import { useTranslation } from 'react-i18next';
import TimerForm from './components/TimerForm';
import TimerList from './components/TimerList';
import TimerImportExport from './components/TimerImportExport';

const TimersApp: React.FC = () => {
  const { dispatch } = useTimers();
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
      <TimerForm />
      <TimerList />
      <TimerImportExport />
      <Messages />
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <TimersProvider>
      <MessagesProvider>
        <TimersApp />
      </MessagesProvider>
    </TimersProvider>
  </AuthProvider>
);

export default App;
