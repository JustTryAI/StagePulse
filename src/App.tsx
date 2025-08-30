import React from 'react';
import { TimersProvider } from './context/TimersContext';
import TimerForm from './components/TimerForm';
import TimerList from './components/TimerList';

// App wraps timer components in provider
const App: React.FC = () => {
  return (
    <TimersProvider>
      <div>
        <h1>StagePulse</h1>
        <TimerForm />
        <TimerList />
      </div>
    </TimersProvider>
  );
};

export default App;
