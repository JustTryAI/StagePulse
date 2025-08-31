import React from 'react';
import { useMessages } from '../context/MessagesContext';
import { messagePresets, MessagePreset } from '../messagePresets';
import { useTranslation } from 'react-i18next';

const Messages: React.FC = () => {
  const { state, send, clear } = useMessages();
  const { t } = useTranslation();

  const handlePreset = (preset: MessagePreset) => {
    let values: Record<string, string> | undefined;
    if (preset.placeholders) {
      values = {};
      for (const ph of preset.placeholders) {
        const v = window.prompt(t(`messages.placeholder.${ph}`) || ph, '');
        if (v) values[ph] = v;
      }
    }
    const text = t(preset.key, values);
    send(text);
  };

  return (
    <div>
      <h2>{t('messages.title')}</h2>
      <div>
        {messagePresets.map((p) => {
          const defaults: Record<string, string> = {};
          p.placeholders?.forEach((ph) => {
            defaults[ph] = t(`messages.placeholder.${ph}`);
          });
          return (
            <button key={p.key} onClick={() => handlePreset(p)}>
              {t(p.key, defaults)}
            </button>
          );
        })}
        <button onClick={clear}>{t('messages.clear')}</button>
      </div>
      {state.current && <p>{state.current.text}</p>}
    </div>
  );
};

export default Messages;
