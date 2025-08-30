import React, { createContext, useContext, useReducer } from 'react';
import { TimerConfig, TimerKind } from '../types';

export interface AddTimerPayload {
  title: string;
  kind: TimerKind;
  duration?: number;
  startAt?: number;
  id?: string;
}

type Action =
  | { type: 'add'; payload: AddTimerPayload }
  | { type: 'remove'; id: string }
  | { type: 'schedule'; id: string; startAt: number }
  | { type: 'setAll'; timers: TimerConfig[] };

export interface TimersState {
  timers: TimerConfig[];
}

export const initialState: TimersState = { timers: [] };

export function timerReducer(state: TimersState, action: Action): TimersState {
  switch (action.type) {
    case 'add': {
      const id = action.payload.id || Date.now().toString();
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
    case 'setAll':
      return { timers: action.timers };
    default:
      return state;
  }
}

const TimersContext = createContext<{
  state: TimersState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const TimersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, localDispatch] = useReducer(timerReducer, initialState);

  // Expose dispatch that syncs with Firestore
  const dispatch: React.Dispatch<Action> = (action) => {
    switch (action.type) {
      case 'add': {
        const id = action.payload.id || Date.now().toString();
        localDispatch({ type: 'add', payload: { ...action.payload, id } });
        import('../services/timerSync').then(({ saveTimer }) =>
          saveTimer({ id, ...action.payload })
        );
        break;
      }
      case 'remove':
        localDispatch(action);
        import('../services/timerSync').then(({ removeTimer }) => removeTimer(action.id));
        break;
      case 'schedule':
        localDispatch(action);
        import('../services/timerSync').then(({ updateTimer }) =>
          updateTimer(action.id, { startAt: action.startAt })
        );
        break;
      default:
        localDispatch(action);
    }
  };

  // Listen to remote updates
  React.useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    import('../services/timerSync').then(({ listenTimers }) => {
      unsubscribe = listenTimers((timers) =>
        localDispatch({ type: 'setAll', timers })
      );
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return <TimersContext.Provider value={{ state, dispatch }}>{children}</TimersContext.Provider>;
};

export function useTimers() {
  return useContext(TimersContext);
}
