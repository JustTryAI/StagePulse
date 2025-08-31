import './i18n';
import i18n from 'i18next';

describe('message presets i18n', () => {
  it('translates next message with placeholder in English', () => {
    i18n.changeLanguage('en');
    expect(i18n.t('messages.preset.next', { name: 'Alice' })).toBe('Next up: Alice');
  });

  it('translates next message with placeholder in Spanish', () => {
    i18n.changeLanguage('es');
    expect(i18n.t('messages.preset.next', { name: 'Carlos' })).toBe('A continuación: Carlos');
  });
});
