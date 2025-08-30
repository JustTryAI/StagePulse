import { AddTimerPayload } from './context/TimersContext';

// Default timer presets for quick setup
export const defaultPresets: AddTimerPayload[] = [
  { title: 'Countdown 1m', kind: 'countdown', duration: 60_000 },
  { title: 'Countdown 5m', kind: 'countdown', duration: 5 * 60_000 },
  { title: 'Count Up', kind: 'countup' },
  { title: 'Clock', kind: 'clock' },
];
