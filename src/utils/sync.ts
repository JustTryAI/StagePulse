const SYNC_DELAY_KEY = 'sync-delay';
const TIME_WARP_KEY = 'time-warp-offset';

export function setSyncDelay(ms: number): void {
  try {
    localStorage.setItem(SYNC_DELAY_KEY, ms.toString());
  } catch {
    // ignore
  }
}

export function getSyncDelay(): number {
  try {
    const v = localStorage.getItem(SYNC_DELAY_KEY);
    return v ? parseInt(v, 10) : 0;
  } catch {
    return 0;
  }
}

export function setTimeWarp(offset: number): void {
  try {
    localStorage.setItem(TIME_WARP_KEY, offset.toString());
  } catch {
    // ignore
  }
}

export function getTimeWarp(): number {
  try {
    const v = localStorage.getItem(TIME_WARP_KEY);
    return v ? parseInt(v, 10) : 0;
  } catch {
    return 0;
  }
}

export function warpedNow(): number {
  return Date.now() + getTimeWarp();
}
