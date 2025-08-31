import { collection, doc, onSnapshot, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebase';
import { Device } from '../types';

const devicesCol = collection(db, 'devices');

export function listenDevices(callback: (devices: Device[]) => void) {
  return onSnapshot(devicesCol, (snap) => {
    const devices = snap.docs.map((d) => d.data() as Device);
    callback(devices);
  });
}

export async function sendHeartbeat(deviceId: string) {
  const ref = doc(devicesCol, deviceId);
  const now = Date.now();
  await setDoc(
    ref,
    { id: deviceId, lastSeen: now, logs: arrayUnion({ ts: now, event: 'heartbeat' }) },
    { merge: true }
  );
}

export function startHeartbeat(deviceId: string, interval = 30000) {
  sendHeartbeat(deviceId);
  return setInterval(() => sendHeartbeat(deviceId), interval);
}

export function initHeartbeat() {
  let id = localStorage.getItem('deviceId');
  if (!id) {
    id = Math.random().toString(36).slice(2);
    localStorage.setItem('deviceId', id);
  }
  startHeartbeat(id);
}

export function exportLogs(device: Device) {
  const rows = device.logs?.map((l) => `${new Date(l.ts).toISOString()},${l.event}`) || [];
  const header = 'timestamp,event';
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${device.id}-logs.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
