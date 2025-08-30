import { useEffect, useRef, useState } from 'react';
import { TimerKind } from '../types';

// Generic timer hook supporting countdown, countup, and clock with optional scheduling
export const useTimer = (kind: TimerKind, duration: number = 0, startAt?: number) => {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // start the timer at a scheduled time if provided
  useEffect(() => {
    if (startAt === undefined || running) return;
    const now = Date.now();
    if (startAt <= now) {
      setRunning(true);
    } else {
      const timeout = setTimeout(() => setRunning(true), startAt - now);
      return () => clearTimeout(timeout);
    }
  }, [startAt, running]);

  useEffect(() => {
    if (!running || kind === 'clock') return;
    intervalRef.current = setInterval(() => {
      setElapsed((e) => e + 1000);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, kind]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setElapsed(0);
  };

  let millis = 0;
  if (kind === 'countdown') {
    millis = Math.max(0, duration - elapsed);
  } else if (kind === 'countup') {
    millis = elapsed;
  } else {
    millis = Date.now();
  }

  return { millis, running, start, pause, reset };
};
