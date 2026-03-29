import { vi } from 'vitest';

export const mockSignOut = vi.fn(() => Promise.resolve());
export const mockSignInWithEmailAndPassword = vi.fn(() => Promise.resolve({ user: {} }));
export const mockOnAuthStateChanged = vi.fn((_auth: unknown, callback: (user: unknown) => void) => {
  callback(null);
  return vi.fn();
});
export const mockOnIdTokenChanged = vi.fn((_auth: unknown, callback: (user: unknown) => void) => {
  callback(null);
  return vi.fn();
});
export const mockGetIdToken = vi.fn().mockResolvedValue('mock-token');
export const mockGetAuth = vi.fn(() => ({
  currentUser: null,
}));
