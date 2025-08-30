import React, { useState } from 'react';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';

const App: React.FC = () => {
  const [duration, setDuration] = useState(5 * 60 * 1000); // 5 minutes
  const [remaining, setRemaining] = useState(duration);
  const [running, setRunning] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (running) {
      interval = setInterval(() => {
        setRemaining((prev) => Math.max(0, prev - 1000));
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [running]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setRemaining(duration);
  };

  return (
    <div>
      <h1>StagePulse</h1>
      <TimerDisplay millis={remaining} />
      <TimerControls onStart={start} onPause={pause} onReset={reset} running={running} />
    </div>
  );
};

export default App;
