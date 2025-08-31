import React, { createContext, useContext, useReducer } from 'react';

export type CustomizationState = {
  themeColor: string;
  backgroundColor: string;
  fontFamily: string;
  showProgressBar: boolean;
  showTimer: boolean;
  showMessage: boolean;
  mirror: boolean;
};

export type CustomizationAction =
  | { type: 'setThemeColor'; color: string }
  | { type: 'setBackgroundColor'; color: string }
  | { type: 'setFontFamily'; font: string }
  | { type: 'toggleProgressBar' }
  | { type: 'toggleMirror' }
  | { type: 'toggleTimer' }
  | { type: 'toggleMessage' };

export const defaultCustomizationState: CustomizationState = {
  themeColor: '#ffffff',
  backgroundColor: '#000000',
  fontFamily: 'monospace',
  showProgressBar: false,
  showTimer: true,
  showMessage: true,
  mirror: false,
};

export function customizationReducer(
  state: CustomizationState,
  action: CustomizationAction
): CustomizationState {
  switch (action.type) {
    case 'setThemeColor':
      return { ...state, themeColor: action.color };
    case 'setBackgroundColor':
      return { ...state, backgroundColor: action.color };
    case 'setFontFamily':
      return { ...state, fontFamily: action.font };
    case 'toggleProgressBar':
      return { ...state, showProgressBar: !state.showProgressBar };
    case 'toggleMirror':
      return { ...state, mirror: !state.mirror };
    case 'toggleTimer':
      return { ...state, showTimer: !state.showTimer };
    case 'toggleMessage':
      return { ...state, showMessage: !state.showMessage };
    default:
      return state;
  }
}

const CustomizationContext = createContext<{
  state: CustomizationState;
  dispatch: React.Dispatch<CustomizationAction>;
}>({
  state: defaultCustomizationState,
  dispatch: () => {},
});

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(customizationReducer, defaultCustomizationState);
  return (
    <CustomizationContext.Provider value={{ state, dispatch }}>
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => useContext(CustomizationContext);

