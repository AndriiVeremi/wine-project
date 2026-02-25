const mockAuth = {
  createUser: jest.fn().mockResolvedValue({
    uid: 'test-uid-123',
    email: 'Dashuk10@example.com',
  }),
  getUserByEmail: jest.fn(),
  deleteUser: jest.fn(),
  setCustomUserClaims: jest.fn().mockResolvedValue(undefined),
  verifyIdToken: jest.fn().mockResolvedValue({
    uid: 'test-uid-123',
    email: 'Dashuk10@example.com',
  }),
};

export const firebaseAdmin = {
  auth: jest.fn(() => mockAuth),
};

export default firebaseAdmin;
