import { customizationReducer, defaultCustomizationState } from './CustomizationContext';

describe('customizationReducer', () => {
  it('toggles progress bar', () => {
    const state = customizationReducer(defaultCustomizationState, { type: 'toggleProgressBar' });
    expect(state.showProgressBar).toBe(true);
  });
});
