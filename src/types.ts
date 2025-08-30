export type TimerKind = 'countdown' | 'countup' | 'clock';

export interface TimerConfig {
  id: string;
  title: string;
  kind: TimerKind;
  duration?: number; // used for countdown timers
}
