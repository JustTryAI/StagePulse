export type TimerKind = 'countdown' | 'countup' | 'clock';

// Role-based authentication roles
export type Role = 'controller' | 'viewer' | 'moderator' | 'operator';

export interface TimerConfig {
  id: string;
  title: string;
  kind: TimerKind;
  duration?: number; // used for countdown timers
  startAt?: number; // optional start time in ms for scheduling
}

// Simple message structure for messaging system
export interface Message {
  text: string;
  createdAt: number;
}
