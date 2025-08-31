import { setTimeWarp, warpedNow } from './sync';

describe('time warp', () => {
  beforeEach(() => {
    // simple localStorage mock
    const store: Record<string, string> = {};
    (global as any).localStorage = {
      getItem: (key: string) => (key in store ? store[key] : null),
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        for (const k of Object.keys(store)) delete store[k];
      },
    };
  });

  it('warpedNow applies stored offset', () => {
    const base = 1000;
    const spy = jest.spyOn(Date, 'now').mockReturnValue(base);
    setTimeWarp(500);
    expect(warpedNow()).toBe(base + 500);
    spy.mockRestore();
  });
});
