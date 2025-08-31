import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTimers } from '../context/TimersContext';
import { exportTimers, importTimers } from '../utils/timerIO';

const TimerImportExport: React.FC = () => {
  const { state, dispatch } = useTimers();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = (format: 'json' | 'csv') => {
    const data = exportTimers(state.timers, format);
    const blob = new Blob([data], {
      type: format === 'json' ? 'application/json' : 'text/csv',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timers.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        const ext = file.name.split('.').pop()?.toLowerCase();
        const format = ext === 'csv' ? 'csv' : 'json';
        const timers = importTimers(text, format);
        dispatch({ type: 'setAll', timers });
        import('../services/timerSync').then(({ saveTimer }) => {
          timers.forEach((tmr) => saveTimer(tmr));
        });
      } catch (err) {
        console.error(err);
        alert(t('timerList.importError'));
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <button onClick={() => handleExport('json')}>{t('timerList.exportJson')}</button>
      <button onClick={() => handleExport('csv')}>{t('timerList.exportCsv')}</button>
      <button onClick={() => fileInputRef.current?.click()}>{t('timerList.import')}</button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.csv"
        style={{ display: 'none' }}
        onChange={onImportChange}
      />
    </div>
  );
};

export default TimerImportExport;
