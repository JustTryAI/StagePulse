import React from 'react';
import { useTimers } from '../context/TimersContext';
import Timer from './Timer';

const TimerList: React.FC = () => {
  const { state, dispatch } = useTimers();

  if (state.timers.length === 0) {
    return <p>No timers added.</p>;
  }

  return (
    <div>
      {state.timers.map((t) => (
        <div key={t.id}>
          <Timer config={t} />
          <button onClick={() => dispatch({ type: 'remove', id: t.id })}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default TimerList;
