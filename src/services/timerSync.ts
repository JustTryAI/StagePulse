import { collection, doc, onSnapshot, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { TimerConfig } from '../types';

// Listen to the timers collection and invoke callback on changes
export function listenTimers(callback: (timers: TimerConfig[]) => void) {
  const colRef = collection(db, 'timers');
  return onSnapshot(colRef, (snap) => {
    const timers: TimerConfig[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<TimerConfig, 'id'>) }));
    callback(timers);
  });
}

// Add or update a timer document
export function saveTimer(timer: TimerConfig) {
  const docRef = doc(db, 'timers', timer.id);
  return setDoc(docRef, timer);
}

// Remove a timer by id
export function removeTimer(id: string) {
  const docRef = doc(db, 'timers', id);
  return deleteDoc(docRef);
}

// Update specific fields of a timer
export function updateTimer(id: string, data: Partial<TimerConfig>) {
  const docRef = doc(db, 'timers', id);
  return updateDoc(docRef, data);
}
