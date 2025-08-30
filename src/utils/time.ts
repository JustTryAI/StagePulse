// Utility functions for timer math

/**
 * Format milliseconds as mm:ss
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Adds seconds to milliseconds.
 */
export function addSeconds(ms: number, sec: number): number {
  return ms + sec * 1000;
}
