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

const mockBucket = {
  file: jest.fn().mockReturnValue({
    save: jest.fn().mockResolvedValue(undefined),
    makePublic: jest.fn().mockResolvedValue(undefined),
  }),
  name: 'test-bucket',
};

const mockStorage = {
  bucket: jest.fn().mockReturnValue(mockBucket),
};

export const firebaseAdmin = {
  auth: jest.fn(() => mockAuth),
  storage: jest.fn(() => mockStorage),
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
};

export const uploadFile = jest.fn().mockResolvedValue('http://mock-url.com/file.png');
export const deleteFile = jest.fn().mockResolvedValue(undefined);

export default firebaseAdmin;
