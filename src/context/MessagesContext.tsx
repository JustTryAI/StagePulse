import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Message } from '../types';

interface State {
  current: Message | null;
}

const initialState: State = { current: null };

type Action = { type: 'set'; message: Message | null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set':
      return { current: action.message };
    default:
      return state;
  }
}

interface ContextValue {
  state: State;
  send: (text: string) => void;
  clear: () => void;
}

const MessagesContext = createContext<ContextValue>({
  state: initialState,
  send: () => {},
  clear: () => {},
});

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const send = (text: string) => {
    const message: Message = { text, createdAt: Date.now() };
    dispatch({ type: 'set', message });
    import('../services/messageSync').then(({ sendMessage }) => sendMessage(message));
  };

  const clear = () => {
    dispatch({ type: 'set', message: null });
    import('../services/messageSync').then(({ clearMessage }) => clearMessage());
  };

  useEffect(() => {
    let unsub: (() => void) | undefined;
    import('../services/messageSync').then(({ listenMessage }) => {
      unsub = listenMessage((msg) => dispatch({ type: 'set', message: msg }));
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);

  return (
    <MessagesContext.Provider value={{ state, send, clear }}>
      {children}
    </MessagesContext.Provider>
  );
};

export function useMessages() {
  return useContext(MessagesContext);
}
