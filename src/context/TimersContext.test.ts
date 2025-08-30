import { timerReducer, initialState } from './TimersContext';
import { defaultPresets } from '../presets';

describe('timerReducer', () => {
  it('adds a timer', () => {
    const state = timerReducer(initialState, { type: 'add', payload: { title: 'Test', kind: 'countup' } });
    expect(state.timers).toHaveLength(1);
    expect(state.timers[0].title).toBe('Test');
  });

  it('removes a timer', () => {
    const added = timerReducer(initialState, { type: 'add', payload: { title: 'A', kind: 'countup' } });
    const id = added.timers[0].id;
    const removed = timerReducer(added, { type: 'remove', id });
    expect(removed.timers).toHaveLength(0);
  });

  it('schedules a timer', () => {
    const added = timerReducer(initialState, {
      type: 'add',
      payload: { title: 'Scheduled', kind: 'countdown', duration: 1000 },
    });
    const id = added.timers[0].id;
    const startAt = Date.now() + 5000;
    const scheduled = timerReducer(added, { type: 'schedule', id, startAt });
    expect(scheduled.timers[0].startAt).toBe(startAt);
  });
});
