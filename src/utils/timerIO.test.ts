import { exportTimers, importTimers } from './timerIO';
import { TimerConfig } from '../types';

describe('timerIO', () => {
  const timers: TimerConfig[] = [
    { id: '1', title: 'A', kind: 'countdown', duration: 1000 },
    { id: '2', title: 'B', kind: 'countup' },
  ];

  it('exports and imports JSON', () => {
    const data = exportTimers(timers, 'json');
    const parsed = importTimers(data, 'json');
    expect(parsed).toEqual(timers);
  });

  it('exports and imports CSV', () => {
    const data = exportTimers(timers, 'csv');
    const parsed = importTimers(data, 'csv');
    expect(parsed).toEqual(timers);
  });

  it('handles commas and quotes in CSV titles', () => {
    const funky: TimerConfig[] = [
      { id: '3', title: 'Hello, "World"', kind: 'countdown', duration: 5000 },
    ];
    const data = exportTimers(funky, 'csv');
    const parsed = importTimers(data, 'csv');
    expect(parsed).toEqual(funky);
  });
});
