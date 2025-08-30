import React from 'react';
import TimerDisplay from '../components/TimerDisplay';

// Viewer page listens to updates (placeholder without backend)
const Viewer: React.FC = () => {
  const [time, setTime] = React.useState(0);

  // Placeholder effect to demonstrate time-of-day
  React.useEffect(() => {
    const id = setInterval(() => setTime(Date.now() % 60000), 1000);
    return () => clearInterval(id);
  }, []);

  return <TimerDisplay millis={time} />;
};

export default Viewer;
