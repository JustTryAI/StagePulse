import { getUserRole, login, logout } from './auth';
import { getDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

jest.mock('./firebase', () => ({
  db: {},
  auth: {},
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

describe('getUserRole', () => {
  it('returns role from firestore', async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({ role: 'viewer' }),
    });
    const role = await getUserRole({ uid: 'u1' } as any);
    expect(role).toBe('viewer');
    expect(doc).toHaveBeenCalledWith(expect.anything(), 'users', 'u1');
  });

  it('returns null when doc missing', async () => {
    (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });
    const role = await getUserRole({ uid: 'u2' } as any);
    expect(role).toBeNull();
  });
});

describe('auth helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('login signs in and fetches role', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: 'u3' },
    });
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({ role: 'controller' }),
    });
    const result = await login('a@example.com', 'pw');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'a@example.com', 'pw');
    expect(result.role).toBe('controller');
  });

  it('logout signs out', async () => {
    (signOut as jest.Mock).mockResolvedValue(undefined);
    await logout();
    expect(signOut).toHaveBeenCalled();
  });
});
