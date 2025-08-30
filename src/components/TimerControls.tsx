import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  running: boolean;
};

const TimerControls: React.FC<Props> = ({ onStart, onPause, onReset, running }) => {
  const { t } = useTranslation();
  return (
    <div style={{ marginTop: '1rem' }}>
      {running ? (
        <button onClick={onPause}>{t('controls.pause')}</button>
      ) : (
        <button onClick={onStart}>{t('controls.start')}</button>
      )}
      <button onClick={onReset} style={{ marginLeft: '0.5rem' }}>
        {t('controls.reset')}
      </button>
    </div>
  );
};

export default TimerControls;
