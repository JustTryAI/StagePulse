import { doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Message } from '../types';

const docRef = doc(db, 'messages', 'current');

export function listenMessage(callback: (msg: Message | null) => void) {
  return onSnapshot(docRef, (snap) => {
    callback(snap.exists() ? (snap.data() as Message) : null);
  });
}

export function sendMessage(message: Message) {
  return setDoc(docRef, message);
}

export function clearMessage() {
  return deleteDoc(docRef);
}
