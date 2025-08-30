import { timerReducer, initialState } from './TimersContext';

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
});
