import React from 'react';
import { TimerConfig } from '../types';
import { useTimer } from '../hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';

// Renders a single timer with display and controls
const Timer: React.FC<{ config: TimerConfig }> = ({ config }) => {
  const { millis, running, start, pause, reset } = useTimer(
    config.id,
    config.kind,
    config.duration,
    config.startAt
  );

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>{config.title}</h2>
      <TimerDisplay millis={millis} />
      {config.kind !== 'clock' && (
        <TimerControls onStart={start} onPause={pause} onReset={reset} running={running} />
      )}
    </div>
  );
};

export default Timer;
