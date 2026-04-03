import { vi } from 'vitest';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
  })),
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn(() => Promise.resolve()),
  signInWithEmailAndPassword: vi.fn(() =>
    Promise.resolve({
      user: {
        emailVerified: true,
        reload: vi.fn(() => Promise.resolve()),
        getIdToken: vi.fn(() => Promise.resolve('mock-token')),
      },
    }),
  ),
  sendEmailVerification: vi.fn(() => Promise.resolve()),
  sendPasswordResetEmail: vi.fn(() => Promise.resolve()),
}));

vi.mock('@/config/firebase', () => ({
  auth: {},
}));

import '@testing-library/jest-dom';
import { server } from './msw/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
