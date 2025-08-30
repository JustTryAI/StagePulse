import React, { useState } from 'react';
import { TimerKind } from '../types';
import { useTimers } from '../context/TimersContext';

const TimerForm: React.FC = () => {
  const { dispatch } = useTimers();
  const [title, setTitle] = useState('');
  const [kind, setKind] = useState<TimerKind>('countdown');
  const [duration, setDuration] = useState(60);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'add', payload: { title, kind, duration: kind === 'countdown' ? duration * 1000 : undefined } });
    setTitle('');
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '1rem' }}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={kind} onChange={(e) => setKind(e.target.value as TimerKind)}>
        <option value="countdown">Countdown</option>
        <option value="countup">Count Up</option>
        <option value="clock">Clock</option>
      </select>
      {kind === 'countdown' && (
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          min={1}
        />
      )}
      <button type="submit">Add Timer</button>
    </form>
  );
};

export default TimerForm;
