import React from 'react';
import TimerDisplay from '../components/TimerDisplay';
import { useMessages } from '../context/MessagesContext';

// Viewer page listens to updates (placeholder without backend)
const Viewer: React.FC = () => {
  const [time, setTime] = React.useState(0);

  // Placeholder effect to demonstrate time-of-day
  React.useEffect(() => {
    const id = setInterval(() => setTime(Date.now() % 60000), 1000);
    return () => clearInterval(id);
  }, []);

  const { state } = useMessages();

  return (
    <div>
      <TimerDisplay millis={time} />
      {state.current && <p>{state.current.text}</p>}
    </div>
  );
};

export default Viewer;
