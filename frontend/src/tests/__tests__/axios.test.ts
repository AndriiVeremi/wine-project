import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAuth, type User } from 'firebase/auth';
import apiClient from '@/api/axios';
import { mockGetIdToken } from '../__mocks__/firebase';
import type { InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
  })),
}));

vi.mock('@/config/firebase', () => ({
  auth: {},
}));

describe('Axios Interceptor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetIdToken.mockReset();
  });

  it('should not add token when user is null', async () => {
    (getAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      currentUser: null,
    });

    const config = {
      headers: {} as AxiosHeaders,
    } as InternalAxiosRequestConfig;

    const handlers = (
      apiClient.interceptors.request as unknown as {
        handlers: Array<{ fulfilled: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig> }>;
      }
    ).handlers;
    const modifiedConfig = await handlers[0].fulfilled(config);

    expect(modifiedConfig.headers.Authorization).toBeUndefined();
  });

  it('should add Bearer token when user exists', async () => {
    mockGetIdToken.mockResolvedValue('mock-token-123');

    const mockUser = {
      getIdToken: mockGetIdToken,
    } as unknown as User;
    (getAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      currentUser: mockUser,
    });

    const config = {
      headers: {} as AxiosHeaders,
    } as InternalAxiosRequestConfig;

    const handlers = (
      apiClient.interceptors.request as unknown as {
        handlers: Array<{ fulfilled: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig> }>;
      }
    ).handlers;
    const modifiedConfig = await handlers[0].fulfilled(config);

    expect(mockGetIdToken).toHaveBeenCalled();
    expect(modifiedConfig.headers.Authorization).toBe('Bearer mock-token-123');
  });

  it('should preserve existing headers', async () => {
    mockGetIdToken.mockResolvedValue('mock-token-456');

    const mockUser = {
      getIdToken: mockGetIdToken,
    } as unknown as User;
    (getAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      currentUser: mockUser,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'custom-value',
      } as unknown as AxiosHeaders,
    } as InternalAxiosRequestConfig;

    const handlers = (
      apiClient.interceptors.request as unknown as {
        handlers: Array<{ fulfilled: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig> }>;
      }
    ).handlers;
    const modifiedConfig = await handlers[0].fulfilled(config);

    expect(modifiedConfig.headers['Content-Type']).toBe('application/json');
    expect(modifiedConfig.headers['X-Custom-Header']).toBe('custom-value');
    expect(modifiedConfig.headers.Authorization).toBe('Bearer mock-token-456');
  });
});
