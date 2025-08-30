import React, { createContext, useContext, useReducer } from 'react';
import { TimerConfig, TimerKind } from '../types';

export interface AddTimerPayload {
  title: string;
  kind: TimerKind;
  duration?: number;
  startAt?: number;
}

type Action =
  | { type: 'add'; payload: AddTimerPayload }
  | { type: 'remove'; id: string }
  | { type: 'schedule'; id: string; startAt: number };

export interface TimersState {
  timers: TimerConfig[];
}

export const initialState: TimersState = { timers: [] };

export function timerReducer(state: TimersState, action: Action): TimersState {
  switch (action.type) {
    case 'add': {
      const id = Date.now().toString();
      const newTimer: TimerConfig = {
        id,
        title: action.payload.title,
        kind: action.payload.kind,
        duration: action.payload.duration,
        startAt: action.payload.startAt,
      };
      return { timers: [...state.timers, newTimer] };
    }
    case 'remove':
      return { timers: state.timers.filter((t) => t.id !== action.id) };
    case 'schedule':
      return {
        timers: state.timers.map((t) =>
          t.id === action.id ? { ...t, startAt: action.startAt } : t
        ),
      };
    default:
      return state;
  }
}

const TimersContext = createContext<{
  state: TimersState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const TimersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  return <TimersContext.Provider value={{ state, dispatch }}>{children}</TimersContext.Provider>;
};

export function useTimers() {
  return useContext(TimersContext);
}
