import { AddTimerPayload } from './context/TimersContext';

export type Preset = Omit<AddTimerPayload, 'title'> & { titleKey: string };

// Default timer presets for quick setup
export const defaultPresets: Preset[] = [
  { titleKey: 'preset.countdown1m', kind: 'countdown', duration: 60_000 },
  { titleKey: 'preset.countdown5m', kind: 'countdown', duration: 5 * 60_000 },
  { titleKey: 'preset.countup', kind: 'countup' },
  { titleKey: 'preset.clock', kind: 'clock' },
];
