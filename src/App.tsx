import React from 'react';
import Timer from './components/Timer';
import { TimerConfig } from './types';

const initialTimers: TimerConfig[] = [
  { id: 't1', title: 'Countdown 5m', kind: 'countdown', duration: 5 * 60 * 1000 },
  { id: 't2', title: 'Count Up', kind: 'countup' },
  { id: 't3', title: 'Clock', kind: 'clock' }
];

// App renders multiple timers using configuration
const App: React.FC = () => {
  const [timers] = React.useState<TimerConfig[]>(initialTimers);

  return (
    <div>
      <h1>StagePulse</h1>
      {timers.map((t) => (
        <Timer key={t.id} config={t} />
      ))}
    </div>
  );
};

export default App;
