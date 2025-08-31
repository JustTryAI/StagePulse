import { useEffect, useRef, useState } from 'react';
import { TimerKind } from '../types';
import { getSyncDelay, warpedNow } from '../utils/sync';

// Generic timer hook supporting countdown, countup, and clock with optional scheduling
// Persists timer progress to localStorage so timers remember state across reloads/offline
export const useTimer = (
  id: string,
  kind: TimerKind,
  duration: number = 0,
  startAt?: number,
) => {
  const storageKey = `timer-progress-${id}`;
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoStarted = useRef(false);

  // Load persisted progress
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as {
          elapsed: number;
          running: boolean;
          timestamp: number;
        };
        let e = saved.elapsed || 0;
        if (saved.running) {
          e += warpedNow() - saved.timestamp;
        }
        setElapsed(e);
        setRunning(saved.running);
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  // Persist progress
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ elapsed, running, timestamp: warpedNow() }),
      );
    } catch {
      // ignore
    }
  }, [elapsed, running, storageKey]);

  // reset auto-start flag if schedule changes
  useEffect(() => {
    autoStarted.current = false;
  }, [startAt]);

  // start the timer at a scheduled time if provided
  useEffect(() => {
    if (startAt === undefined || running || autoStarted.current) return;
    const now = warpedNow();
    const startTime = startAt + getSyncDelay();
    if (startTime <= now) {
      setRunning(true);
      autoStarted.current = true;
    } else {
      const timeout = setTimeout(() => {
        setRunning(true);
        autoStarted.current = true;
      }, startTime - now);
      return () => clearTimeout(timeout);
    }
  }, [startAt, running]);

  useEffect(() => {
    if (!running && kind !== 'clock') return;
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
    millis = warpedNow();
  }

  return { millis, running, start, pause, reset };
};
