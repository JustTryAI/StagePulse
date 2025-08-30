import React from 'react';

type Props = {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  running: boolean;
};

const TimerControls: React.FC<Props> = ({ onStart, onPause, onReset, running }) => (
  <div style={{ marginTop: '1rem' }}>
    {running ? (
      <button onClick={onPause}>Pause</button>
    ) : (
      <button onClick={onStart}>Start</button>
    )}
    <button onClick={onReset} style={{ marginLeft: '0.5rem' }}>
      Reset
    </button>
  </div>
);

export default TimerControls;
