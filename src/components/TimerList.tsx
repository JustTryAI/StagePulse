import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTimers } from '../context/TimersContext';
import Timer from './Timer';

const TimerList: React.FC = () => {
  const { state, dispatch } = useTimers();
  const { t } = useTranslation();

  if (state.timers.length === 0) {
    return <p>{t('timerList.empty')}</p>;
  }

  return (
    <div>
      {state.timers.map((timer) => (
        <div key={timer.id}>
          <Timer config={timer} />
          <button onClick={() => dispatch({ type: 'remove', id: timer.id })}>
            {t('timerList.remove')}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TimerList;
