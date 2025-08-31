import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { Role } from '../types';

// Fetches the role for a user from Firestore `users/{uid}` document
export async function getUserRole(user: User): Promise<Role | null> {
  const snap = await getDoc(doc(db, 'users', user.uid));
  if (!snap.exists()) return null;
  const data = snap.data() as { role?: Role };
  return data.role ?? null;
}

// Signs in the user and returns the role
export async function login(
  email: string,
  password: string
): Promise<{ user: User; role: Role | null }> {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const role = await getUserRole(cred.user);
  return { user: cred.user, role };
}

// Signs out the current user
export function logout() {
  return signOut(auth);
}
