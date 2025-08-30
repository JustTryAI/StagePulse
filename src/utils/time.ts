// Utility functions for timer math

/**
 * Format milliseconds as mm:ss or hh:mm:ss when over an hour
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const mmss = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  return hours > 0
    ? `${hours.toString().padStart(2, '0')}:${mmss}`
    : mmss;
}

/**
 * Adds seconds to milliseconds.
 */
export function addSeconds(ms: number, sec: number): number {
  return ms + sec * 1000;
}

