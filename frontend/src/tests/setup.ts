// --- Minimal Firebase mock (safe for ALL tests) ---
import { vi } from 'vitest';

/**
 * This mock prevents real Firebase initialization.
 * It is intentionally minimal so unit tests (like axios.test)
 * can override getAuth() with their own mockReturnValue().
 */
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null, // integration tests: no token → OK
  })),
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
}));

/**
 * Prevent real Firebase App initialization from local config.
 * This is safe and does NOT interfere with axios tests.
 */
vi.mock('@/config/firebase', () => ({
  auth: {}, // minimal stub
}));

// --- MSW setup ---
import '@testing-library/jest-dom';
import { server } from './msw/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
