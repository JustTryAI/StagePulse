import React from 'react';
import TimerDisplay from '../components/TimerDisplay';
import { useMessages } from '../context/MessagesContext';
import { useCustomization } from '../context/CustomizationContext';

// Viewer page listens to updates (placeholder without backend)
const Viewer: React.FC = () => {
  const [time, setTime] = React.useState(0);
  const duration = 60000;

  // Placeholder effect to demonstrate time-of-day
  React.useEffect(() => {
    const id = setInterval(() => setTime(Date.now() % duration), 1000);
    return () => clearInterval(id);
  }, [duration]);

  const { state: msgState } = useMessages();
  const { state } = useCustomization();
  const progress = time / duration;

  return (
    <div
      style={{
        backgroundColor: state.backgroundColor,
        color: state.themeColor,
        fontFamily: state.fontFamily,
        transform: state.mirror ? 'scaleX(-1)' : undefined,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {state.showTimer && <TimerDisplay millis={time} />}
      {state.showMessage && msgState.current && <p>{msgState.current.text}</p>}
      {state.showProgressBar && (
        <div
          style={{
            width: '80%',
            height: '10px',
            background: '#555',
            marginTop: '1rem',
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              background: state.themeColor,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Viewer;
