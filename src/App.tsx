import React from 'react';
import Timer from './components/Timer';
import { TimersProvider, useTimers } from './context/TimersContext';
import { defaultPresets } from './presets';

const TimersApp: React.FC = () => {
  const { state, dispatch } = useTimers();
  
  return (
    <div>
      <h1>StagePulse</h1>
      <div>
        {defaultPresets.map((p) => (
          <button key={p.title} onClick={() => dispatch({ type: 'add', payload: p })}>
            Add {p.title}
          </button>
        ))}
      </div>
      {state.timers.map((t) => (
        <Timer key={t.id} config={t} />
      ))}
    </div>
  );
};

const App: React.FC = () => (
  <TimersProvider>
    <TimersApp />
  </TimersProvider>
);

export default App;
